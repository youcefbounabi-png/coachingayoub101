// api/dashboard/leads.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const secret = req.query.secret as string;
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
        .from('coaching_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}
