import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { CardConfig } from "@/types/card";

/**
 * POST /api/cards — Save a card and return its share URL
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const config: CardConfig = body.config;

        if (!config) {
            return NextResponse.json(
                { error: "Missing card config" },
                { status: 400 }
            );
        }

        const shortId = nanoid(10);

        const { data, error } = await supabaseAdmin
            .from("cards")
            .insert({
                short_id: shortId,
                config,
                preview_url: body.previewUrl ?? null,
            })
            .select("id, short_id, created_at")
            .single();

        if (error) {
            console.error("Save card error:", error);
            return NextResponse.json(
                { error: "Failed to save card" },
                { status: 500 }
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
            { error: "Failed to save card" },
            { status: 500 }
        );
    }
}
