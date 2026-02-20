"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Snowflake {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    drift: number;
}

interface SnowEffectProps {
    active?: boolean;
    count?: number;
    color?: string;
    colors?: string[];
}

export default function SnowEffect({
    active = true,
    count = 40,
    color = "#FFFFFF",
    colors,
}: SnowEffectProps) {
    const flakeColor = colors?.[1] ?? color;
    const [flakes, setFlakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        if (!active) return;

        const generated: Snowflake[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 3 + Math.random() * 6,
            duration: 6 + Math.random() * 8,
            delay: Math.random() * 5,
            opacity: 0.3 + Math.random() * 0.7,
            drift: -20 + Math.random() * 40,
        }));
        setFlakes(generated);
    }, [active, count]);

    if (!active || flakes.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {flakes.map((f) => (
                <motion.div
                    key={f.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${f.x}%`,
                        top: -10,
                        width: f.size,
                        height: f.size,
                        backgroundColor: flakeColor,
                        opacity: f.opacity,
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        x: [0, f.drift, 0],
                    }}
                    transition={{
                        y: {
                            duration: f.duration,
                            repeat: Infinity,
                            delay: f.delay,
                            ease: "linear",
                        },
                        x: {
                            duration: f.duration * 0.5,
                            repeat: Infinity,
                            delay: f.delay,
                            ease: "easeInOut",
                            repeatType: "reverse",
                        },
                    }}
                />
            ))}
        </div>
    );
}
