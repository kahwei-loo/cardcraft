"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Lantern {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
    glowColor: string;
}

interface LanternEffectProps {
    active?: boolean;
    count?: number;
    colors?: string[];
}

const DEFAULT_LANTERN_COLORS = ["#C8102E", "#FFD700", "#FF6B35", "#E91E63"];

export default function LanternEffect({
    active = true,
    count = 12,
    colors = DEFAULT_LANTERN_COLORS,
}: LanternEffectProps) {
    const [lanterns, setLanterns] = useState<Lantern[]>([]);

    useEffect(() => {
        if (!active) return;

        const generated: Lantern[] = Array.from({ length: count }, (_, i) => {
            const color = colors[i % colors.length];
            return {
                id: i,
                x: 5 + Math.random() * 90,
                y: 10 + Math.random() * 60,
                size: 20 + Math.random() * 20,
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 3,
                color,
                glowColor: color + "40",
            };
        });
        setLanterns(generated);
    }, [active, count, colors]);

    if (!active || lanterns.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {lanterns.map((l) => (
                <motion.div
                    key={l.id}
                    className="absolute flex flex-col items-center"
                    style={{
                        left: `${l.x}%`,
                        top: `${l.y}%`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        x: [-5, 5, -5],
                    }}
                    transition={{
                        y: {
                            duration: l.duration,
                            repeat: Infinity,
                            delay: l.delay,
                            ease: "easeInOut",
                        },
                        x: {
                            duration: l.duration * 1.3,
                            repeat: Infinity,
                            delay: l.delay,
                            ease: "easeInOut",
                        },
                    }}
                >
                    {/* String */}
                    <div
                        className="w-px h-3"
                        style={{ backgroundColor: l.color + "80" }}
                    />
                    {/* Lantern body */}
                    <div
                        className="rounded-full relative"
                        style={{
                            width: l.size,
                            height: l.size * 1.3,
                            backgroundColor: l.color,
                            boxShadow: `0 0 ${l.size * 0.8}px ${l.glowColor}, 0 0 ${l.size * 1.5}px ${l.glowColor}`,
                            borderRadius: "45% 45% 50% 50%",
                        }}
                    >
                        {/* Inner glow */}
                        <motion.div
                            className="absolute inset-2 rounded-full"
                            style={{
                                background: `radial-gradient(circle, rgba(255,255,200,0.6) 0%, transparent 70%)`,
                            }}
                            animate={{ opacity: [0.5, 0.9, 0.5] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                    {/* Bottom tassel */}
                    <div
                        className="w-1 h-4 rounded-b"
                        style={{ backgroundColor: l.color + "B0" }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
