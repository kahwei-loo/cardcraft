import { AIStyleConfig } from "@/types/card";

export const AI_STYLES: AIStyleConfig[] = [
    {
        id: "watercolor",
        name: "Watercolor",
        prompt:
            "watercolor painting style, soft flowing colors, wet-on-wet technique, dreamy atmosphere, delicate brush strokes, festive holiday card, warm lighting, artistic",
        icon: "🎨",
        description: "Soft, flowing watercolor painting with dreamy washes",
        strength: 0.75,
    },
    {
        id: "oil-painting",
        name: "Oil Painting",
        prompt:
            "oil painting masterpiece, rich thick impasto brushstrokes, classical art style, vivid colors, dramatic lighting, holiday card, museum quality, detailed texture",
        icon: "🖼️",
        description: "Rich, textured oil painting with vivid colors",
        strength: 0.78,
    },
    {
        id: "manga",
        name: "Manga",
        prompt:
            "manga illustration style, clean line art, expressive eyes, dynamic composition, screentone shading, Japanese comic book aesthetic, festive holiday theme, vibrant",
        icon: "📖",
        description: "Bold manga-style illustration with clean lines",
        strength: 0.8,
    },
    {
        id: "anime",
        name: "Anime",
        prompt:
            "anime art style, Studio Ghibli inspired, soft cel shading, pastel colors, magical atmosphere, sparkling effects, holiday celebration, beautiful detailed background",
        icon: "✨",
        description: "Soft anime aesthetic with magical atmosphere",
        strength: 0.78,
    },
    {
        id: "sketch",
        name: "Pencil Sketch",
        prompt:
            "detailed pencil sketch, graphite drawing, fine hatching and cross-hatching, elegant linework, artistic shading, holiday greeting card, hand-drawn feel, monochrome with subtle warmth",
        icon: "✏️",
        description: "Elegant pencil sketch with fine hatching detail",
        strength: 0.82,
    },
    {
        id: "pop-art",
        name: "Pop Art",
        prompt:
            "pop art style, bold primary colors, Ben-Day dots, thick black outlines, Andy Warhol inspired, comic book halftone, festive celebration, retro vintage graphic art",
        icon: "💥",
        description: "Bold pop art with vibrant colors and halftone dots",
        strength: 0.85,
    },
];

export function getStyleById(styleId: string): AIStyleConfig | undefined {
    return AI_STYLES.find((s) => s.id === styleId);
}
