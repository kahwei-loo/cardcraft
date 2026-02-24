import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { DEFAULT_CARD_CONFIG, CardConfig } from "@/types/card";
import CardViewer from "./CardViewer";

interface PageProps {
    params: { shortId: string };
}

type CardResult =
    | { type: "success"; data: Record<string, unknown> }
    | { type: "not_found" }
    | { type: "error" };

async function getCard(shortId: string): Promise<CardResult> {
    try {
        const { data, error } = await supabaseAdmin
            .from("cards")
            .select("*")
            .eq("short_id", shortId)
            .single();

        if (error || !data) return { type: "not_found" };

        // Increment view count atomically (fire and forget)
        supabaseAdmin.rpc("increment_view_count", { card_id: data.id }).then(() => {});

        return { type: "success", data };
    } catch {
        return { type: "error" };
    }
}

/** Merge saved config with defaults so older cards missing new fields still render correctly */
function normalizeConfig(raw: Record<string, unknown>): CardConfig {
    return { ...DEFAULT_CARD_CONFIG, ...raw } as CardConfig;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const result = await getCard(params.shortId);

    if (result.type !== "success") {
        return {
            title: result.type === "error"
                ? "Service Temporarily Unavailable"
                : "Card Not Found",
        };
    }

    const card = result.data;
    const greeting = (card.config as Record<string, unknown>)?.greeting as string || "A festive greeting card";
    const subGreeting = (card.config as Record<string, unknown>)?.subGreeting as string || "Made with Festive E-Card Studio";

    return {
        title: `${greeting} - Festive E-Card Studio`,
        description: subGreeting,
        openGraph: {
            title: greeting,
            description: subGreeting,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: greeting,
            description: subGreeting,
        },
    };
}

export default async function CardPage({ params }: PageProps) {
    const result = await getCard(params.shortId);

    if (result.type === "not_found") {
        notFound();
    }

    if (result.type === "error") {
        return (
            <main className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4">
                <div className="max-w-md text-center space-y-6">
                    <div className="text-6xl">🔧</div>
                    <h1 className="text-2xl font-display font-bold text-ink">
                        Service Temporarily Unavailable
                    </h1>
                    <p className="text-ink/60 font-serif">
                        We&apos;re having trouble loading this card right now. This usually resolves
                        itself in a few moments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={`/card/${params.shortId}`}
                            className="inline-flex items-center justify-center gap-2 bg-berry hover:bg-berry/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                            Try Again
                        </a>
                        <a
                            href="/create"
                            className="inline-flex items-center justify-center gap-2 border border-ink/20 text-ink/70 hover:text-ink font-semibold px-6 py-3 rounded-xl transition-colors"
                        >
                            Create Your Own Card
                        </a>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <CardViewer
            config={normalizeConfig(result.data.config as Record<string, unknown>)}
            shortId={result.data.short_id as string}
        />
    );
}
