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
        <p style="color: #aaa;">Coach Ayoub will contact you shortly to begin your elite coaching protocol.</p>
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

export async function sendCoachProtocolDetails(
  lead: any,
  amount: number,
  currency: string,
  gateway: string
) {
  const formattedAmount =
    currency.toUpperCase() === 'DZD'
      ? `${amount.toLocaleString()} DZD`
      : `$${(amount / 100).toFixed(2)}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: COACH_EMAIL,
    subject: `🚨 NEW PAID ATHLETE: ${lead.full_name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e8c97e; font-size: 24px; text-transform: uppercase;">New Athlete Protocol Received 🚀</h1>
        <p style="color: #aaa;">This athlete has completed their onboarding and paid successfully.</p>
        
        <div style="background: #1a1a1a; padding: 20px; margin: 20px 0; border: 1px solid #333;">
          <h3 style="color: #e8c97e; margin-top: 0;">Athlete Details</h3>
          <p><strong>Name:</strong> ${lead.full_name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
          <p><strong>Health:</strong> ${lead.health_problems || 'None'}</p>
          <p><strong>Stats:</strong> ${lead.height}cm / ${lead.weight}kg</p>
        </div>

        <div style="background: #e8c97e; color: #000; padding: 15px; margin: 20px 0; font-weight: bold;">
          PAYMENT: ${formattedAmount} via ${gateway.toUpperCase()}
        </div>

        <div style="margin-top: 20px;">
          <strong>Physique Photos:</strong><br/>
          ${lead.physique_photos?.map((p: string) => {
      const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/physique-photos/${p}`;
      return `• <a href="${url}" target="_blank" style="color: #e8c97e;">View Photo</a>`;
    }).join('<br/>')}
        </div>

        <p style="color: #555; font-size: 12px; margin-top: 40px;">Lead ID: ${lead.id}</p>
      </div>
    `,
  });
}
