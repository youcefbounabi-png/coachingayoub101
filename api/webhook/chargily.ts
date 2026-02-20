// api/webhook/chargily.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { supabase } from '../_lib/supabase';
import { sendPaymentSuccessEmail, sendCoachPaymentNotification } from '../_lib/emails';
import { PLANS } from '../_lib/plans';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Verify HMAC signature
        const signature = req.headers['signature'] as string;
        const secret = process.env.CHARGILY_WEBHOOK_SECRET!;
        const rawBody = JSON.stringify(req.body);
        const expectedSig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

        if (signature !== expectedSig) {
            console.error('Invalid Chargily signature');
            return res.status(401).json({ error: 'Invalid signature' });
        }

        const event = req.body as {
            type: string;
            data: {
                id: string;
                status: string;
                amount: number;
                currency: string;
                metadata?: { planId?: string };
                customer?: { name?: string; email?: string };
            };
        };

        if (event.type !== 'checkout.paid') {
            return res.status(200).json({ received: true });
        }

        const { data } = event;
        const planId = data.metadata?.planId || 'unknown';
        const plan = PLANS[planId];
        const clientName = data.customer?.name || 'Client';
        const clientEmail = data.customer?.email || '';
        const currency = data.currency?.toUpperCase() || 'DZD';

        // Save to Supabase
        const { error } = await supabase.from('payments').upsert({
            gateway: 'chargily',
            plan_id: planId,
            amount: data.amount,
            currency,
            status: 'paid',
            client_name: clientName,
            client_email: clientEmail,
            gateway_payment_id: data.id,
        }, { onConflict: 'gateway_payment_id' });

        if (error) {
            console.error('Supabase insert error:', error.message);
        }

        // Send emails
        if (clientEmail && plan) {
            await Promise.allSettled([
                sendPaymentSuccessEmail(clientEmail, clientName, data.amount, currency, plan.name, 'Chargily'),
                sendCoachPaymentNotification(clientName, clientEmail, data.amount, currency, plan.name, 'Chargily'),
            ]);
        }

        return res.status(200).json({ received: true });
    } catch (err) {
        const error = err as Error;
        console.error('Chargily webhook error:', error.message);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
}
