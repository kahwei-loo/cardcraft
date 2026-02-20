import { CardTemplate } from "@/types/card";

// ============================================================
// Card Template Definitions
// ============================================================

export const TEMPLATES: CardTemplate[] = [
    {
        id: "spring-festival",
        name: "Spring Festival",
        description: "Celebrate Chinese New Year with lanterns, fireworks, and golden accents",
        holiday: "chinese-new-year",
        thumbnail: "/templates/spring-festival.svg",
        effects: ["fireworks", "lanterns"],
        defaultGreetingKey: "cny-1",
        layoutStyle: "centered",
    },
    {
        id: "winter-wonder",
        name: "Winter Wonderland",
        description: "A magical snowy scene with gentle snowfall and frosted details",
        holiday: "christmas",
        thumbnail: "/templates/winter-wonder.svg",
        effects: ["snow", "sparkle"],
        defaultGreetingKey: "xmas-1",
        layoutStyle: "overlay",
    },
    {
        id: "love-bloom",
        name: "Love in Bloom",
        description: "Romantic design with floating petals and warm hearts",
        holiday: "valentines",
        thumbnail: "/templates/love-bloom.svg",
        effects: ["petals", "sparkle"],
        defaultGreetingKey: "val-1",
        layoutStyle: "split",
    },
    {
        id: "party-pop",
        name: "Party Pop",
        description: "Vibrant birthday celebration with confetti and balloons",
        holiday: "birthday",
        thumbnail: "/templates/party-pop.svg",
        effects: ["confetti"],
        defaultGreetingKey: "bday-1",
        layoutStyle: "centered",
    },
    {
        id: "golden-harvest",
        name: "Golden Harvest",
        description: "Warm autumn tones with elegant golden accents for gratitude",
        holiday: "thanksgiving",
        thumbnail: "/templates/golden-harvest.svg",
        effects: ["sparkle"],
        defaultGreetingKey: "thanks-1",
        layoutStyle: "framed",
    },
    {
        id: "lantern-glow",
        name: "Lantern Glow",
        description: "Floating paper lanterns in a dreamy night sky",
        holiday: "chinese-new-year",
        thumbnail: "/templates/lantern-glow.svg",
        effects: ["lanterns", "sparkle"],
        defaultGreetingKey: "cny-4",
        layoutStyle: "overlay",
    },
];

// ============================================================
// Template Helpers
// ============================================================

export function getTemplateById(id: string): CardTemplate | undefined {
    return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByHoliday(holiday: string): CardTemplate[] {
    return TEMPLATES.filter((t) => t.holiday === holiday);
}
