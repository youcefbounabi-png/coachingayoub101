// api/chargily/create-checkout.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PLANS } from '../_lib/plans';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { planId } = req.body as { planId?: string };
    const plan = planId ? PLANS[planId] : null;

    if (!plan) {
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    try {
        const origin = req.headers.origin || 'https://ayoubcmb.com';

        const chargilyRes = await fetch('https://pay.chargily.net/api/v2/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CHARGILY_API_KEY}`,
            },
            body: JSON.stringify({
                amount: plan.amountDZD,
                currency: 'dzd',
                success_url: `${origin}/success`,
                failure_url: `${origin}/cancel`,
                webhook_endpoint: `${origin}/api/webhook/chargily`,
                description: plan.name,
                metadata: { planId },
                locale: 'fr',
                payment_method: 'edahabia',
            }),
        });

        const checkout = await chargilyRes.json() as { checkout_url?: string; errors?: unknown };

        if (!chargilyRes.ok || !checkout.checkout_url) {
            console.error('Chargily error:', checkout);
            return res.status(500).json({ error: 'Failed to create Chargily checkout' });
        }

        return res.status(200).json({ checkoutUrl: checkout.checkout_url });
    } catch (err) {
        const error = err as Error;
        console.error('Chargily create-checkout error:', error.message);
        return res.status(500).json({ error: 'Failed to create Chargily checkout' });
    }
}
