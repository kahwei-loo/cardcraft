"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
}

interface SparkleEffectProps {
    active?: boolean;
    count?: number;
    color?: string;
    colors?: string[];
}

export default function SparkleEffect({
    active = true,
    count = 20,
    color = "#FFD700",
    colors,
}: SparkleEffectProps) {
    const sparkleColor = colors?.[1] ?? color;
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        if (!active) return;

        const generated: Sparkle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 3 + Math.random() * 8,
            duration: 1.5 + Math.random() * 2,
            delay: Math.random() * 4,
            color: sparkleColor,
        }));
        setSparkles(generated);
    }, [active, count, sparkleColor]);

    useEffect(() => {
        if (!active) return;

        // Regenerate positions periodically for variety
        const interval = setInterval(() => {
            setSparkles((prev) =>
                prev.map((s) => ({
                    ...s,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    delay: 0,
                }))
            );
        }, 6000);

        return () => clearInterval(interval);
    }, [active]);

    if (!active || sparkles.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180],
                    }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: "easeInOut",
                    }}
                >
                    {/* 4-point star shape via CSS */}
                    <svg
                        width={s.size}
                        height={s.size}
                        viewBox="0 0 20 20"
                        fill={s.color}
                    >
                        <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
