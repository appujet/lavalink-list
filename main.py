import json
import aiohttp
import asyncio
from prisma import Prisma
import os
import datetime


def format_bytes(size):
    if size == 0:
        return '0 B'
    sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    i = 0
    while size >= 1024:
        size /= 1024
        i += 1
    return f"{size:.2f} {sizes[i]}"


def uptime(ms):
    days = ms // 86400000
    hours = (ms % 86400000) // 3600000
    minutes = ((ms % 86400000) % 3600000) // 60000
    seconds = (((ms % 86400000) % 3600000) % 60000) // 1000

    parts = []
    if days > 0:
        parts.append(f"{days}d")
    if hours > 0:
        parts.append(f"{hours}h")
    if minutes > 0:
        parts.append(f"{minutes}m")
    if seconds > 0:
        parts.append(f"{seconds}s")

    return ' '.join(parts)


def get_default_info():
    return {
        "version": "Unknown",
        "buildTime": datetime.datetime.now().timestamp(),
        "git": {
            "branch": "Unknown",
            "commit": "Unknown",
            "commitTime": 0
        },
        "jvm": "Unknown",
        "lavaplayer": "Unknown",
        "sourceManagers": [],
        "filters": [],
        "plugins": []
    }

# Function to update node info in the database
async def update_node_info(db: Prisma, node, info, stats, user):
    try:
        author_data = {
            "authorId": node['authorId'],
            "iconUrl": user.get('avatar', 'default_avatar_url'),  # Use default value if 'avatar' is missing
            "username": user['username'],  # No need to handle missing username since it defaults to 'Unknown' in get_user_data
            "url": user['url']
        } if user else None
        author_json = json.dumps(author_data)
        info_json = json.dumps(info)
        
        await db.node.upsert(
            where={"identifier": node['identifier']},
            data={
                "update": {
                "authorId": node['authorId'],
                "host": node['host'],
                "identifier": node['identifier'],
                "password": node['password'],
                "port": node['port'],
                "restVersion": node['restVersion'],
                "secure": node['secure'],
                "isConnected": True,
                "info": info_json,
                "memory": f"{format_bytes(stats['memory']['used'])} - {stats['cpu']['lavalinkLoad']:.2f}%",
                "cpu": f"{stats['cpu']['systemLoad']:.2f}%",
                "connections": f"{stats['playingPlayers']} / {stats['players']}",
                "systemLoad": f"{stats['cpu']['systemLoad']:.2f}%",
                "cpuCores": stats['cpu']['cores'],
                "uptime": uptime(stats['uptime']),
            },
            "create": {
                "authorId": node['authorId'],
                "host": node['host'],
                "identifier": node['identifier'],
                "password": node['password'],
                "port": node['port'],
                "restVersion": node['restVersion'],
                "secure": node['secure'],
                "isConnected": True,
                "info": info_json,
                "memory": f"{stats['memory']['used']} - {stats['cpu']['lavalinkLoad']:.2f}%",
                "cpu": f"{stats['cpu']['systemLoad']:.2f}%",
                "connections": f"{stats['playingPlayers']} / {stats['players']}",
                "systemLoad": f"{stats['cpu']['systemLoad']:.2f}%",
                "cpuCores": stats['cpu']['cores'],
                "uptime": uptime(stats['uptime']),
                "author": author_json
            }
          }
        )
    except Exception as e:
        print(f"Error updating node {node['identifier']} info: {str(e)}")

# Function to check if a node is online
async def check_node_online(session, db, node):
    protocol = "https" if node['secure'] else "http"
    base_url = f"{protocol}://{node['host']}:{node['port']}/"
    password = node['password']
    version_url = base_url + "version"
    info_url = base_url + f"{node['restVersion']}/info"
    stats_url = base_url + f"{node['restVersion']}/stats"
    
    headers = {
        "Authorization": password,
        'User-Agent': 'Lavalink list Status by (Appu)'
    }
    try:
        async with session.get(version_url, headers=headers, timeout=15) as response:
            if response.status == 200:
                async with session.get(info_url, headers=headers, timeout=15) as info_response:
                    async with session.get(stats_url, headers=headers, timeout=15) as stats_response:
                        if info_response.status == 200 and stats_response.status == 200:
                            info = await info_response.json()
                            stats = await stats_response.json()
                            user = await get_user_data(session, node['authorId'])
                            await update_node_info(db, node, info, stats, user)
                            print(f"Updated node: {node['identifier']}")
                        else:
                            # Node is offline, update its status in the database
                            await update_node_offline(db, node, None)  # Pass None as user since it's not available
                            print(f"{node['identifier']} is offline")
            else:
                # Node is offline, update its status in the database
                await update_node_offline(db, node)  # Pass None as user since it's not available
                print(f"{node['identifier']} is offline")
    except asyncio.TimeoutError:
        # Timeout occurred while checking the node status
        print(f"Timeout occurred while checking {node['identifier']} status")
        # Update the node status in the database to mark it as offline
        await update_node_offline(db, node,)  # Pass None as user since it's not available
    except aiohttp.ClientError as e:
        # HTTP error occurred while checking the node status
        print(f"HTTP error occurred while checking {node['identifier']} status: {str(e)}")
        # Update the node status in the database to mark it as offline
        await update_node_offline(db, node)  # Pass None as user since it's not available
    except Exception as e:
        print(f"Error occurred while checking {node['identifier']} status: {str(e)}")
        

async def update_node_offline(db: Prisma, node):

    try:
        async with aiohttp.ClientSession() as session:
            user = await get_user_data(session, node['authorId'])
            author_data = {
                "authorId": node['authorId'],
                "iconUrl": user.get('avatar', 'default_avatar_url'),  # Use default value if 'avatar' is missing
                "username": user['username'],  # No need to handle missing username since it defaults to 'Unknown' in get_user_data
                "url": user['url']
            } if user else None
            
            author_json = json.dumps(author_data)
            info_json = json.dumps(get_default_info())
            await db.node.upsert(
                where={"identifier": node['identifier']},
                data={
                    "update": {
                        "isConnected": False,
                        "info": info_json,
                        "memory": "0 B - 0.0%",
                        "cpu": "0.0%",
                        "connections": "0 / 0",
                        "systemLoad": "0.0%",
                        "cpuCores": 0,
                        "uptime": "0s",
                        "author": author_json
                    },
                    "create": {
                        "authorId": node['authorId'],
                        "host": node['host'],
                        "identifier": node['identifier'],
                        "password": node['password'],
                        "port": node['port'],
                        "restVersion": node['restVersion'],
                        "secure": node['secure'],
                        "isConnected": False,
                        "info": info_json,
                        "memory": "0 B - 0.0%",
                        "cpu": "0.0%",
                        "connections": "0 / 0",
                        "systemLoad": "0.0%",
                        "cpuCores": 0,
                        "uptime": "0s",
                        "author": author_json
                    }
                }
            )
    except Exception as e:
        print(f"Error updating node {node['identifier']} info: {str(e)}")
    

# Load nodes from JSON
with open('nodes.json') as f:
    nodes = json.load(f)

# Fetch user data
async def get_user_data(session, id):
    try:
        token = os.getenv("DISCORD_TOKEN")
        headers = {
            "Authorization": f"Bot {token}",
            "Content-Type": "application/json"
        }
        async with session.get(f"https://discord.com/api/v10/users/{id}", headers=headers) as response:
            user_data = await response.json()
            username = user_data.get('username', 'Unknown')
            # Check if 'avatar' field exists, if not set default value
            avatar_url = f"https://cdn.discordapp.com/avatars/{id}/{user_data.get('avatar', 'default_avatar')}.png"
            user_url = f"https://discord.com/users/{id}"
            return {'avatar': avatar_url, 'username': username, 'url': user_url}
    except Exception as e:
        print(f"Error fetching user data: {str(e)}")
        return {'avatar': 'default_avatar_url', 'username': 'Unknown', 'url': ''}


async def main():
    db = Prisma()
    await db.connect()

    async with aiohttp.ClientSession() as session:
        tasks = [check_node_online(session, db, node) for node in nodes]
        await asyncio.gather(*tasks)

    await db.disconnect()

asyncio.run(main())


