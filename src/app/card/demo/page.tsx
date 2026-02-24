import { Metadata } from "next";
import { CardConfig, DEFAULT_CARD_CONFIG } from "@/types/card";
import CardViewer from "../[shortId]/CardViewer";

const DEMO_CONFIG: CardConfig = {
    ...DEFAULT_CARD_CONFIG,
    templateId: "spring-festival",
    themeId: "cny-red-gold",
    greeting: "Happy New Year!",
    subGreeting: "Wishing you prosperity and joy",
    effects: ["fireworks", "lanterns"],
    seed: 2026,
};

export const metadata: Metadata = {
    title: "Demo Card - Festive E-Card Studio",
    description: "See what a festive greeting card looks like! Create your own for free.",
    openGraph: {
        title: "Happy New Year! - Demo Card",
        description: "Wishing you prosperity and joy. Create your own festive greeting card!",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Happy New Year! - Demo Card",
        description: "Wishing you prosperity and joy. Create your own festive greeting card!",
    },
};

export default function DemoCardPage() {
    return <CardViewer config={DEMO_CONFIG} shortId="demo" />;
}
