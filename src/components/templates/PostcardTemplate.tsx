"use client";

import { motion } from "framer-motion";
import { TemplateContentProps } from "./TemplateRenderer";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PostcardFront({ greeting, subGreeting, senderName }: TemplateContentProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-3 w-full h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg leading-tight"
                variants={itemVariants}
            >
                {greeting || "Greetings!"}
            </motion.h1>
            {subGreeting && (
                <motion.p
                    className="text-base md:text-lg text-white/90 font-serif max-w-sm"
                    variants={itemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}
            {senderName && (
                <motion.p className="text-sm text-white/70 mt-2" variants={itemVariants}>
                    — {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}

export function PostcardBack({
    greeting,
    subGreeting,
    senderName,
    recipientName,
}: TemplateContentProps) {
    return (
        <div className="w-full h-full flex bg-[#FFF8F0] rounded-2xl overflow-hidden">
            {/* Left side: Message area */}
            <div className="flex-1 p-5 flex flex-col justify-between border-r border-dashed border-ink/15">
                <div className="space-y-2">
                    {recipientName && (
                        <p className="text-sm text-ink/70 font-serif">
                            Dear {recipientName},
                        </p>
                    )}
                    <p className="text-sm text-ink/80 font-serif leading-relaxed">
                        {subGreeting || greeting || "Wishing you all the best!"}
                    </p>
                </div>
                {senderName && (
                    <p className="text-sm text-ink/60 font-serif italic mt-auto pt-4">
                        With love, {senderName}
                    </p>
                )}
            </div>

            {/* Right side: Address & stamp area */}
            <div className="w-[45%] p-5 flex flex-col">
                {/* Stamp placeholder */}
                <div className="self-end mb-4">
                    <div className="w-14 h-16 border-2 border-dashed border-ink/20 rounded flex items-center justify-center">
                        <span className="text-2xl opacity-40">📮</span>
                    </div>
                </div>

                {/* Address lines */}
                <div className="flex-1 flex flex-col justify-center gap-3 pl-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="border-b border-ink/15 pb-1"
                        >
                            {i === 1 && recipientName && (
                                <span className="text-sm text-ink/50 font-serif">
                                    {recipientName}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Postmark effect */}
                <div className="self-end mt-2 opacity-20">
                    <div className="w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center rotate-[-15deg]">
                        <span className="text-[8px] font-bold text-ink uppercase leading-tight text-center">
                            E-Card
                            <br />
                            Studio
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
