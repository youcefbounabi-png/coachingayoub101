# Testing Stripe & Email Integration

## The Issue with Local Testing

Vercel API routes (`/api/*`) are designed for serverless functions and don't run properly in Vite's dev server. You have 2 options:

---

## ✅ Option 1: Deploy to Vercel (Recommended)

This is the **easiest and most reliable** way to test both integrations.

### Steps:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add Stripe and email integration"
   git push
   ```

2. **Add Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Navigate to your project → **Settings** → **Environment Variables**
   - Add these three variables (use your actual keys from `.env` file):
     - `STRIPE_SECRET_KEY`
     - `VITE_STRIPE_PUBLISHABLE_KEY`
     - `RESEND_API_KEY`

3. **Test on your live site:**
   - Go to your Vercel URL (e.g., `yourproject.vercel.app/contact`)
   - Submit the contact form
   - Try the Stripe checkout at `/programs`

---

## Option 2: Use Vercel CLI (Local Testing)

If you want to test locally with the API routes:

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Run development server:
```bash
vercel dev
```

This will:
- Run your site locally
- Make `/api/*` routes work properly
- Use environment variables from `.env`

---

## What Works Now

### ✅ Frontend (Always works with `npm run dev`)
- Navigation
- UI components
- Stripe checkout button (redirects to Stripe)
- Contact form UI

### ❌ Backend APIs (Need Vercel deployment or `vercel dev`)
- `/api/contact` - Email sending
- `/api/stripe` - Creating checkout sessions

---

## Quick Test After Deployment

### Test Email:
1. Go to `yoursite.vercel.app/contact`
2. Submit form
3. Check `youcefbounabi@gmail.com`

### Test Stripe:
1. Go to `yoursite.vercel.app/programs`
2. Click any "SELECT" button
3. Use test card: `4242 4242 4242 4242`
4. Complete payment

---

## Why This Happens

Vite is designed for frontend development, while Vercel API routes are serverless backend functions. They use different execution models and can't easily run together in development. Vercel CLI bridges this gap, but deployment is the simplest solution.
