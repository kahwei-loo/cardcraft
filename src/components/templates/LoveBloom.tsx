"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";
import { HeartSVG, SmallHeartSVG } from "./TemplateIcons";

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

export default function LoveBloom({
    greeting,
    subGreeting,
    senderName,
    recipientName,
}: TemplateContentProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-4 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Animated heart cluster */}
            <motion.div
                className="relative text-card-secondary"
                variants={itemVariants}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <HeartSVG size={48} />
                <motion.div
                    className="absolute -top-1 -left-4 text-card-secondary/60"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                    <SmallHeartSVG size={14} />
                </motion.div>
                <motion.div
                    className="absolute -top-2 -right-3 text-card-secondary/50"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                    <SmallHeartSVG size={10} />
                </motion.div>
            </motion.div>

            {/* Recipient name */}
            {recipientName && (
                <motion.p className="text-base text-white/80 font-serif" variants={itemVariants}>
                    Dear {recipientName},
                </motion.p>
            )}

            {/* Main greeting */}
            <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-lg"
                variants={itemVariants}
            >
                {greeting || "Happy Valentine's Day"}
            </motion.h1>

            {/* Sub greeting */}
            {subGreeting && (
                <motion.p
                    className="text-base text-white/85 font-serif max-w-[240px] leading-relaxed italic"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}

            {/* Sender */}
            {senderName && (
                <motion.p className="text-sm text-white/60 mt-4 font-serif" variants={itemVariants}>
                    Forever yours, {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
