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

const frameVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function GoldenHarvest({
    greeting,
    subGreeting,
    senderName,
}: TemplateContentProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Decorative golden inner frame */}
            <motion.div
                className="relative border-2 border-card-secondary/40 rounded-xl px-6 py-5 w-full max-w-[280px]"
                variants={frameVariants}
            >
                {/* Corner decorations on the frame */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-card-secondary/60 rounded-tl" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-card-secondary/60 rounded-tr" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-card-secondary/60 rounded-bl" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-card-secondary/60 rounded-br" />

                {/* Leaf accents inside frame */}
                <motion.div className="flex gap-3 items-center justify-center mb-3" variants={itemVariants}>
                    <motion.div
                        className="text-card-secondary/80"
                        animate={{ rotate: [-8, 8, -8] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <MapleLeafSVG size={20} />
                    </motion.div>
                    <div className="text-card-secondary">
                        <WheatSVG size={24} />
                    </div>
                    <motion.div
                        className="text-card-primary/80"
                        animate={{ rotate: [8, -8, 8] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <MapleLeafSVG size={18} />
                    </motion.div>
                </motion.div>

                {/* Main greeting */}
                <motion.h1
                    className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg text-center"
                    variants={itemVariants}
                >
                    {greeting || "Happy Thanksgiving"}
                </motion.h1>

                {/* Sub greeting */}
                {subGreeting && (
                    <motion.p
                        className="text-sm text-white/85 font-serif max-w-[240px] mx-auto leading-relaxed italic text-center mt-2"
                        variants={itemVariants}
                    >
                        {subGreeting}
                    </motion.p>
                )}

                {/* Inner frame bottom border */}
                <motion.div
                    className="w-20 h-px bg-card-secondary/40 mx-auto mt-3"
                    variants={{
                        hidden: { scaleX: 0, opacity: 0 },
                        visible: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
                    }}
                />

                {/* Sender */}
                {senderName && (
                    <motion.p className="text-xs text-white/60 mt-2 font-serif text-center" variants={itemVariants}>
                        — {senderName}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
}
