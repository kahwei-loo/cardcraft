"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";
import { LanternSVG } from "./TemplateIcons";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function LanternGlow({
    greeting,
    subGreeting,
    senderName,
}: TemplateContentProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-5 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Top lantern row */}
            <motion.div
                className="flex gap-5 items-start"
                variants={{
                    hidden: { y: -30, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 1, type: "spring" } },
                }}
            >
                <motion.div
                    className="text-card-primary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <LanternSVG size={26} />
                </motion.div>
                <motion.div
                    className="text-card-secondary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <LanternSVG size={30} />
                </motion.div>
                <motion.div
                    className="text-card-primary"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <LanternSVG size={26} />
                </motion.div>
            </motion.div>

            {/* Main greeting */}
            <motion.h1
                className="text-5xl md:text-6xl font-chinese font-bold text-card-secondary drop-shadow-lg"
                variants={itemVariants}
            >
                {greeting || "Happy New Year"}
            </motion.h1>

            {/* Decorative divider */}
            <motion.div className="flex items-center gap-3" variants={itemVariants}>
                <div className="w-12 h-px bg-card-secondary/40" />
                <svg width="12" height="12" viewBox="0 0 12 12" className="text-card-secondary/60">
                    <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" fill="currentColor" />
                </svg>
                <div className="w-12 h-px bg-card-secondary/40" />
            </motion.div>

            {/* Sub greeting */}
            {subGreeting && (
                <motion.p
                    className="text-base text-white/85 font-chinese-body max-w-[260px] leading-relaxed"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}

            {/* Year of the Horse */}
            <motion.div
                className="flex items-center gap-2 text-white/70 text-sm"
                variants={itemVariants}
            >
                <span>Year of the Fire Horse</span>
                <span>•</span>
                <span>2026</span>
            </motion.div>

            {/* Sender */}
            {senderName && (
                <motion.p
                    className="text-sm text-white/60 mt-2 font-serif italic"
                    variants={itemVariants}
                >
                    — {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
