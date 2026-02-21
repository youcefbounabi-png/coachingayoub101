// api/chargily/create-checkout.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PLANS } from '../_lib/plans';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.CHARGILY_API_KEY) {
        return res.status(500).json({ error: 'Chargily configuration error: CHARGILY_API_KEY is missing from server environment variables.' });
    }

    const { planId, leadId } = req.body as { planId?: string, leadId?: string };
    const plan = planId ? PLANS[planId] : null;

    if (!plan) {
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    try {
        const origin = req.headers.origin || 'https://ayoubcmb.com';
        const isTestMode = process.env.CHARGILY_API_KEY?.startsWith('test_');
        const baseUrl = isTestMode ? 'https://pay.chargily.net/test/api/v2/checkouts' : 'https://pay.chargily.net/api/v2/checkouts';

        // Chargily validates URLs; localhost will fail checking
        const validOrigin = origin.includes('localhost') ? 'https://ayoubcmb.com' : origin;
        const webhookEndpoint = `${validOrigin}/api/webhook/chargily`;

        const payload: any = {
            amount: plan.amountDZD,
            currency: 'dzd',
            success_url: `${validOrigin}/success`,
            failure_url: `${validOrigin}/cancel`,
            description: plan.name,
            metadata: { planId, leadId },
            locale: 'fr',
            payment_method: 'edahabia',
        };

        // Webhooks must be publicly verifiable HTTPS endpoints, so omit locally
        if (!origin.includes('localhost')) {
            payload.webhook_endpoint = webhookEndpoint;
        }

        const chargilyRes = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CHARGILY_API_KEY}`,
            },
            body: JSON.stringify(payload),
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
