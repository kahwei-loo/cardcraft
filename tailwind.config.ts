import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                parchment: {
                    DEFAULT: "#FAF8F4",
                    dark: "#E8E4DC",
                },
                ink: {
                    DEFAULT: "#402F26",
                    light: "#6B5D55",
                },
                sage: {
                    DEFAULT: "#D6CCC2",
                    500: "#D6CCC2",
                },
                berry: {
                    DEFAULT: "#A63044",
                    light: "#C0596A",
                },
                // Dynamic card theme colors (set via CSS vars)
                card: {
                    primary: "var(--card-primary, #C8102E)",
                    secondary: "var(--card-secondary, #FFD700)",
                    accent: "var(--card-accent, #8B0000)",
                    bg: "var(--card-bg, #FFF8F0)",
                    fg: "var(--card-fg, #2D0A0A)",
                    muted: "var(--card-muted, #F5E6D3)",
                },
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', "Cambria", "Cochin", "Georgia", "Times", "serif"],
                display: ['"Playfair Display"', '"Cormorant Garamond"', "Georgia", "serif"],
                chinese: ['"Ma Shan Zheng"', '"Noto Serif SC"', "serif"],
                "chinese-body": ['"Noto Serif SC"', '"Ma Shan Zheng"', "serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "card-gradient": "linear-gradient(135deg, var(--card-gradient-from, #C8102E), var(--card-gradient-to, #8B0000))",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                shimmer: "shimmer 2s linear infinite",
                pulse: "pulse 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
export default config;
