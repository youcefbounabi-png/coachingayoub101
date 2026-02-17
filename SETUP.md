# Setup Instructions - Payment & Email Integration

This guide will help you configure Stripe payments and email forwarding for your Ayoub CMB Coaching website.

## Prerequisites

You'll need accounts and API keys from:
1. **Stripe** (for subscription payments)
2. **Resend** (for email forwarding)

---

## 1. Stripe Setup

### Get Your API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy both keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

### Add to Environment Variables

Open your `.env` file and update:

```bash
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
```

### Test vs Live Mode

- **Test mode**: Use test keys for development. You can test payments with [test card numbers](https://stripe.com/docs/testing#cards)
- **Live mode**: Switch to live keys when deploying to production

**Test Card**: `4242 4242 4242 4242` (any future expiry, any CVC)

---

## 2. Resend Setup

### Create Account & Get API Key

1. Go to [Resend](https://resend.com)
2. Sign up for a free account (100 emails/day included)
3. Navigate to **API Keys** → **Create API Key**
4. Copy the key (starts with `re_`)

### Add to Environment Variables

Open your `.env` file and update:

```bash
RESEND_API_KEY=re_your_actual_resend_api_key
```

### Configure Sending Domain (Optional but Recommended)

By default, emails will be sent from `onboarding@resend.dev`. For a professional sender address:

1. In Resend dashboard, go to **Domains** → **Add Domain**
2. Add your domain (e.g., `ayoubcmb.com`)
3. Add the DNS records shown by Resend to your domain provider
4. Wait for verification (usually a few minutes)
5. Update the `from` field in `api/contact.ts`:
   ```typescript
   from: 'Ayoub CMB Coaching <coaching@yourdomain.com>'
   ```

---

## 3. Deployment to Vercel

### Add Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all three keys:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `RESEND_API_KEY`

4. Make sure to add them for:
   - ✓ Production
   - ✓ Preview
   - ✓ Development

### Redeploy

After adding environment variables, trigger a new deployment:
```bash
git push
```

Or manually redeploy from Vercel dashboard.

---

## 4. Testing

### Test Stripe Payments

1. Open your website
2. Go to **Programs** page
3. Click "SELECT BASIC" (or any tier)
4. You should be redirected to Stripe Checkout
5. Use test card: `4242 4242 4242 4242`
6. Complete payment
7. You should be redirected to `/success` page

### Test Email Forwarding

1. Go to **Contact** page
2. Fill out the application form
3. Submit
4. Check `youcefbounabi@gmail.com` for the application email
5. Check the applicant's email for the confirmation

---

## Troubleshooting

### Stripe Issues

- **"Payment system not configured"**: Make sure `STRIPE_SECRET_KEY` is set in `.env`
- **"Invalid API key"**: Check that your key starts with `sk_test_` or `sk_live_`
- **Checkout not loading**: Check browser console for errors

### Email Issues

- **"Email service not configured"**: Make sure `RESEND_API_KEY` is set in `.env`
- **Emails not sending**: Check Resend dashboard → **Logs** for error messages
- **Emails going to spam**: Verify your domain in Resend for better deliverability

### General

- **Changes not working**: Restart your dev server after modifying `.env`
- **Vercel deployment issues**: Make sure environment variables are added to Vercel dashboard

---

## Support

If you encounter any issues:
- Check the browser console (F12)
- Check Vercel function logs (for production)
- Email: youcefbounabi@gmail.com
