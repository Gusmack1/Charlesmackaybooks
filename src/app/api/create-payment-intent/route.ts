import { NextRequest, NextResponse } from 'next/server';

// Only import Stripe if we have the required environment variables
let stripe: any = null;

try {
  if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require('stripe');
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    });
  }
} catch (error) {
  console.warn('Stripe not initialized - missing environment variables');
}

export async function POST(request: NextRequest) {
  // Check if Stripe is properly initialized
  if (!stripe) {
    return NextResponse.json(
      { error: 'Payment service not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { amount, currency = 'gbp', customerEmail, orderId, items } = body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      );
    }

    // Convert amount to pence (Stripe expects amounts in smallest currency unit)
    const amountInPence = Math.round(amount * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId || 'unknown',
        customerEmail: customerEmail,
        items: JSON.stringify(items || []),
        businessName: 'Charles E. MacKay Aviation Books',
      },
      receipt_email: customerEmail,
      description: `Order ${orderId || 'unknown'} - Charles E. MacKay Aviation Books`,
      shipping: {
        name: 'Charles E. MacKay',
        address: {
          country: 'GB',
        },
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    if (error instanceof Error && 'type' in error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
