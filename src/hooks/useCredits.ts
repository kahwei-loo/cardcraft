"use client";

import { useState, useEffect, useCallback } from "react";

const CREDITS_KEY = "ecard-ai-credits";
const DEFAULT_CREDITS = 3;

export function useCredits() {
    // Lazy initialization avoids hydration mismatch — localStorage is only
    // read on the client after mount, so the server and client both start
    // with the same DEFAULT_CREDITS value.
    const [credits, setCredits] = useState<number>(DEFAULT_CREDITS);
    const [initialized, setInitialized] = useState(false);

    // Sync FROM localStorage on mount (client only)
    useEffect(() => {
        const stored = localStorage.getItem(CREDITS_KEY);
        if (stored !== null) {
            const parsed = parseInt(stored, 10);
            if (!isNaN(parsed)) setCredits(parsed);
        }
        setInitialized(true);
    }, []);

    // Sync TO localStorage on every change (after initial load)
    useEffect(() => {
        if (initialized) {
            localStorage.setItem(CREDITS_KEY, String(credits));
        }
    }, [credits, initialized]);

    const deductCredit = useCallback(() => {
        setCredits((prev) => Math.max(0, prev - 1));
    }, []);

    const addCredits = useCallback((amount: number) => {
        setCredits((prev) => prev + amount);
    }, []);

    return { credits, deductCredit, addCredits };
}
