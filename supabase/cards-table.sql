-- Cards table for persisting shared greeting cards
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    short_id TEXT NOT NULL UNIQUE,
    config JSONB NOT NULL,
    preview_url TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by short_id
CREATE INDEX IF NOT EXISTS idx_cards_short_id ON cards (short_id);

-- Enable Row Level Security
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view a shared card)
CREATE POLICY "Cards are viewable by everyone"
    ON cards FOR SELECT
    USING (true);

-- Allow inserts from authenticated or service role
CREATE POLICY "Cards can be created via API"
    ON cards FOR INSERT
    WITH CHECK (true);

-- Allow view_count updates
CREATE POLICY "View count can be updated"
    ON cards FOR UPDATE
    USING (true)
    WITH CHECK (true);
