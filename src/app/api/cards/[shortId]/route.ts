import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * GET /api/cards/[shortId] — Fetch a card by its short ID
 */
export async function GET(
    _request: Request,
    { params }: { params: { shortId: string } }
) {
    try {
        const { shortId } = params;

        const { data, error } = await supabaseAdmin
            .from("cards")
            .select("*")
            .eq("short_id", shortId)
            .single();

        if (error || !data) {
            return NextResponse.json(
                { error: "Card not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: data.id,
            shortId: data.short_id,
            config: data.config,
            previewUrl: data.preview_url,
            createdAt: data.created_at,
            viewCount: data.view_count ?? 0,
        });
    } catch (error) {
        console.error("Fetch card error:", error);
        return NextResponse.json(
            { error: "Service temporarily unavailable" },
            { status: 503 }
        );
    }
}
