"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";
import { MapleLeafSVG, WheatSVG } from "./TemplateIcons";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

export default function GoldenHarvest({
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
            {/* Decorative border frame (top) */}
            <motion.div
                className="w-48 h-1 rounded-full bg-gradient-to-r from-transparent via-card-secondary/60 to-transparent"
                variants={lineVariants}
            />

            {/* Leaf accents */}
            <motion.div className="flex gap-3 items-center" variants={itemVariants}>
                <motion.div
                    className="text-card-secondary/80"
                    animate={{ rotate: [-8, 8, -8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <MapleLeafSVG size={24} />
                </motion.div>
                <div className="text-card-secondary">
                    <WheatSVG size={28} />
                </div>
                <motion.div
                    className="text-card-primary/80"
                    animate={{ rotate: [8, -8, 8] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <MapleLeafSVG size={22} />
                </motion.div>
            </motion.div>

            {/* Main greeting */}
            <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-lg"
                variants={itemVariants}
            >
                {greeting || "Happy Thanksgiving"}
            </motion.h1>

            {/* Sub greeting */}
            {subGreeting && (
                <motion.p
                    className="text-base text-white/85 font-serif max-w-[260px] leading-relaxed italic"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}

            {/* Bottom frame */}
            <motion.div
                className="w-48 h-1 rounded-full bg-gradient-to-r from-transparent via-card-secondary/60 to-transparent"
                variants={lineVariants}
            />

            {/* Sender */}
            {senderName && (
                <motion.p className="text-sm text-white/60 mt-2 font-serif" variants={itemVariants}>
                    — {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
