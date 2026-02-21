// api/paypal/create-order.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PLANS } from '../_lib/plans';

async function getPayPalAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID!;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
    const base =
        process.env.PAYPAL_MODE === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';

    const res = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
    });

    const data = await res.json() as { access_token: string };
    return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        return res.status(500).json({ error: 'PayPal configuration error: PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET is missing from server environment variables.' });
    }

    const { planId, leadId } = req.body as { planId?: string, leadId?: string };
    const plan = planId ? PLANS[planId] : null;

    if (!plan) {
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    try {
        const accessToken = await getPayPalAccessToken();
        const base =
            process.env.PAYPAL_MODE === 'live'
                ? 'https://api-m.paypal.com'
                : 'https://api-m.sandbox.paypal.com';

        const amountUSD = (plan.amountUSD / 100).toFixed(2);

        const orderRes = await fetch(`${base}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: amountUSD,
                        },
                        description: plan.name,
                        custom_id: leadId || planId,
                    },
                ],
                application_context: {
                    return_url: `${req.headers.origin || 'https://ayoubcmb.com'}/success`,
                    cancel_url: `${req.headers.origin || 'https://ayoubcmb.com'}/cancel`,
                },
            }),
        });

        if (!orderRes.ok) {
            const errorData = await orderRes.json() as { message?: string };
            throw new Error(errorData.message || 'Failed to create PayPal order');
        }

        const order = await orderRes.json() as { id: string; links?: Array<{ rel: string; href: string }> };

        // Find the approval URL from the order links
        const approveLink = order.links?.find(link => link.rel === 'approve');
        if (!approveLink) {
            throw new Error('No approval URL found in PayPal order');
        }

        return res.status(200).json({
            orderId: order.id,
            approveUrl: approveLink.href
        });
    } catch (err) {
        const error = err as Error;
        console.error('PayPal create-order error:', error.message);
        return res.status(500).json({ error: 'Failed to create PayPal order' });
    }
}
