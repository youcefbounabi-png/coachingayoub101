import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { PLANS } from './_lib/plans.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing. Skipping notification email.');
            return res.status(200).json({ success: true, warning: 'Notification email skipped (missing config)' });
        }

        const { lead } = req.body;

        if (!lead) {
            return res.status(400).json({ error: 'Missing lead data' });
        }

        const plan = PLANS[lead.plan_id] || { name: lead.plan_id };
        const coachEmail = process.env.COACH_EMAIL || 'youcefbounabi@gmail.com';

        await resend.emails.send({
            from: 'Ayoub CMB Coaching <onboarding@resend.dev>',
            to: [coachEmail],
            subject: `🚨 NEW COACHING PROTOCOL: ${lead.full_name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
                    <h2 style="color: #F7E025; background: #000; padding: 10px;">NEW ATHLETE PROTOCOL SUBMITTED</h2>
                    <p>A new athlete has filled out their info and is proceeding to payment.</p>
                    
                    <div style="border: 2px solid #000; padding: 15px; margin-top: 20px;">
                        <h3>Athlete Details</h3>
                        <p><strong>Name:</strong> ${lead.full_name}</p>
                        <p><strong>Email:</strong> ${lead.email}</p>
                        <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
                        <p><strong>Height:</strong> ${lead.height} cm</p>
                        <p><strong>Weight:</strong> ${lead.weight} kg</p>
                        <p><strong>Health Problems:</strong> ${lead.health_problems || 'None'}</p>
                    </div>

                    <div style="background: #111; color: #fff; padding: 15px; margin-top: 15px; border-left: 5px solid #F7E025;">
                        <p style="margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Selected Program:</p>
                        <p style="margin: 5px 0 0; font-size: 18px; color: #F7E025;">${plan.name}</p>
                    </div>

                    <p style="margin-top: 20px;">
                        <strong>Physique Photos:</strong><br/>
                        ${lead.physique_photos?.map((p: string) => {
                const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
                const url = `${supabaseUrl}/storage/v1/object/public/physique-photos/${p}`;
                return `• <a href="${url}" target="_blank" style="color: #F7E025;">View Photo</a>`;
            }).join('<br/>')}
                    </p>

                    <p style="font-size: 12px; color: #666; margin-top: 40px;">
                        Lead ID: ${lead.id}
                    </p>
                </div>
            `
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Notification error:', err);
        return res.status(500).json({ error: 'Failed to send notification' });
    }
}
