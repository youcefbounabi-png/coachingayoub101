# Debugging Contact Form - Email Not Sending

The Stripe integration works ✅ but the contact form is failing ❌. Let's debug the Resend email issue.

## Step 1: Check Vercel Function Logs

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Deployments** → Select the latest deployment
4. Click **Functions** tab
5. Find `/api/contact` function
6. Click on it to see the logs

**Look for error messages** - they'll tell us exactly what's wrong (e.g., "Invalid API key", "Missing API key", "Rate limit exceeded").

---

## Step 2: Verify Environment Variable in Vercel

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Find `RESEND_API_KEY`
3. **Check:**
   - Is it spelled exactly as `RESEND_API_KEY`? (case-sensitive)
   - Does the value start with `re_`?
   - Is it enabled for "Production"?

**If it's missing or wrong:**
- Delete and re-add it with the correct value: `re_L6bwptYf_6yEZwk3jrpxNfH7kztcgvdBa`
- Trigger a new deployment (Settings → Deployments → Redeploy)

---

## Step 3: Test Resend API Key

Let's verify your Resend API key is valid:

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Check if the API key `re_L6bwptYf_6yEZwk3jrpxNfH7kztcgvdBa` is listed
3. Make sure it's **active** (not disabled or deleted)
4. Check if you've hit any rate limits (free tier: 100 emails/day)

---

## Step 4: Check Email Domain

The code currently uses `onboarding@resend.dev` as the sender. This works but:
- Resend may require verification for production use
- Check [Resend Domains](https://resend.com/domains) to see if verification is needed

---

## Common Issues & Fixes

### Issue: "Invalid API key"
**Fix:** The key in Vercel doesn't match. Re-add `RESEND_API_KEY` with the correct value.

### Issue: "Missing API key"  
**Fix:** Vercel environment variable name is misspelled. Must be exactly `RESEND_API_KEY`.

### Issue: "Rate limit exceeded"
**Fix:** Free Resend tier is 100 emails/day. Check your usage or upgrade.

### Issue: "Domain not verified"
**Fix:** Resend may block production sends. Verify your domain in Resend dashboard.

---

## Quick Test

After fixing, test again:
1. Go to your site `/contact`
2. Submit form
3. Check Vercel function logs immediately
4. Check `youcefbounabi@gmail.com` inbox (and spam folder)

---

## Need More Help?

**Share with me:**
1. What error appears in Vercel function logs?
2. Screenshot of your Vercel environment variables (hide the values)
3. Is the Resend API key active in your Resend dashboard?
