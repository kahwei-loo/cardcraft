import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _adminClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client with service role key.
 * Returns null when env vars are not configured (e.g. portfolio demo without DB).
 * Only use in API routes / server components — never expose to client.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
    if (_adminClient) return _adminClient;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    _adminClient = createClient(url, key);
    return _adminClient;
}

/** @deprecated Use getSupabaseAdmin() which handles missing env vars gracefully */
export const supabaseAdmin = null as unknown as SupabaseClient;
