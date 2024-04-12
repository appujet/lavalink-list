import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export interface Env {
    DATABASE_URL: string;
}


export default {
    fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
        try {
            
            const prisma = new PrismaClient({
                datasourceUrl: env.DATABASE_URL
            }).$extends(withAccelerate());
            const url = new URL(request.url);

            if (url.pathname === "/") {
                return new Response("Welcome to Lavalink status api", {
                    headers: {
                        "Content-Type": "text/plain"
                    }
                });
            } else if (url.pathname === "/ssl-nodes" || url.pathname === "/non-ssl-nodes") {

                const nodes = await prisma.node.findMany({
                    where: {
                        secure: url.pathname === "/ssl-nodes" ? true : false
                    }
                });
                if (nodes.length === 0) {
                    return new Response("Not Found", {
                        status: 404,
                        headers: {
                            "Content-Type": "text/plain"
                        }
                    });
                }
                return new Response(JSON.stringify(nodes), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            } else {
                return new Response("Not Found", {
                    status: 404,
                    headers: {
                        "Content-Type": "text/plain"
                    }
                });
            }
        } catch (error: any) {
            return new Response(error.message || "Internal Server Error", {
                status: 500,
                headers: {
                    "Content-Type": "text/plain"
                }
            });
        }
    }
}