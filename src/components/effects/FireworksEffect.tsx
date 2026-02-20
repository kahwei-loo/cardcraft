"use client";

import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface FireworksEffectProps {
    active?: boolean;
    colors?: string[];
}

export default function FireworksEffect({
    active = true,
    colors = ["#C8102E", "#FFD700", "#FF6B35", "#E91E63", "#4A90D9"],
}: FireworksEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiRef = useRef<confetti.CreateTypes | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (canvasRef.current && !confettiRef.current) {
            confettiRef.current = confetti.create(canvasRef.current, { resize: true });
        }
    }, []);

    const firework = useCallback(() => {
        if (!confettiRef.current) return;
        const x = 0.2 + Math.random() * 0.6;
        const y = 0.1 + Math.random() * 0.3;

        confettiRef.current({
            particleCount: 80,
            startVelocity: 25,
            spread: 360,
            origin: { x, y },
            colors: colors.slice(0, 3),
            gravity: 0.6,
            ticks: 300,
            shapes: ["circle"],
            scalar: 0.8,
            disableForReducedMotion: true,
        });

        // Secondary burst slightly delayed
        setTimeout(() => {
            confettiRef.current?.({
                particleCount: 40,
                startVelocity: 15,
                spread: 360,
                origin: { x: x + (Math.random() - 0.5) * 0.1, y: y + 0.05 },
                colors: colors.slice(2),
                gravity: 0.6,
                ticks: 200,
                shapes: ["circle"],
                scalar: 0.5,
                disableForReducedMotion: true,
            });
        }, 200);
    }, [colors]);

    useEffect(() => {
        if (!active) return;

        // Initial firework
        firework();

        // Periodic fireworks
        intervalRef.current = setInterval(firework, 4000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [active, firework]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
    );
}
