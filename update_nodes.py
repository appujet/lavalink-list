import json
from prisma import Prisma
import asyncio

# Function to remove duplicate nodes
def remove_duplicates(data):
    seen_identifiers = set()
    unique_data = []
    for node in data:
        identifier = node['identifier']
        if identifier not in seen_identifiers:
            seen_identifiers.add(identifier)
            unique_data.append(node)
    return unique_data

# Function to add restVersion if it is missing
def add_restVersion(data):
    for node in data:
        if 'restVersion' not in node:
            node['restVersion'] = 'v4'
    return data

# Load data from nodes.json
with open('nodes.json') as f:
    data = json.load(f)

# Add restVersion if it is missing
data = add_restVersion(data)

# Remove duplicates
unique_data = remove_duplicates(data)

# Check if any nodes were removed
if len(unique_data) < len(data):
    print("Duplicate nodes removed.")

    # Save updated data back to nodes.json
    with open('nodes.json', 'w') as f:
        json.dump(unique_data, f, indent=4)
else:
    print("No duplicate nodes found.")

# Save data with restVersion added
with open('nodes.json', 'w') as f:
    json.dump(unique_data, f, indent=4)

# Update database with unique nodes
async def update_nodes(nodes):
    print("Updating nodes in database...")
    prisma = Prisma()
    await prisma.connect()
    # delete all nodes
    await prisma.nodes.delete_many()
    # create new nodes
    await prisma.nodes.create({
        "nodes": nodes
    })
    await prisma.disconnect()

json_nodes = json.dumps(unique_data)
# Call updateNodes with unique_data
asyncio.run(update_nodes(json_nodes))
