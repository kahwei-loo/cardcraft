import { LucideIcon } from "lucide-react";

// ============================================================
// Holiday & Theme Types
// ============================================================

export type HolidayType =
    | "chinese-new-year"
    | "christmas"
    | "valentines"
    | "birthday"
    | "thanksgiving"
    | "eid"
    | "diwali"
    | "general";

export type CardMode = "web" | "ai";

export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
}

export interface ThemeConfig {
    id: string;
    name: string;
    holiday: HolidayType;
    colors: ThemeColors;
    gradientFrom: string;
    gradientTo: string;
    patternClass: string;
    iconSet: string[];
    fontDisplay: string;
    fontBody: string;
}

// ============================================================
// Card Template Types
// ============================================================

export type TemplateId =
    | "spring-festival"
    | "winter-wonder"
    | "love-bloom"
    | "party-pop"
    | "golden-harvest"
    | "lantern-glow";

export type EffectType =
    | "confetti"
    | "fireworks"
    | "snow"
    | "petals"
    | "lanterns"
    | "sparkle"
    | "none";

export interface CardTemplate {
    id: TemplateId;
    name: string;
    description: string;
    holiday: HolidayType;
    thumbnail: string;
    effects: EffectType[];
    defaultGreetingKey: string;
    layoutStyle: "centered" | "split" | "overlay" | "framed";
}

// ============================================================
// Card Configuration (user's current card state)
// ============================================================

export interface CardConfig {
    mode: CardMode;
    templateId: TemplateId | null;
    themeId: string;
    greeting: string;
    subGreeting: string;
    senderName: string;
    recipientName: string;
    effects: EffectType[];
    seed: number;
    customImageUrl: string | null;
    aiGeneratedUrl: string | null;
}

export const DEFAULT_CARD_CONFIG: CardConfig = {
    mode: "web",
    templateId: null,
    themeId: "cny-red-gold",
    greeting: "",
    subGreeting: "",
    senderName: "",
    recipientName: "",
    effects: ["confetti"],
    seed: Date.now(),
    customImageUrl: null,
    aiGeneratedUrl: null,
};

// ============================================================
// Saved Card (persisted to Supabase)
// ============================================================

export interface SavedCard {
    id: string;
    short_id: string;
    config: CardConfig;
    preview_url: string | null;
    created_at: string;
    view_count: number;
}

// ============================================================
// Floating Element Types (for background animations)
// ============================================================

export interface FloatingElementConfig {
    id: number;
    Icon: LucideIcon;
    left: number;
    top: number;
    delay: number;
    duration: number;
    scale: number;
    rotation: number;
}

// ============================================================
// Share Types
// ============================================================

export type ShareMethod = "link" | "qr" | "native" | "image";

export interface ShareData {
    cardId: string;
    shortId: string;
    url: string;
    title: string;
    description: string;
}
