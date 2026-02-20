"use client";

import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
    active?: boolean;
    colors?: string[];
    intensity?: "light" | "medium" | "heavy";
}

const INTENSITY_MAP = {
    light: { particleCount: 30, spread: 60 },
    medium: { particleCount: 60, spread: 80 },
    heavy: { particleCount: 100, spread: 120 },
};

export default function ConfettiEffect({
    active = true,
    colors = ["#C8102E", "#FFD700", "#FF6B35", "#06D6A0", "#4A90D9"],
    intensity = "medium",
}: ConfettiEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiRef = useRef<confetti.CreateTypes | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (canvasRef.current && !confettiRef.current) {
            confettiRef.current = confetti.create(canvasRef.current, { resize: true });
        }
    }, []);

    const fire = useCallback(() => {
        if (!confettiRef.current) return;
        const { particleCount, spread } = INTENSITY_MAP[intensity];

        confettiRef.current({
            particleCount,
            spread,
            colors,
            origin: { x: Math.random(), y: Math.random() * 0.4 },
            gravity: 0.8,
            ticks: 200,
            disableForReducedMotion: true,
        });
    }, [colors, intensity]);

    useEffect(() => {
        if (!active) return;

        // Initial burst
        fire();

        // Periodic bursts
        intervalRef.current = setInterval(fire, 3000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [active, fire]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
    );
}
