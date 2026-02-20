import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COACH_EMAIL = 'youcefbounabi@gmail.com';
const FROM_EMAIL = 'noreply@ayoubcmb.com';

export async function sendPaymentSuccessEmail(
    clientEmail: string,
    clientName: string,
    amount: number,
    currency: string,
    planName: string,
    gateway: string
) {
    const formattedAmount =
        currency.toUpperCase() === 'DZD'
            ? `${amount.toLocaleString()} DZD`
            : `$${(amount / 100).toFixed(2)}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to: clientEmail,
        subject: `✅ Payment Confirmed — ${planName}`,
        html: `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e8c97e; font-size: 28px; text-transform: uppercase; letter-spacing: 4px;">AYOUB CMB</h1>
        <h2 style="color: #fff; font-size: 20px;">Payment Confirmed ✅</h2>
        <p style="color: #aaa;">Hi ${clientName},</p>
        <p style="color: #aaa;">Your payment has been successfully processed. Welcome to the elite.</p>
        <div style="background: #1a1a1a; border-left: 4px solid #e8c97e; padding: 20px; margin: 24px 0;">
          <p style="margin: 0; color: #e8c97e; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Plan: ${planName}</p>
          <p style="margin: 8px 0 0; color: #fff; font-size: 22px; font-weight: bold;">${formattedAmount}</p>
          <p style="margin: 8px 0 0; color: #aaa; font-size: 12px; text-transform: uppercase;">via ${gateway.toUpperCase()}</p>
        </div>
        <p style="color: #aaa;">Coach Ayoub will contact you within 48 hours to begin your onboarding process.</p>
        <p style="color: #555; font-size: 12px; margin-top: 40px;">© 2025 Ayoub CMB Elite Bodybuilding</p>
      </div>
    `,
    });
}

export async function sendCoachPaymentNotification(
    clientName: string,
    clientEmail: string,
    amount: number,
    currency: string,
    planName: string,
    gateway: string
) {
    const formattedAmount =
        currency.toUpperCase() === 'DZD'
            ? `${amount.toLocaleString()} DZD`
            : `$${(amount / 100).toFixed(2)}`;

    await resend.emails.send({
        from: FROM_EMAIL,
        to: COACH_EMAIL,
        subject: `💰 New Payment — ${clientName} — ${planName}`,
        html: `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e8c97e; font-size: 28px; text-transform: uppercase; letter-spacing: 4px;">NEW PAYMENT 💰</h1>
        <div style="background: #1a1a1a; border-left: 4px solid #e8c97e; padding: 20px; margin: 24px 0;">
          <p style="margin: 0; color: #e8c97e; font-weight: bold;">Client: ${clientName}</p>
          <p style="margin: 8px 0 0; color: #aaa;">Email: ${clientEmail}</p>
          <p style="margin: 8px 0 0; color: #fff; font-weight: bold;">Plan: ${planName}</p>
          <p style="margin: 8px 0 0; color: #fff; font-size: 22px; font-weight: bold;">${formattedAmount}</p>
          <p style="margin: 8px 0 0; color: #aaa; font-size: 12px; text-transform: uppercase;">via ${gateway.toUpperCase()}</p>
        </div>
        <p style="color: #aaa;">Contact this client within 48 hours to begin onboarding.</p>
      </div>
    `,
    });
}
