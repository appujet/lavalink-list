import fs from 'fs';
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
    console.log("Updating nodes in database...");

    try {
        // Delete all nodes
        await libsql.execute("DELETE FROM Node");

        // Insert new nodes in one query
        await libsql.execute(`INSERT INTO Node (host, identifier, password, port, restVersion, secure, authorId)  VALUES ${nodes.map(node => `('${node.host}', '${node.identifier}', '${node.password}', ${node.port}, '${node.restVersion}', ${node.secure}, '${node.authorId}')`).join(', ')}`);
    } catch (error) {
        console.error("Error updating nodes:", error);
    }
}

// Call updateNodes with uniqueData
updateNodes(uniqueData)
    .then(() => console.log("Nodes updated successfully."))
    .catch(err => console.error("Error updating nodes:", err));
