# Quick Test Guide

Your API keys are now configured! Here's how to test each integration:

## 🧪 Test Email Forwarding (5 min)

1. Open: **http://localhost:3000/contact**
2. Fill out the application form with:
   - Your name
   - A test email address (use your personal email to verify)
   - Experience level
   - Goal and message
3. Click **APPLY NOW**
4. You should see: "✓ Application Received!"

**Expected Results:**
- Email to **youcefbounabi@gmail.com** with applicant details
- Confirmation email to the test email address

---

## 💳 Test Stripe Checkout (5 min)

1. Open: **http://localhost:3000/programs**
2. Click **SELECT BASIC** (or any tier)
3. You'll be redirected to Stripe Checkout
4. Use test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - Postal: Any 5 digits (e.g., 12345)
5. Click **Subscribe**

**Expected Results:**
- Redirect to **http://localhost:3000/success**
- In Stripe Dashboard → Customers, you'll see the test subscription

---

## 🐛 Troubleshooting

**Email not sending?**
- Check browser console (F12) for errors
- Verify RESEND_API_KEY is correct in `.env`
- Check spam folder

**Stripe not working?**
- Check browser console for errors
- Verify Stripe keys are correct in `.env`
- Make sure you're using the test card number

**Still having issues?**
- Restart dev server: Ctrl+C then `npm run dev`
- Check terminal for error messages
