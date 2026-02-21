import type { VercelRequest, VercelResponse } from '@vercel/node';
import { TEST_STRING } from './_lib/test-lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    return res.status(200).json({
        nodeVersion: process.version,
        importStatus: TEST_STRING,
        fetchAvailable: typeof fetch !== 'undefined',
        env: {
            HAS_CHARGILY: !!process.env.CHARGILY_API_KEY,
            HAS_PAYPAL_ID: !!process.env.PAYPAL_CLIENT_ID,
            HAS_SUPABASE: !!process.env.VITE_SUPABASE_URL
        }
    });
}
