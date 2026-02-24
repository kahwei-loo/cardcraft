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
            className="flex items-center justify-between w-full h-full gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left: Heart cluster */}
            <motion.div
                className="flex flex-col items-center gap-3 text-card-secondary shrink-0"
                variants={itemVariants}
            >
                <motion.div
                    className="relative"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <HeartSVG size={44} />
                    <motion.div
                        className="absolute -top-2 -left-4 text-card-secondary/60"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    >
                        <SmallHeartSVG size={14} />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="text-card-secondary/40"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                    <SmallHeartSVG size={10} />
                </motion.div>
                <motion.div
                    className="text-card-secondary/25"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                >
                    <SmallHeartSVG size={8} />
                </motion.div>
            </motion.div>

            {/* Right: Text content, right-aligned */}
            <div className="flex flex-col items-end text-right gap-3 flex-1 min-w-0">
                {recipientName && (
                    <motion.p className="text-sm text-white/80 font-serif" variants={itemVariants}>
                        Dear {recipientName},
                    </motion.p>
                )}

                <motion.h1
                    className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg leading-tight"
                    variants={itemVariants}
                >
                    {greeting || "Happy Valentine's Day"}
                </motion.h1>

                {subGreeting && (
                    <motion.p
                        className="text-sm text-white/85 font-serif max-w-[200px] leading-relaxed italic"
                        variants={itemVariants}
                    >
                        {subGreeting}
                    </motion.p>
                )}

                {senderName && (
                    <motion.p className="text-xs text-white/60 mt-2 font-serif" variants={itemVariants}>
                        Forever yours, {senderName}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}
