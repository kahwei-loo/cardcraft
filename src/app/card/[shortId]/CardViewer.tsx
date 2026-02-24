"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Share2, RotateCcw, Wand2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { CardConfig } from "@/types/card";
import { getThemeById } from "@/lib/themes";
import { getStyleById } from "@/data/ai-styles";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { PostcardBack } from "@/components/templates/PostcardTemplate";
import SharePanel from "@/components/share/SharePanel";
import { Button } from "@/components/ui/button";

interface CardViewerProps {
    config: CardConfig;
    shortId: string;
}

// ── Envelope animation variants ──

const envelopeVariants = {
    sealed: {
        rotateX: 0,
        scaleY: 0.6,
        scaleX: 0.85,
        y: 0,
        opacity: 1,
        borderRadius: "16px",
    },
    opening: {
        rotateX: 0,
        scaleY: 0.7,
        scaleX: 0.9,
        y: -10,
        opacity: 1,
        borderRadius: "16px",
        transition: { duration: 0.4, ease: "easeOut" },
    },
    revealed: {
        rotateX: 0,
        scaleY: 1,
        scaleX: 1,
        y: 0,
        opacity: 1,
        borderRadius: "16px",
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
};

const flapVariants = {
    closed: { rotateX: 0, originY: 0, opacity: 1 },
    opening: {
        rotateX: 180,
        originY: 0,
        opacity: 0,
        transition: { duration: 0.5, ease: "easeIn" },
    },
};

const sealVariants = {
    visible: { scale: 1, opacity: 1 },
    hidden: { scale: 1.5, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// ── Typing animation hook ──

function useTypingAnimation(text: string, enabled: boolean, speed = 50) {
    const [displayText, setDisplayText] = useState("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!enabled) {
            setDisplayText("");
            setIsDone(false);
            return;
        }

        setDisplayText("");
        setIsDone(false);
        let i = 0;

        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                setIsDone(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, enabled, speed]);

    return { displayText, isDone };
}

// ── Confetti burst ──

function fireConfetti(themeColors?: string[]) {
    const colors = themeColors ?? ["#C2185B", "#D4AF37", "#2E7D32"];
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors,
    });
}

export default function CardViewer({ config, shortId }: CardViewerProps) {
    const captureRef = useRef<HTMLDivElement>(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [stage, setStage] = useState<"sealed" | "opening" | "revealed">("sealed");
    const [showPostcardBack, setShowPostcardBack] = useState(false);

    const theme = getThemeById(config.themeId);
    const aiStyle = config.aiStyleId ? getStyleById(config.aiStyleId) : null;
    const isPostcard = config.outputFormat === "postcard";

    const cardUrl =
        typeof window !== "undefined" ? `${window.location.origin}/card/${shortId}` : "";

    // Typing animation for greeting text (starts after reveal)
    const { displayText: typedGreeting, isDone: greetingDone } = useTypingAnimation(
        config.greeting || "Happy Holidays!",
        stage === "revealed"
    );

    const handleOpen = () => {
        if (stage === "sealed") {
            setStage("opening");
            setTimeout(() => setStage("revealed"), 500);
        }
    };

    const handleEnvelopeKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && stage === "sealed") {
            e.preventDefault();
            handleOpen();
        }
    };

    // Fire confetti on reveal
    useEffect(() => {
        if (stage === "revealed") {
            const themeColors = theme
                ? [theme.colors.primary, theme.colors.secondary, theme.colors.accent]
                : undefined;
            // Small delay to sync with card animation
            const timer = setTimeout(() => fireConfetti(themeColors), 300);
            return () => clearTimeout(timer);
        }
    }, [stage, theme]);

    // Replay handler
    const handleReplay = useCallback(() => {
        setStage("sealed");
        setShowPostcardBack(false);
    }, []);

    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center">
            {/* Header */}
            <header className="w-full py-4 px-4 flex items-center justify-between max-w-2xl mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-1 text-sm text-ink/50 hover:text-ink transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Home</span>
                </Link>
                <div className="flex items-center gap-2">
                    {/* AI Style badge */}
                    {aiStyle && (
                        <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            <Wand2 size={12} />
                            {aiStyle.name}
                        </span>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-ink/20 text-ink/70 hover:text-ink"
                        onClick={() => setShareOpen(true)}
                    >
                        <Share2 size={14} className="mr-1" />
                        Share
                    </Button>
                </div>
            </header>

            {/* Card Display */}
            <section className="flex-1 flex items-center justify-center p-4 w-full">
                <div className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md" style={{ perspective: "1200px" }}>
                    {/* Postcard flip support */}
                    {isPostcard && stage === "revealed" && showPostcardBack ? (
                        <motion.div
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            transition={{ duration: 0.4 }}
                            className="cursor-pointer"
                            onClick={() => setShowPostcardBack(false)}
                        >
                            <div className="w-full aspect-[16/9]">
                                <PostcardBack
                                    greeting={config.greeting}
                                    subGreeting={config.subGreeting}
                                    senderName={config.senderName}
                                    recipientName={config.recipientName}
                                    seed={config.seed}
                                />
                            </div>
                            <p className="text-center text-xs text-ink/60 mt-2">
                                Tap to flip to front
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Envelope wrapper */}
                            <motion.div
                                className="relative w-full cursor-pointer"
                                variants={envelopeVariants}
                                initial="sealed"
                                animate={stage}
                                onClick={stage === "sealed" ? handleOpen : isPostcard ? () => setShowPostcardBack(true) : undefined}
                                onKeyDown={stage === "sealed" ? handleEnvelopeKeyDown : undefined}
                                tabIndex={stage === "sealed" ? 0 : undefined}
                                role={stage === "sealed" ? "button" : undefined}
                                aria-label={stage === "sealed" ? "Open envelope to reveal your card" : undefined}
                            >
                                {/* Envelope flap */}
                                <AnimatePresence>
                                    {stage === "sealed" && (
                                        <motion.div
                                            className="absolute inset-x-0 top-0 z-30 pointer-events-none"
                                            variants={flapVariants}
                                            initial="closed"
                                            exit="opening"
                                            style={{
                                                transformOrigin: "top center",
                                                perspective: "800px",
                                            }}
                                        >
                                            <svg
                                                viewBox="0 0 400 120"
                                                className="w-full"
                                                preserveAspectRatio="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M0 0 L200 120 L400 0 Z"
                                                    fill="currentColor"
                                                    className="text-parchment-dark"
                                                />
                                                <path
                                                    d="M0 0 L200 120 L400 0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    className="text-ink/10"
                                                />
                                            </svg>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Wax seal */}
                                <AnimatePresence>
                                    {stage === "sealed" && (
                                        <motion.div
                                            className="absolute top-12 left-1/2 -translate-x-1/2 z-40"
                                            variants={sealVariants}
                                            initial="visible"
                                            exit="hidden"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-berry shadow-lg flex items-center justify-center border-2 border-berry-light/30">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="w-6 h-6 text-white/90"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M12 4l1.5 4.5L18 12l-4.5 3.5L12 20l-1.5-4.5L6 12l4.5-3.5Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Tap hint */}
                                <AnimatePresence>
                                    {stage === "sealed" && (
                                        <motion.p
                                            className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-40 text-sm text-ink/60 whitespace-nowrap"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: [0.4, 0.8, 0.4], y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            Tap to open
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {/* The actual card */}
                                <div ref={captureRef}>
                                    <TemplateRenderer
                                        config={config}
                                        showEffects={stage === "revealed"}
                                    />
                                </div>
                            </motion.div>

                            {/* Postcard flip hint */}
                            {isPostcard && stage === "revealed" && (
                                <motion.p
                                    className="text-center text-xs text-ink/60 mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Tap card to flip to back
                                </motion.p>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Typing animation overlay (greeting) */}
            <AnimatePresence>
                {stage === "revealed" && (
                    <motion.div
                        className="w-full max-w-md mx-auto px-4 text-center -mt-2 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {/* Sub-greeting fade in after typing completes */}
                        {greetingDone && config.subGreeting && (
                            <motion.p
                                className="text-sm text-ink/50 font-serif italic mt-1"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {config.subGreeting}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer: Replay + CTA */}
            <AnimatePresence>
                {stage === "revealed" && (
                    <motion.footer
                        className="w-full py-6 flex flex-col items-center gap-3"
                        initial="hidden"
                        animate="visible"
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
                    >
                        <motion.button
                            onClick={handleReplay}
                            className="flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink/60 transition-colors"
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <RotateCcw size={14} />
                            Replay
                        </motion.button>
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <Link
                                href="/create"
                                className="inline-flex items-center gap-2 text-sm text-berry hover:text-berry/80 font-medium transition-colors"
                            >
                                Create your own card
                                <span>→</span>
                            </Link>
                        </motion.div>
                    </motion.footer>
                )}
            </AnimatePresence>

            {/* Share Panel */}
            <SharePanel
                cardUrl={cardUrl}
                cardTitle={config.greeting || "Festive Card"}
                cardDescription={
                    config.subGreeting || "A beautiful greeting card made for you"
                }
                cardElementRef={captureRef}
                open={shareOpen}
                onClose={() => setShareOpen(false)}
            />
        </main>
    );
}
