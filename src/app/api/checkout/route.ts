import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16', // Use latest API version compatible with the library
});

export async function POST(request: Request) {
    try {
        const { quantity = 1, returnUrl } = await request.json();

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Holiday Card Credit',
                            description: 'Credits to generate magical holiday cards',
                            images: ['https://holiday.mitbunny.ai/snowflake-icon.png'], // Replace with actual image
                        },
                        unit_amount: 100, // $1.00 per credit
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${returnUrl}?canceled=true`,
            metadata: {
                creditsToAdd: quantity,
                // In a real app, you'd pass the user ID here
                // userId: "user_123" 
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: 'Error creating checkout session' },
            { status: 500 }
        );
    }
}
