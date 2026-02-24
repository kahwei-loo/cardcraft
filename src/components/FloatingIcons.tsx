"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Snowflake, Star, Flower, Heart, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingElementData {
    id: number;
    Icon: LucideIcon;
    left: number;
    top: number;
    delay: number;
    duration: number;
    depth: number;
    rotation: number;
}

const icons: LucideIcon[] = [Snowflake, Star, Flower, Heart];

const GRID_COLS = 4;
const GRID_ROWS = 3;
const ELEMENT_COUNT = 9;
const JITTER_PERCENT = 8;

/**
 * Generate grid-based positions with random jitter.
 * Divides the viewport into a 4x3 grid (12 cells), picks ELEMENT_COUNT
 * cells at random, then adds +/-8% offset for an organic feel.
 */
function generateElements(): FloatingElementData[] {
    // Build all 12 cell indices and shuffle them
    const cellIndices = Array.from(
        { length: GRID_COLS * GRID_ROWS },
        (_, i) => i
    );
    for (let i = cellIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
    }

    // Pick the first ELEMENT_COUNT cells
    const chosen = cellIndices.slice(0, ELEMENT_COUNT);

    return chosen.map((cellIndex, i) => {
        const col = cellIndex % GRID_COLS;
        const row = Math.floor(cellIndex / GRID_COLS);

        // Center of each cell as a percentage
        const cellWidth = 100 / GRID_COLS;
        const cellHeight = 100 / GRID_ROWS;
        const baseCenterX = col * cellWidth + cellWidth / 2;
        const baseCenterY = row * cellHeight + cellHeight / 2;

        // Apply jitter: random offset within +/-JITTER_PERCENT
        const jitterX = (Math.random() * 2 - 1) * JITTER_PERCENT;
        const jitterY = (Math.random() * 2 - 1) * JITTER_PERCENT;

        const depth = 0.3 + Math.random() * 0.7; // 0.3 to 1.0

        return {
            id: i,
            Icon: icons[i % icons.length],
            left: Math.max(2, Math.min(98, baseCenterX + jitterX)),
            top: Math.max(2, Math.min(98, baseCenterY + jitterY)),
            delay: Math.random() * 4,
            duration: 10 + (1 - depth) * 10, // 10s (depth=1) to 20s (depth=0.3)
            depth,
            rotation: 12 * (Math.random() > 0.5 ? 1 : -1), // subtle +/-12 degrees
        };
    });
}

/**
 * Individual floating element with scroll-driven parallax.
 * Extracted as a child component so each element can call useTransform
 * with its own depth-based parallax factor.
 */
function FloatingElement({
    el,
    scrollY,
}: {
    el: FloatingElementData;
    scrollY: MotionValue<number>;
}) {
    const parallaxY = useTransform(
        scrollY,
        [0, 1000],
        [0, -el.depth * 120]
    );

    const size = Math.round(el.depth * 28);
    const maxOpacity = el.depth * 0.25;
    const isDistant = el.depth < 0.5;

    // Alternate x-drift direction based on index
    const xDriftDirection = el.id % 2 === 0 ? 1 : -1;

    return (
        <motion.div
            className="absolute text-sage-500"
            style={{
                left: `${el.left}%`,
                top: `${el.top}%`,
                y: parallaxY,
                filter: isDistant ? "blur(1px)" : undefined,
            }}
            animate={{
                y: [0, -18 * el.depth, 0],
                x: [0, 6 * xDriftDirection, 0],
                rotate: [0, el.rotation, 0],
                opacity: [maxOpacity * 0.6, maxOpacity, maxOpacity * 0.6],
            }}
            transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
                ease: "easeInOut",
            }}
        >
            <el.Icon size={size} strokeWidth={1.5} />
        </motion.div>
    );
}

export default function FloatingIcons() {
    const [elements, setElements] = useState<FloatingElementData[]>([]);
    const { scrollY } = useScroll();

    useEffect(() => {
        // Generate positions on client side only to avoid hydration mismatch
        setElements(generateElements());
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((el) => (
                <FloatingElement key={el.id} el={el} scrollY={scrollY} />
            ))}
        </div>
    );
}
