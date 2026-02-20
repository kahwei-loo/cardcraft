"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";
import { ConfettiStarSVG, CakeSVG, BalloonSVG } from "./TemplateIcons";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PartyPop({
    greeting,
    subGreeting,
    senderName,
    recipientName,
}: TemplateContentProps) {
    const letterVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.4 + i * 0.05, duration: 0.3 },
        }),
    };

    const displayGreeting = greeting || "Happy Birthday!";

    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-5 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Party icon row */}
            <motion.div
                className="flex gap-4 items-end"
                variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
                }}
            >
                <motion.div
                    className="text-card-accent"
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ConfettiStarSVG size={24} />
                </motion.div>
                <div className="text-card-secondary">
                    <CakeSVG size={32} />
                </div>
                <motion.div
                    className="text-card-primary"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                    <BalloonSVG size={28} />
                </motion.div>
            </motion.div>

            {/* Recipient */}
            {recipientName && (
                <motion.p className="text-base text-white/80 font-display" variants={itemVariants}>
                    {recipientName}
                </motion.p>
            )}

            {/* Animated letter-by-letter greeting */}
            <div className="flex flex-wrap justify-center">
                {displayGreeting.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-lg"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={letterVariants}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>

            {/* Sub greeting */}
            {subGreeting && (
                <motion.p
                    className="text-base text-white/85 font-serif max-w-[260px] leading-relaxed"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}

            {/* Sender */}
            {senderName && (
                <motion.p className="text-sm text-white/60 mt-3 font-serif" variants={itemVariants}>
                    — {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
