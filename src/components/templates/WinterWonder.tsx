"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";
import { SnowflakeSVG, StarBurstSVG } from "./TemplateIcons";

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

export default function WinterWonder({
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
            {/* Decorative snowflakes cluster */}
            <motion.div className="flex gap-4 items-center text-white/90" variants={itemVariants}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <SnowflakeSVG size={28} />
                </motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <StarBurstSVG size={20} className="text-white/70" />
                </motion.div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <SnowflakeSVG size={24} />
                </motion.div>
            </motion.div>

            {/* Main greeting */}
            <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-lg"
                variants={itemVariants}
            >
                {greeting || "Merry Christmas"}
            </motion.h1>

            {/* Divider */}
            <motion.div
                className="w-24 h-px bg-white/40"
                variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8 } },
                }}
            />

            {/* Sub greeting */}
            {subGreeting && (
                <motion.p
                    className="text-base md:text-lg text-white/85 font-serif max-w-[260px] leading-relaxed italic"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}

            {/* Sender */}
            {senderName && (
                <motion.p
                    className="text-sm text-white/60 mt-3 font-serif"
                    variants={itemVariants}
                >
                    With love, {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
