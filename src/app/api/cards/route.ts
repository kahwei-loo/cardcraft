import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MAX_STRING_LEN = 500;
const VALID_MODES = new Set(["web", "ai"]);
const VALID_FORMATS = new Set(["greeting-card", "postcard"]);
const VALID_EFFECTS = new Set(["confetti", "fireworks", "snow", "petals", "lanterns", "sparkle", "none"]);

function sanitizeString(val: unknown, maxLen = MAX_STRING_LEN): string {
    if (typeof val !== "string") return "";
    return val.slice(0, maxLen).replace(/<[^>]*>/g, "");
}

function validateConfig(raw: unknown): { valid: boolean; config?: Record<string, unknown>; error?: string } {
    if (!raw || typeof raw !== "object") return { valid: false, error: "Missing config" };
    const c = raw as Record<string, unknown>;

    const mode = typeof c.mode === "string" && VALID_MODES.has(c.mode) ? c.mode : "web";
    const outputFormat = typeof c.outputFormat === "string" && VALID_FORMATS.has(c.outputFormat) ? c.outputFormat : "greeting-card";
    const effects = Array.isArray(c.effects)
        ? (c.effects as unknown[]).filter((e): e is string => typeof e === "string" && VALID_EFFECTS.has(e)).slice(0, 5)
        : ["confetti"];

    return {
        valid: true,
        config: {
            mode,
            outputFormat,
            templateId: typeof c.templateId === "string" ? c.templateId.slice(0, 50) : null,
            themeId: typeof c.themeId === "string" ? c.themeId.slice(0, 50) : "cny-red-gold",
            greeting: sanitizeString(c.greeting, 300),
            subGreeting: sanitizeString(c.subGreeting, 300),
            senderName: sanitizeString(c.senderName, 100),
            recipientName: sanitizeString(c.recipientName, 100),
            effects,
            seed: typeof c.seed === "number" ? c.seed : Date.now(),
            customImageUrl: null,
            aiGeneratedUrl: typeof c.aiGeneratedUrl === "string" && c.aiGeneratedUrl.startsWith("https://") ? c.aiGeneratedUrl.slice(0, 500) : null,
            aiStyleId: typeof c.aiStyleId === "string" ? c.aiStyleId.slice(0, 30) : null,
        },
    };
}

/**
 * POST /api/cards — Save a card and return its share URL
 */
export async function POST(request: Request) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 503 }
            );
        }

        const body = await request.json();
        const result = validateConfig(body.config);

        if (!result.valid || !result.config) {
            return NextResponse.json(
                { error: result.error || "Invalid card config" },
                { status: 400 }
            );
        }

        const shortId = nanoid(10);

        const { data, error } = await supabaseAdmin
            .from("cards")
            .insert({
                short_id: shortId,
                config: result.config,
                preview_url: null,
            })
            .select("id, short_id, created_at")
            .single();

        if (error) {
            console.error("Save card error:", error);
            // Distinguish connection errors from other failures
            const isConnectionError = error.message?.includes("fetch") ||
                error.message?.includes("network") ||
                error.code === "PGRST301";
            return NextResponse.json(
                { error: "Failed to save card" },
                { status: isConnectionError ? 503 : 500 }
            );
        }

        return NextResponse.json({
            id: data.id,
            shortId: data.short_id,
            createdAt: data.created_at,
        });
    } catch (error) {
        console.error("Save card error:", error);
        return NextResponse.json(
            { error: "Service temporarily unavailable" },
            { status: 503 }
        );
    }
}
