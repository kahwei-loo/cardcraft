"use client";

import {
    motion,
    useInView,
    useMotionValue,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sparkles, Palette, Share2, ArrowRight, Wand2 } from "lucide-react";
import FloatingIcons from "@/components/FloatingIcons";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { CardConfig, DEFAULT_CARD_CONFIG } from "@/types/card";

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

const SAMPLE_CARDS: { config: CardConfig; label: string }[] = [
    {
        label: "Chinese New Year",
        config: {
            ...DEFAULT_CARD_CONFIG,
            templateId: "spring-festival",
            themeId: "cny-red-gold",
            greeting: "新年快乐",
            subGreeting: "Wishing You Prosperity",
            senderName: "",
            effects: ["none"],
        },
    },
    {
        label: "Christmas",
        config: {
            ...DEFAULT_CARD_CONFIG,
            templateId: "winter-wonder",
            themeId: "xmas-classic",
            greeting: "Merry Christmas",
            subGreeting: "Joy, Peace & Love",
            senderName: "",
            effects: ["none"],
        },
    },
    {
        label: "Valentine's",
        config: {
            ...DEFAULT_CARD_CONFIG,
            templateId: "love-bloom",
            themeId: "valentine-rose",
            greeting: "With All My Love",
            subGreeting: "You Are My Everything",
            senderName: "",
            effects: ["none"],
        },
    },
    {
        label: "Birthday",
        config: {
            ...DEFAULT_CARD_CONFIG,
            templateId: "party-pop",
            themeId: "birthday-party",
            greeting: "Happy Birthday!",
            subGreeting: "Make a Wish",
            senderName: "",
            effects: ["none"],
        },
    },
];

export default function Home() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });
    const galleryInView = useInView(galleryRef, { once: true, margin: "-60px" });

    // Task 1.2: Scroll-driven parallax transforms
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

    const { scrollYProgress: featuresProgress } = useScroll({
        target: featuresRef,
        offset: ["start end", "end start"],
    });
    const featuresY = useTransform(featuresProgress, [0, 0.4], [40, 0]);
    const featuresOpacity = useTransform(featuresProgress, [0, 0.3], [0, 1]);

    const { scrollYProgress: galleryProgress } = useScroll({
        target: galleryRef,
        offset: ["start end", "end start"],
    });
    const galleryY = useTransform(galleryProgress, [0, 0.4], [50, 0]);
    const galleryScale = useTransform(galleryProgress, [0, 0.4], [0.95, 1]);

    // Task 1.4: Hero visual anchor — cycling card preview
    const [heroCardIndex, setHeroCardIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroCardIndex((i) => (i + 1) % SAMPLE_CARDS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Task 3.2A: Magnetic CTA button
    const ctaRef = useRef<HTMLDivElement>(null);
    const ctaX = useMotionValue(0);
    const ctaY = useMotionValue(0);
    const ctaTransformX = useTransform(ctaX, [-150, 150], [-6, 6]);
    const ctaTransformY = useTransform(ctaY, [-150, 150], [-4, 4]);

    const handleCtaMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = ctaRef.current?.getBoundingClientRect();
        if (!rect) return;
        ctaX.set(e.clientX - rect.left - rect.width / 2);
        ctaY.set(e.clientY - rect.top - rect.height / 2);
    }, [ctaX, ctaY]);

    const handleCtaMouseLeave = useCallback(() => {
        ctaX.set(0);
        ctaY.set(0);
    }, [ctaX, ctaY]);

    // Task 3.2B: Gallery card 3D tilt
    const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.02)`;
    }, []);

    const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "";
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
            <FloatingIcons />

            {/* Hero Section */}
            <motion.section
                className="z-10 w-full max-w-3xl text-center pt-20 pb-16 px-4 space-y-8 relative"
                variants={heroContainerVariants}
                initial="hidden"
                animate="visible"
                style={{ y: heroY, opacity: heroOpacity }}
            >
                {/* Hero background card */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={heroCardIndex}
                            className="w-56 sm:w-64 opacity-[0.12] blur-[2px] -rotate-6 translate-y-4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 0.12, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 1.2 }}
                        >
                            <TemplateRenderer
                                config={SAMPLE_CARDS[heroCardIndex].config}
                                showEffects={false}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

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
                    <motion.div
                        ref={ctaRef}
                        style={{ x: ctaTransformX, y: ctaTransformY }}
                        onMouseMove={handleCtaMouseMove}
                        onMouseLeave={handleCtaMouseLeave}
                        className="inline-block"
                    >
                        <Link
                            href="/create"
                            className="inline-flex items-center gap-2 bg-berry hover:bg-berry/90 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                            Create Your Card
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
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
                style={{ y: featuresY, opacity: featuresOpacity }}
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
                style={{ y: galleryY, scale: galleryScale }}
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
                            onMouseMove={handleCardMouseMove}
                            onMouseLeave={handleCardMouseLeave}
                            style={{ transition: "transform 0.2s ease-out" }}
                        >
                            <Link href="/create">
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                                    <div className="pointer-events-none">
                                        <TemplateRenderer config={card.config} showEffects={false} />
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 rounded-b-2xl">
                                        <span className="text-white/90 text-sm font-display font-semibold drop-shadow">
                                            {card.label}
                                        </span>
                                    </div>
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
