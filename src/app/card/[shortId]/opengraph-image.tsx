import { ImageResponse } from "next/og";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getThemeById } from "@/lib/themes";
import { DEFAULT_CARD_CONFIG } from "@/types/card";

export const runtime = "edge";
export const alt = "Festive E-Card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { shortId: string } }) {
    let greeting = "A Festive Greeting Card";
    let subGreeting = "Made with Festive E-Card Studio";
    let gradientFrom = "#C8102E";
    let gradientTo = "#8B0000";
    let accentColor = "#FFD700";

    try {
        const { data } = await supabaseAdmin
            .from("cards")
            .select("config")
            .eq("short_id", params.shortId)
            .single();

        if (data?.config) {
            const config = { ...DEFAULT_CARD_CONFIG, ...data.config };
            greeting = config.greeting || greeting;
            subGreeting = config.subGreeting || subGreeting;

            const theme = getThemeById(config.themeId);
            if (theme) {
                gradientFrom = theme.gradientFrom;
                gradientTo = theme.gradientTo;
                accentColor = theme.colors.secondary;
            }
        }
    } catch {
        // Fallback to defaults if Supabase unreachable
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    fontFamily: "serif",
                    padding: "60px",
                }}
            >
                {/* Decorative border */}
                <div
                    style={{
                        position: "absolute",
                        inset: "20px",
                        border: `2px solid rgba(255,255,255,0.2)`,
                        borderRadius: "16px",
                        display: "flex",
                    }}
                />

                {/* Greeting text */}
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color: "white",
                        textAlign: "center",
                        lineHeight: 1.2,
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        display: "flex",
                    }}
                >
                    {greeting}
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: 80,
                        height: 3,
                        background: accentColor,
                        borderRadius: 4,
                        margin: "24px 0",
                        display: "flex",
                    }}
                />

                {/* Sub greeting */}
                <div
                    style={{
                        fontSize: 28,
                        color: "rgba(255,255,255,0.85)",
                        textAlign: "center",
                        fontStyle: "italic",
                        maxWidth: 600,
                        display: "flex",
                    }}
                >
                    {subGreeting}
                </div>

                {/* Branding */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 30,
                        fontSize: 16,
                        color: "rgba(255,255,255,0.5)",
                        display: "flex",
                    }}
                >
                    Festive E-Card Studio
                </div>
            </div>
        ),
        { ...size }
    );
}
