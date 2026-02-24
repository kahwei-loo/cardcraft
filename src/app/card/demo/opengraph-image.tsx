import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Demo Festive E-Card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
                    background: "linear-gradient(135deg, #C8102E, #8B0000)",
                    fontFamily: "serif",
                    padding: "60px",
                }}
            >
                {/* Decorative border */}
                <div
                    style={{
                        position: "absolute",
                        inset: "20px",
                        border: "2px solid rgba(255,255,255,0.2)",
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
                    Happy New Year!
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: 80,
                        height: 3,
                        background: "#FFD700",
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
                        display: "flex",
                    }}
                >
                    Wishing you prosperity and joy
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
