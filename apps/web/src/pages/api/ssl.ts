"use client";


import { NextApiRequest, NextApiResponse } from 'next';
import { fetch } from 'undici';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const apiUrl = "https://lavainfo-api.deno.dev";

        if (!apiUrl) {
            throw new Error('API URL is not defined in the environment variables.');
        }
        // Fetch Lavalink nodes from the external API
        const apiNodesResponse = await fetch(`${apiUrl}/ssl-nodes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!apiNodesResponse.ok) {
            throw new Error(`Failed to fetch Lavalink nodes. Status: ${apiNodesResponse.status}`);
        }

        const apiNodes = await apiNodesResponse.json() as any
        
        apiNodes.sort((a: any, b: any) => b.isConnected - a.isConnected);

        return res.status(200).json(apiNodes);
    } catch (error: any) {
        console.error('Error:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching SSL nodes.' });
    } finally {
        
    }
}