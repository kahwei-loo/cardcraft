import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// import { supabase } from '@/lib/supabase'; // We would use admin client here for DB updates

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

const secret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, secret);
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        console.log(`Payment successful for Session ID: ${session.id}`);

        // Retrieve metadata
        const creditsToAdd = session.metadata?.creditsToAdd;
        // const userId = session.metadata?.userId;

        // TODO: Update User Credits in Supabase
        // await supabaseAdmin.from('users').update(...)

        // For now, we'll just log it. 
        // In a real app without auth, maybe we send a coupon code to the user's email?
    }

    return NextResponse.json({ received: true });
}
