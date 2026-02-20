"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";
import { RedEnvelopeSVG, HorseSVG, FireElementSVG } from "./TemplateIcons";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SpringFestival({
    greeting,
    subGreeting,
    senderName,
}: TemplateContentProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-4 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Decorative top flourish */}
            <motion.div
                className="text-card-secondary"
                variants={itemVariants}
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
                <RedEnvelopeSVG size={44} />
            </motion.div>

            {/* Main greeting (supports Chinese characters) */}
            <motion.h1
                className="text-5xl md:text-6xl font-chinese font-bold text-card-secondary drop-shadow-lg"
                variants={itemVariants}
            >
                {greeting || "Happy New Year"}
            </motion.h1>

            {/* Sub greeting */}
            {subGreeting && (
                <motion.p
                    className="text-base md:text-lg text-white/90 font-chinese-body max-w-[280px] leading-relaxed"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}

            {/* Year indicator */}
            <motion.div
                className="flex items-center gap-3 mt-2 text-card-secondary/80"
                variants={itemVariants}
            >
                <HorseSVG size={24} />
                <span className="text-white/80 font-chinese-body text-sm">2026</span>
                <FireElementSVG size={18} />
            </motion.div>

            {/* Sender */}
            {senderName && (
                <motion.p
                    className="text-sm text-white/60 mt-4 font-serif italic"
                    variants={itemVariants}
                >
                    — {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
