import { ThemeConfig, HolidayType } from "@/types/card";

// ============================================================
// Theme Definitions
// ============================================================

export const THEMES: ThemeConfig[] = [
    // Chinese New Year
    {
        id: "cny-red-gold",
        name: "Prosperity Red",
        holiday: "chinese-new-year",
        colors: {
            primary: "#C8102E",
            secondary: "#FFD700",
            accent: "#8B0000",
            background: "#FFF8F0",
            foreground: "#2D0A0A",
            muted: "#F5E6D3",
        },
        gradientFrom: "#C8102E",
        gradientTo: "#8B0000",
        patternClass: "pattern-cny",
        iconSet: ["lantern", "firecracker", "horse", "coin"],
        fontDisplay: "Ma Shan Zheng",
        fontBody: "Noto Serif SC",
    },
    {
        id: "cny-jade",
        name: "Jade Fortune",
        holiday: "chinese-new-year",
        colors: {
            primary: "#2E8B57",
            secondary: "#FFD700",
            accent: "#006400",
            background: "#F0FFF0",
            foreground: "#1A3A1A",
            muted: "#D4EDDA",
        },
        gradientFrom: "#2E8B57",
        gradientTo: "#006400",
        patternClass: "pattern-cny-jade",
        iconSet: ["bamboo", "horse", "jade", "cloud"],
        fontDisplay: "Ma Shan Zheng",
        fontBody: "Noto Serif SC",
    },

    // Christmas
    {
        id: "xmas-classic",
        name: "Classic Christmas",
        holiday: "christmas",
        colors: {
            primary: "#165B33",
            secondary: "#BB2528",
            accent: "#EA4630",
            background: "#FFF9F0",
            foreground: "#1B1B1B",
            muted: "#E8E4DC",
        },
        gradientFrom: "#165B33",
        gradientTo: "#0A3D22",
        patternClass: "pattern-xmas",
        iconSet: ["tree", "star", "snowflake", "gift"],
        fontDisplay: "Playfair Display",
        fontBody: "Cormorant Garamond",
    },
    {
        id: "xmas-frost",
        name: "Winter Frost",
        holiday: "christmas",
        colors: {
            primary: "#4A90D9",
            secondary: "#C0D8F0",
            accent: "#1E3A5F",
            background: "#F0F8FF",
            foreground: "#1A2A3A",
            muted: "#D6E8F5",
        },
        gradientFrom: "#4A90D9",
        gradientTo: "#1E3A5F",
        patternClass: "pattern-frost",
        iconSet: ["snowflake", "star", "moon", "ice"],
        fontDisplay: "Playfair Display",
        fontBody: "Cormorant Garamond",
    },

    // Valentine's Day
    {
        id: "valentine-rose",
        name: "Rose Romance",
        holiday: "valentines",
        colors: {
            primary: "#E91E63",
            secondary: "#FF80AB",
            accent: "#AD1457",
            background: "#FFF0F5",
            foreground: "#3E1929",
            muted: "#FCE4EC",
        },
        gradientFrom: "#E91E63",
        gradientTo: "#AD1457",
        patternClass: "pattern-valentine",
        iconSet: ["heart", "rose", "cupid", "ribbon"],
        fontDisplay: "Playfair Display",
        fontBody: "Cormorant Garamond",
    },

    // Birthday
    {
        id: "birthday-party",
        name: "Party Time",
        holiday: "birthday",
        colors: {
            primary: "#FF6B35",
            secondary: "#FFD166",
            accent: "#06D6A0",
            background: "#FFFBF0",
            foreground: "#2B2B2B",
            muted: "#FFF0E0",
        },
        gradientFrom: "#FF6B35",
        gradientTo: "#F7931E",
        patternClass: "pattern-birthday",
        iconSet: ["cake", "balloon", "gift", "star"],
        fontDisplay: "Playfair Display",
        fontBody: "Cormorant Garamond",
    },

    // General / Universal
    {
        id: "elegant-gold",
        name: "Elegant Gold",
        holiday: "general",
        colors: {
            primary: "#B8860B",
            secondary: "#DAA520",
            accent: "#8B6914",
            background: "#FFFDF5",
            foreground: "#2C2416",
            muted: "#F5ECD7",
        },
        gradientFrom: "#B8860B",
        gradientTo: "#8B6914",
        patternClass: "pattern-elegant",
        iconSet: ["sparkle", "star", "feather", "crown"],
        fontDisplay: "Playfair Display",
        fontBody: "Cormorant Garamond",
    },
];

// ============================================================
// Theme Helpers
// ============================================================

export function getThemeById(id: string): ThemeConfig | undefined {
    return THEMES.find((t) => t.id === id);
}

export function getThemesByHoliday(holiday: HolidayType): ThemeConfig[] {
    return THEMES.filter((t) => t.holiday === holiday);
}

export function getDefaultTheme(): ThemeConfig {
    return THEMES[0];
}

/**
 * Generate CSS custom properties from a theme for inline styling
 */
export function themeToCSS(theme: ThemeConfig): Record<string, string> {
    return {
        "--card-primary": theme.colors.primary,
        "--card-secondary": theme.colors.secondary,
        "--card-accent": theme.colors.accent,
        "--card-bg": theme.colors.background,
        "--card-fg": theme.colors.foreground,
        "--card-muted": theme.colors.muted,
        "--card-gradient-from": theme.gradientFrom,
        "--card-gradient-to": theme.gradientTo,
    };
}
