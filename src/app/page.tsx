"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Wand2, Palette, ArrowRight } from "lucide-react";
import FloatingIcons from "@/components/FloatingIcons";

const heroContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const heroItemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 relative">
            <FloatingIcons />

            {/* Hero Section */}
            <motion.div
                className="z-10 w-full max-w-3xl text-center mb-12 space-y-6"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-display font-bold text-ink tracking-tight"
                    variants={heroItemVariants}
                >
                    Festive E-Card Studio
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-ink-light/80 font-serif max-w-lg mx-auto"
                    variants={heroItemVariants}
                >
                    Create magical animated greeting cards for every celebration.
                    Choose from beautiful templates or transform your photos with AI.
                </motion.p>
            </motion.div>

            {/* Mode Selection Cards */}
            <motion.div
                ref={cardsRef}
                className="z-10 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 px-4"
                variants={cardContainerVariants}
                initial="hidden"
                animate={cardsInView ? "visible" : "hidden"}
            >
                {/* Web Mode Card */}
                <motion.a href="/create" className="block group" variants={cardItemVariants}>
                    <motion.div
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-ink/5 shadow-sm hover:shadow-xl transition-all h-full"
                        whileHover={{ y: -4 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-berry/10 flex items-center justify-center">
                                <Palette className="w-6 h-6 text-berry" />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold text-ink">
                                    Web Mode
                                </h2>
                                <span className="text-xs text-berry font-semibold uppercase tracking-wider">
                                    Free
                                </span>
                            </div>
                        </div>
                        <p className="text-ink-light text-sm leading-relaxed mb-6">
                            Pick from beautifully designed templates with animated effects.
                            Customize text, themes, and share instantly.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {["CNY", "Christmas", "Valentine's", "Birthday"].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-parchment-dark/50 text-ink/60 px-2.5 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center text-berry font-medium text-sm group-hover:gap-2 transition-all">
                            <span>Start Creating</span>
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>
                </motion.a>

                {/* AI Mode Card */}
                <motion.a href="/ai" className="block group" variants={cardItemVariants}>
                    <motion.div
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-ink/5 shadow-sm hover:shadow-xl transition-all h-full"
                        whileHover={{ y: -4 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Wand2 className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold text-ink">
                                    AI Mode
                                </h2>
                                <span className="text-xs text-purple-600 font-semibold uppercase tracking-wider">
                                    Credits
                                </span>
                            </div>
                        </div>
                        <p className="text-ink-light text-sm leading-relaxed mb-6">
                            Upload your photo and let AI transform it into a
                            hand-painted holiday masterpiece. Powered by SDXL.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {["Photo Upload", "AI Transform", "SDXL"].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-parchment-dark/50 text-ink/60 px-2.5 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center text-purple-600 font-medium text-sm group-hover:gap-2 transition-all">
                            <span>Try AI Transform</span>
                            <Sparkles className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>
                </motion.a>
            </motion.div>

            <footer className="absolute bottom-4 text-center text-ink/40 text-sm w-full z-10">
                Create & share beautiful greeting cards
            </footer>
        </main>
    );
}
