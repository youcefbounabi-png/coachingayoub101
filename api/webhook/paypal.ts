// api/webhook/paypal.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase';
import { sendPaymentSuccessEmail, sendCoachPaymentNotification, sendCoachProtocolDetails } from '../_lib/emails';
import { PLANS } from '../_lib/plans';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const event = req.body as {
            event_type: string;
            resource: {
                id: string;
                status: string;
                purchase_units?: Array<{
                    custom_id?: string;
                    amount: { value: string; currency_code: string };
                    payee?: { email_address?: string };
                }>;
                payer?: { email_address?: string; name?: { given_name?: string; surname?: string } };
            };
        };

        // Only handle successful capture events
        if (
            event.event_type !== 'PAYMENT.CAPTURE.COMPLETED' &&
            event.event_type !== 'CHECKOUT.ORDER.APPROVED'
        ) {
            return res.status(200).json({ received: true });
        }

        const unit = event.resource.purchase_units?.[0];
        const planId = unit?.custom_id || 'unknown';
        const plan = PLANS[planId];
        const amountRaw = unit?.amount?.value || '0';
        const amountCents = Math.round(parseFloat(amountRaw) * 100);
        const currency = unit?.amount?.currency_code || 'USD';
        const clientEmail = event.resource.payer?.email_address || '';
        const firstName = event.resource.payer?.name?.given_name || '';
        const lastName = event.resource.payer?.name?.surname || '';
        const clientName = `${firstName} ${lastName}`.trim() || 'Client';
        const paypalOrderId = event.resource.id;

        // Upsert into payments table
        const { error } = await supabase.from('payments').upsert({
            gateway: 'paypal',
            plan_id: planId,
            amount: amountCents,
            currency,
            status: 'paid',
            client_name: clientName,
            client_email: clientEmail,
            gateway_payment_id: paypalOrderId,
        }, { onConflict: 'gateway_payment_id' });

        if (error) {
            console.error('Supabase insert error:', error.message);
        }

        // Send emails (don't block webhook response)
        if (clientEmail && plan) {
            // In create-order.ts, we set custom_id to leadId || planId
            const leadId = unit?.custom_id;
            let leadData = null;

            // Check if custom_id is a UUID (likely leadId)
            if (leadId && leadId.length > 20) {
                const { data: lead } = await supabase
                    .from('coaching_leads')
                    .select('*')
                    .eq('id', leadId)
                    .single();
                leadData = lead;
            }

            const notifications = [
                sendPaymentSuccessEmail(clientEmail, clientName, amountCents, currency, plan.name, 'PayPal'),
            ];

            if (leadData) {
                notifications.push(sendCoachProtocolDetails(leadData, amountCents, currency, 'PayPal'));
            } else {
                notifications.push(sendCoachPaymentNotification(clientName, clientEmail, amountCents, currency, plan.name, 'PayPal'));
            }

            await Promise.allSettled(notifications);
        }

        return res.status(200).json({ received: true });
    } catch (err) {
        const error = err as Error;
        console.error('PayPal webhook error:', error.message);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
}
