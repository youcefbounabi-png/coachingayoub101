// api/stripe.ts
import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      // Check if Stripe is configured
      if (!process.env.STRIPE_SECRET_KEY) {
        console.error('STRIPE_SECRET_KEY not configured');
        return res.status(500).json({
          error: 'Payment system not configured. Please contact support.'
        });
      }

      const { planId } = req.body as { planId?: string };

      // Price mapping for subscription tiers
      const priceMap: Record<string, { name: string; amount: number }> = {
        basic: { name: 'GET STARTED - Basic Coaching', amount: 14900 },  // $149/mo
        pro: { name: 'ELITE LEVEL - Pro Coaching', amount: 29900 },      // $299/mo
        premium: { name: 'CONTEST PREP - Premium Coaching', amount: 59900 } // $599/mo
      };

      // Validate planId
      if (!planId || !priceMap[planId]) {
        console.error('Invalid planId:', planId);
        return res.status(400).json({
          error: 'Invalid subscription plan selected.'
        });
      }

      const plan = priceMap[planId];

      console.log(`Creating Stripe checkout session for plan: ${planId} (${plan.name})`);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan.name,
                description: `Monthly coaching subscription - ${planId.toUpperCase()}`
              },
              unit_amount: plan.amount,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || 'http://localhost:3000'}/cancel`,
        billing_address_collection: 'required',
        customer_email: undefined, // Let user enter email
      });

      console.log('Stripe session created successfully:', session.id);

      res.status(200).json({ url: session.url });
    } catch (err) {
      const error = err as Error;
      console.error('Stripe checkout error:', error.message, error.stack);
      res.status(500).json({
        error: 'Failed to create payment session. Please try again or contact support.',
        details: error.message
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
