"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { useState, useRef } from "react";
import { CardConfig } from "@/types/card";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import SharePanel from "@/components/share/SharePanel";
import { Button } from "@/components/ui/button";

interface CardViewerProps {
    config: CardConfig;
    shortId: string;
}

// Envelope opening animation stages
const envelopeVariants = {
    // Stage 1: Sealed envelope
    sealed: {
        rotateX: 0,
        scaleY: 0.6,
        scaleX: 0.85,
        y: 0,
        opacity: 1,
        borderRadius: "16px",
    },
    // Stage 2: Flap opening
    opening: {
        rotateX: 0,
        scaleY: 0.7,
        scaleX: 0.9,
        y: -10,
        opacity: 1,
        borderRadius: "16px",
        transition: { duration: 0.4, ease: "easeOut" },
    },
    // Stage 3: Card rising out
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
    closed: {
        rotateX: 0,
        originY: 0,
        opacity: 1,
    },
    opening: {
        rotateX: 180,
        originY: 0,
        opacity: 0,
        transition: { duration: 0.5, ease: "easeIn" },
    },
};

const sealVariants = {
    visible: { scale: 1, opacity: 1 },
    hidden: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

export default function CardViewer({ config, shortId }: CardViewerProps) {
    const captureRef = useRef<HTMLDivElement>(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [stage, setStage] = useState<"sealed" | "opening" | "revealed">("sealed");

    const cardUrl = typeof window !== "undefined"
        ? `${window.location.origin}/card/${shortId}`
        : "";

    const handleOpen = () => {
        if (stage === "sealed") {
            setStage("opening");
            setTimeout(() => setStage("revealed"), 500);
        }
    };

    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center">
            {/* Header */}
            <header className="w-full py-4 px-4 flex items-center justify-between max-w-2xl mx-auto">
                <a
                    href="/"
                    className="flex items-center gap-1 text-sm text-ink/50 hover:text-ink transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Home</span>
                </a>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-ink/20 text-ink/70 hover:text-ink"
                    onClick={() => setShareOpen(true)}
                >
                    <Share2 size={14} className="mr-1" />
                    Share
                </Button>
            </header>

            {/* Card Display */}
            <section className="flex-1 flex items-center justify-center p-4 w-full">
                <div className="w-full max-w-md" style={{ perspective: "1200px" }}>
                    {/* Envelope wrapper */}
                    <motion.div
                        className="relative w-full cursor-pointer"
                        variants={envelopeVariants}
                        initial="sealed"
                        animate={stage}
                        onClick={handleOpen}
                    >
                        {/* Envelope flap (triangular overlay) */}
                        <AnimatePresence>
                            {stage === "sealed" && (
                                <motion.div
                                    className="absolute inset-x-0 top-0 z-30 pointer-events-none"
                                    variants={flapVariants}
                                    initial="closed"
                                    exit="opening"
                                    style={{ transformOrigin: "top center", perspective: "800px" }}
                                >
                                    <svg viewBox="0 0 400 120" className="w-full" preserveAspectRatio="none">
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
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/90">
                                            <path d="M12 4l1.5 4.5L18 12l-4.5 3.5L12 20l-1.5-4.5L6 12l4.5-3.5Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tap hint */}
                        <AnimatePresence>
                            {stage === "sealed" && (
                                <motion.p
                                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-40 text-sm text-ink/40 whitespace-nowrap"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: [0.4, 0.8, 0.4], y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    Tap to open
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* The actual card */}
                        <div ref={captureRef}>
                            <TemplateRenderer config={config} showEffects={stage === "revealed"} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer CTA */}
            <AnimatePresence>
                {stage === "revealed" && (
                    <motion.footer
                        className="w-full py-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <a
                            href="/create"
                            className="inline-flex items-center gap-2 text-sm text-berry hover:text-berry/80 font-medium transition-colors"
                        >
                            Create your own card
                            <span>→</span>
                        </a>
                    </motion.footer>
                )}
            </AnimatePresence>

            {/* Share Panel */}
            <SharePanel
                cardUrl={cardUrl}
                cardTitle={config.greeting || "Festive Card"}
                cardDescription={config.subGreeting || "A beautiful greeting card made for you"}
                cardElementRef={captureRef}
                open={shareOpen}
                onClose={() => setShareOpen(false)}
            />
        </main>
    );
}
