import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";
import CardViewer from "./CardViewer";

interface PageProps {
    params: { shortId: string };
}

async function getCard(shortId: string) {
    const { data, error } = await supabaseAdmin
        .from("cards")
        .select("*")
        .eq("short_id", shortId)
        .single();

    if (error || !data) return null;

    // Increment view count (fire and forget)
    supabaseAdmin
        .from("cards")
        .update({ view_count: (data.view_count ?? 0) + 1 })
        .eq("id", data.id)
        .then(() => {});

    return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const card = await getCard(params.shortId);

    if (!card) {
        return { title: "Card Not Found" };
    }

    const greeting = card.config?.greeting || "A festive greeting card";
    const subGreeting = card.config?.subGreeting || "Made with Festive E-Card Studio";

    return {
        title: `${greeting} - Festive E-Card Studio`,
        description: subGreeting,
        openGraph: {
            title: greeting,
            description: subGreeting,
            type: "website",
            ...(card.preview_url && { images: [{ url: card.preview_url }] }),
        },
        twitter: {
            card: "summary_large_image",
            title: greeting,
            description: subGreeting,
            ...(card.preview_url && { images: [card.preview_url] }),
        },
    };
}

export default async function CardPage({ params }: PageProps) {
    const card = await getCard(params.shortId);

    if (!card) {
        notFound();
    }

    return <CardViewer config={card.config} shortId={card.short_id} />;
}
