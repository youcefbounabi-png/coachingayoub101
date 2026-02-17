// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface ContactFormData {
    name: string;
    email: string;
    experience: string;
    goal: string;
    message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const formData = req.body as ContactFormData;

        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured. Email will not be sent.');
            return res.status(200).json({
                success: true,
                message: 'Application received. Email service not configured.',
                note: 'Please add RESEND_API_KEY to environment variables'
            });
        }

        // Send email to coach
        const coachEmail = await resend.emails.send({
            from: 'Ayoub CMB Coaching <onboarding@resend.dev>', // Change to your verified domain
            to: ['youcefbounabi@gmail.com'],
            subject: `🔥 New Coaching Application from ${formData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #F7E025; border-bottom: 4px solid #F7E025; padding-bottom: 10px;">
                        NEW COACHING APPLICATION
                    </h2>
                    
                    <div style="background: #0A0A0A; color: #FFFFFF; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #F7E025; margin-top: 0;">Applicant Details</h3>
                        <p><strong>Name:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: #F7E025;">${formData.email}</a></p>
                        <p><strong>Experience Level:</strong> ${formData.experience}</p>
                    </div>
                    
                    <div style="background: #121212; color: #FFFFFF; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #F7E025; margin-top: 0;">Primary Goal</h3>
                        <p style="white-space: pre-wrap;">${formData.goal}</p>
                    </div>
                    
                    <div style="background: #0A0A0A; color: #FFFFFF; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #F7E025; margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap;">${formData.message}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                        This application was submitted via the Ayoub CMB coaching website.
                    </p>
                </div>
            `
        });

        // Send confirmation email to applicant
        const applicantEmail = await resend.emails.send({
            from: 'Ayoub CMB Coaching <onboarding@resend.dev>', // Change to your verified domain
            to: [formData.email],
            subject: '✓ Application Received - Ayoub CMB Coaching',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #F7E025; border-bottom: 4px solid #F7E025; padding-bottom: 10px;">
                        APPLICATION RECEIVED
                    </h2>
                    
                    <p style="font-size: 16px; line-height: 1.6;">
                        Hey <strong>${formData.name}</strong>,
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6;">
                        Thanks for applying to join the elite. I've received your application and will personally review it within the next <strong>48 hours</strong>.
                    </p>
                    
                    <div style="background: #0A0A0A; color: #FFFFFF; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #F7E025; margin-top: 0;">What Happens Next?</h3>
                        <ol style="line-height: 1.8;">
                            <li><strong>Application Review:</strong> I'll check your starting point and objectives.</li>
                            <li><strong>Video Consultation:</strong> If we're a good fit, I'll schedule a 15-min call.</li>
                            <li><strong>Onboarding:</strong> We'll gather your biometrics and release your initial program.</li>
                        </ol>
                    </div>
                    
                    <p style="font-size: 16px; line-height: 1.6;">
                        In the meantime, make sure you're on track with your current training and nutrition. We're going to take this to the next level.
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6;">
                        - Ayoub
                    </p>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
                        If you have any urgent questions, you can reach me at <a href="mailto:youcefbounabi@gmail.com" style="color: #F7E025;">youcefbounabi@gmail.com</a>
                    </p>
                </div>
            `
        });

        console.log('Emails sent successfully:', { coachEmail: coachEmail.data?.id, applicantEmail: applicantEmail.data?.id });

        res.status(200).json({
            success: true,
            message: 'Application received. Coach will contact you within 48 hours.'
        });

    } catch (error) {
        console.error('Contact form error:', error);

        // Provide more specific error message
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit application';

        res.status(500).json({
            error: errorMessage,
            details: 'If this issue persists, please email directly: youcefbounabi@gmail.com'
        });
    }
}
