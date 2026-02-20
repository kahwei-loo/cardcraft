"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    rotation: number;
    drift: number;
    color: string;
}

interface PetalsEffectProps {
    active?: boolean;
    count?: number;
    colors?: string[];
}

const DEFAULT_PETAL_COLORS = ["#FFB7C5", "#FF85A2", "#FFC0CB", "#FF69B4", "#DB7093"];

export default function PetalsEffect({
    active = true,
    count = 25,
    colors = DEFAULT_PETAL_COLORS,
}: PetalsEffectProps) {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        if (!active) return;

        const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 8 + Math.random() * 12,
            duration: 8 + Math.random() * 10,
            delay: Math.random() * 6,
            rotation: Math.random() * 360,
            drift: -40 + Math.random() * 80,
            color: colors[i % colors.length],
        }));
        setPetals(generated);
    }, [active, count, colors]);

    if (!active || petals.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {petals.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: -20,
                        width: p.size,
                        height: p.size * 0.6,
                        backgroundColor: p.color,
                        borderRadius: "50% 0 50% 0",
                        opacity: 0.8,
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3],
                        rotate: [p.rotation, p.rotation + 360],
                    }}
                    transition={{
                        y: {
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "linear",
                        },
                        x: {
                            duration: p.duration * 0.8,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut",
                        },
                        rotate: {
                            duration: p.duration * 0.6,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "linear",
                        },
                    }}
                />
            ))}
        </div>
    );
}
