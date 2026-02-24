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
            className="flex flex-col justify-between w-full h-full gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Upper area: floating snowflakes */}
            <div className="flex-1 flex items-start justify-center pt-4">
                <motion.div className="flex gap-6 items-start" variants={itemVariants}>
                    <motion.div
                        animate={{ rotate: 360, y: [0, 8, 0] }}
                        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                    >
                        <SnowflakeSVG size={32} />
                    </motion.div>
                    <motion.div
                        className="mt-6"
                        animate={{ rotate: -360, y: [0, -6, 0] }}
                        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
                    >
                        <StarBurstSVG size={22} className="text-white/70" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: 360, y: [0, 10, 0] }}
                        transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                    >
                        <SnowflakeSVG size={26} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom third: frosted glass greeting */}
            <motion.div
                className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 text-center"
                variants={itemVariants}
            >
                <motion.h1
                    className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg"
                    variants={itemVariants}
                >
                    {greeting || "Merry Christmas"}
                </motion.h1>

                {subGreeting && (
                    <motion.p
                        className="text-sm md:text-base text-white/85 font-serif max-w-[260px] mx-auto leading-relaxed italic mt-2"
                        variants={itemVariants}
                    >
                        {subGreeting}
                    </motion.p>
                )}

                {senderName && (
                    <motion.p
                        className="text-xs text-white/60 mt-2 font-serif"
                        variants={itemVariants}
                    >
                        With love, {senderName}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
}
