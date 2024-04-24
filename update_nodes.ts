import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSQL(libsql);
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
    for (const node of data) {
        if (!node.restVersion) {
            node.restVersion = 'v4';
        }
    }
    return data;
}

// Load data from nodes.json
const data: Node[] = JSON.parse(fs.readFileSync('nodes.json', 'utf8'));

// Add restVersion if it is missing
const dataWithRestVersion = addRestVersion(data);

// Remove duplicates
const uniqueData = removeDuplicates(dataWithRestVersion);

// Check if any nodes were removed
if (uniqueData.length < data.length) {
    console.log("Duplicate nodes removed.");

    // Save updated data back to nodes.json
    fs.writeFileSync('nodes.json', JSON.stringify(uniqueData, null, 4));
} else {
    console.log("No duplicate nodes found.");
}

// Update database with unique nodes
async function updateNodes(nodes: Node[]): Promise<void> {
    console.log("Updating nodes in database...");
    const prisma = new PrismaClient({ adapter });
    await prisma.$connect();
    // delete all nodes
    await prisma.nodes.deleteMany();
    // create new nodes

    await prisma.nodes.createMany({
        data: {
            nodes: JSON.stringify(nodes)
        }
    });
    await prisma.$disconnect();
}

// Call updateNodes with uniqueData
updateNodes(uniqueData)
    .then(() => console.log("Nodes updated successfully."))
    .catch(err => console.error("Error updating nodes:", err));
