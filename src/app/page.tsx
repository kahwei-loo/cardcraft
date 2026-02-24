"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Sparkles, Palette, Share2, ArrowRight, Wand2 } from "lucide-react";
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

const FEATURES = [
    {
        icon: Palette,
        title: "Beautiful Templates",
        description:
            "Choose from hand-crafted templates for CNY, Christmas, Valentine's, birthdays, and more. Greeting card or postcard — you decide.",
        color: "berry",
        bgColor: "bg-berry/10",
        textColor: "text-berry",
    },
    {
        icon: Wand2,
        title: "AI Style Transfer",
        description:
            "Upload your photo and transform it into watercolor, oil painting, manga, anime, sketch, or pop art with AI magic.",
        color: "purple-600",
        bgColor: "bg-purple-500/10",
        textColor: "text-purple-600",
    },
    {
        icon: Share2,
        title: "Share & Celebrate",
        description:
            "Send your card via link, QR code, WhatsApp, X, or Facebook. Recipients get a delightful envelope-opening animation.",
        color: "sage",
        bgColor: "bg-sage/10",
        textColor: "text-sage-700",
    },
];

const SAMPLE_CARDS = [
    {
        gradient: "from-red-700 to-amber-600",
        emoji: "🧧",
        label: "Chinese New Year",
    },
    {
        gradient: "from-emerald-700 to-red-800",
        emoji: "🎄",
        label: "Christmas",
    },
    {
        gradient: "from-pink-500 to-rose-600",
        emoji: "💕",
        label: "Valentine's",
    },
    {
        gradient: "from-amber-500 to-orange-600",
        emoji: "🎂",
        label: "Birthday",
    },
];

export default function Home() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });
    const galleryInView = useInView(galleryRef, { once: true, margin: "-60px" });

    return (
        <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
            <FloatingIcons />

            {/* Hero Section */}
            <motion.section
                className="z-10 w-full max-w-3xl text-center pt-20 pb-16 px-4 space-y-8"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={heroItemVariants}>
                    <span className="inline-flex items-center gap-1.5 text-sm text-berry font-medium bg-berry/10 px-3 py-1 rounded-full mb-4">
                        <Sparkles size={14} />
                        Free to use
                    </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-display font-bold text-ink tracking-tight leading-[1.1]"
                    variants={heroItemVariants}
                >
                    Create Magical
                    <br />
                    <span className="text-berry">Greeting Cards</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-ink-light/80 font-serif max-w-lg mx-auto"
                    variants={heroItemVariants}
                >
                    Design stunning animated cards with beautiful templates or
                    AI-powered photo transformation. Share the celebration instantly.
                </motion.p>

                <motion.div variants={heroItemVariants} className="space-y-3">
                    <Link
                        href="/create"
                        className="inline-flex items-center gap-2 bg-berry hover:bg-berry/90 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        Create Your Card
                        <ArrowRight size={20} />
                    </Link>
                    <p className="text-sm text-ink/60">
                        or{" "}
                        <Link
                            href="/card/demo"
                            className="text-berry/70 hover:text-berry underline underline-offset-2 transition-colors"
                        >
                            view a demo card
                        </Link>
                    </p>
                </motion.div>
            </motion.section>

            {/* Feature Cards */}
            <motion.section
                ref={featuresRef}
                className="z-10 w-full max-w-4xl px-4 pb-16"
                variants={cardContainerVariants}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {FEATURES.map((feature) => (
                        <motion.div
                            key={feature.title}
                            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-ink/5 shadow-sm hover:shadow-lg transition-all"
                            variants={cardItemVariants}
                            whileHover={{ y: -4 }}
                        >
                            <div
                                className={`w-11 h-11 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}
                            >
                                <feature.icon className={`w-5 h-5 ${feature.textColor}`} />
                            </div>
                            <h3 className="text-lg font-display font-bold text-ink mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-ink-light/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Sample Card Gallery */}
            <motion.section
                ref={galleryRef}
                className="z-10 w-full max-w-4xl px-4 pb-20"
                variants={cardContainerVariants}
                initial="hidden"
                animate={galleryInView ? "visible" : "hidden"}
            >
                <motion.h2
                    className="text-center text-sm font-semibold text-ink/50 uppercase tracking-wider mb-6"
                    variants={cardItemVariants}
                >
                    For Every Celebration
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {SAMPLE_CARDS.map((card) => (
                        <motion.div
                            key={card.label}
                            className="group block"
                            variants={cardItemVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                        >
                            <Link href="/create">
                                <div
                                    className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${card.gradient} flex flex-col items-center justify-center shadow-md group-hover:shadow-xl transition-shadow`}
                                >
                                    <span className="text-4xl mb-2">{card.emoji}</span>
                                    <span className="text-white/90 text-sm font-display font-semibold drop-shadow">
                                        {card.label}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="w-full py-6 text-center text-ink/60 text-sm z-10 border-t border-ink/5">
                <p>
                    Festive E-Card Studio — Create & share beautiful greeting cards
                </p>
            </footer>
        </main>
    );
}
