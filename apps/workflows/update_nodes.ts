import fs from 'node:fs';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the libsql client
const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Define types for node objects
interface Node {
    host: string;
    identifier: string;
    password?: string;
    port?: number;
    restVersion?: string;
    secure?: boolean;
    authorId?: string;
}

// Function to remove duplicate nodes
function removeDuplicates(data: Node[]): Node[] {
    const seenIdentifiers = new Set<string>();
    const uniqueData: Node[] = [];
    for (const node of data) {
        const { identifier } = node;
        if (!seenIdentifiers.has(identifier)) {
            seenIdentifiers.add(identifier);
            uniqueData.push(node);
        }
    }
    return uniqueData;
}
// Function to add restVersion if it is missing
function addRestVersion(data: Node[]): Node[] {
    return data.map(node => {
        if (!node.restVersion) {
            node.restVersion = 'v4';
        }
        return node;
    });
}

// Load data from nodes.json
const data: Node[] = JSON.parse(fs.readFileSync('../../nodes.json', 'utf8'));

// Add restVersion if it is missing
const dataWithRestVersion = addRestVersion(data);

// Remove duplicates
const uniqueData = removeDuplicates(dataWithRestVersion);

// Check if any nodes were removed
if (uniqueData.length < data.length) {
    console.log("Duplicate nodes removed.");

    // Save updated data back to nodes.json
    fs.writeFileSync('../../nodes.json', JSON.stringify(uniqueData, null, 4));
} else {
    console.log("No duplicate nodes found.");
}
// Update database with unique nodes
async function updateNodes(nodes: Node[]): Promise<void> {
  console.log("Updating nodes in the database...");

  try {
    // Retrieve all existing nodes from the database
    const existingNodesResult = await libsql.execute(
      "SELECT identifier FROM Node"
    );
    const existingNodes = existingNodesResult.rows.map(
      (row: any) => row.identifier as string
    );

    // Prepare the queries for inserting or updating nodes
    const jsonIdentifiers = nodes.map((node) => node.identifier);

    for (const node of nodes) {
      const {
        host,
        identifier,
        password,
        port,
        restVersion,
        secure,
        authorId,
      } = node;

      // Use parameterized query to prevent SQL injection and handle data types correctly
      const query = `
                INSERT INTO Node (host, identifier, password, port, restVersion, secure, authorId)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT (identifier) 
                DO UPDATE SET
                    host = EXCLUDED.host,
                    password = EXCLUDED.password,
                    port = EXCLUDED.port,
                    restVersion = EXCLUDED.restVersion,
                    secure = EXCLUDED.secure,
                    authorId = EXCLUDED.authorId;
            `;

      // Prepare parameters, converting undefined to null and booleans to 1/0
      const args = [
        host,
        identifier,
        password ?? null,
        port ?? null,
        restVersion ?? "v4", // Ensure restVersion is set
        secure ? 1 : 0, // Convert boolean to 1 or 0
        authorId ?? null,
      ];

      await libsql.execute({ sql: query, args });
    }

    // Find nodes to delete (exist in DB but not in JSON)
    const nodesToDelete = existingNodes.filter(
      (id) => !jsonIdentifiers.includes(id)
    );

    if (nodesToDelete.length > 0) {
      // Use parameterized query for IN clause
      const placeholders = nodesToDelete.map(() => "?").join(", ");
      const deleteQuery = `DELETE FROM Node WHERE identifier IN (${placeholders})`;
      await libsql.execute({ sql: deleteQuery, args: nodesToDelete });
      console.log(`Removed nodes: ${nodesToDelete.join(", ")}`);
    }
  } catch (error) {
    console.error("Error updating nodes:", error);
    throw error; // Ensure the error is propagated
  }
}


// Call updateNodes with uniqueData
updateNodes(uniqueData)
    .then(() => console.log("Nodes updated successfully."))
    .catch(err => console.error("Error updating nodes:", err));
