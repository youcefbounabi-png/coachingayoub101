import { Plugin, loadEnv } from 'vite';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingMessage, ServerResponse } from 'http';

export function vercelApiPlugin(): Plugin {
    return {
        name: 'vercel-api',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                // Only handle /api/* routes
                if (!req.url?.startsWith('/api/')) {
                    return next();
                }

                // Extract API route path
                const apiPath = req.url.replace('/api/', '');
                const apiFile = apiPath.split('?')[0]; // Remove query params

                try {
                    // Load environment variables into process.env locally
                    // Use Vite's built-in loadEnv to properly load non-VITE variables
                    try {
                        const env = loadEnv(server.config.mode || 'development', process.cwd(), '');
                        for (const k in env) {
                            if (!process.env[k]) {
                                process.env[k] = env[k];
                            }
                        }
                    } catch (e) {
                        console.error('Failed to load local environment variables', e);
                    }

                    // Dynamically import the API handler
                    const handlerModule = await server.ssrLoadModule(`/api/${apiFile}.ts`);
                    const handler = handlerModule.default;

                    // Convert Node req/res to Vercel Request/Response format
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });

                    req.on('end', async () => {
                        const vercelReq: Partial<VercelRequest> = {
                            method: req.method,
                            headers: req.headers as any,
                            body: body ? JSON.parse(body) : {},
                            query: Object.fromEntries(new URLSearchParams(req.url?.split('?')[1] || '')),
                        };

                        const vercelRes: Partial<VercelResponse> = {
                            status: (code: number) => {
                                res.statusCode = code;
                                return vercelRes as any;
                            },
                            json: (data: any) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify(data));
                                return vercelRes as any;
                            },
                            send: (data: any) => {
                                res.end(data);
                                return vercelRes as any;
                            },
                            setHeader: (name: string, value: string) => {
                                res.setHeader(name, value);
                                return vercelRes as any;
                            },
                            end: (data?: any) => {
                                res.end(data);
                                return vercelRes as any;
                            }
                        };

                        try {
                            await handler(vercelReq as VercelRequest, vercelRes as VercelResponse);
                        } catch (error) {
                            console.error('API handler error:', error);
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ error: 'Internal server error' }));
                        }
                    });
                } catch (error) {
                    console.error(`Failed to load API handler: /api/${apiFile}`, error);
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'API route not found' }));
                }
            });
        }
    };
}
