"use client";

import { motion } from "framer-motion";
import { Snowflake, Star, Flower, Heart, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingElement {
    id: number;
    Icon: LucideIcon;
    left: number;
    top: number;
    delay: number;
    duration: number;
    scale: number;
    rotation: number;
}

const icons: LucideIcon[] = [Snowflake, Star, Flower, Heart];

export default function FloatingIcons() {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        // Generate random positions on client side only to avoid hydration mismatch
        const newElements = [...Array(15)].map((_, i) => ({
            id: i,
            Icon: icons[i % icons.length],
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10,
            scale: 0.5 + Math.random() * 0.5,
            rotation: Math.random() * 360,
        }));
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute text-sage-500/20"
                    style={{
                        left: `${el.left}%`,
                        top: `${el.top}%`,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        rotate: [0, el.rotation, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "easeInOut",
                    }}
                >
                    <el.Icon size={32 * el.scale} />
                </motion.div>
            ))}
        </div>
    );
}
