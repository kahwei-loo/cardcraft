"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CardConfig, TemplateId } from "@/types/card";
import { getThemeById } from "@/lib/themes";
import { themeToCSS } from "@/lib/themes";
import { EffectRenderer } from "@/components/effects";
import SpringFestival from "./SpringFestival";
import WinterWonder from "./WinterWonder";
import LoveBloom from "./LoveBloom";
import PartyPop from "./PartyPop";
import GoldenHarvest from "./GoldenHarvest";
import LanternGlow from "./LanternGlow";
import PostcardFront from "./PostcardTemplate";

interface TemplateRendererProps {
    config: CardConfig;
    className?: string;
    showEffects?: boolean;
}

const TEMPLATE_MAP: Partial<Record<TemplateId, React.ComponentType<TemplateContentProps>>> = {
    "spring-festival": SpringFestival,
    "winter-wonder": WinterWonder,
    "love-bloom": LoveBloom,
    "party-pop": PartyPop,
    "golden-harvest": GoldenHarvest,
    "lantern-glow": LanternGlow,
};

export interface TemplateContentProps {
    greeting: string;
    subGreeting: string;
    senderName: string;
    recipientName: string;
    seed: number;
}

// Map iconSet string identifiers to emoji characters
const ICON_EMOJI_MAP: Record<string, string> = {
    lantern: "\u{1F3EE}",
    firecracker: "\u{1F9E8}",
    horse: "\u{1F40E}",
    coin: "\u{1FA99}",
    bamboo: "\u{1F38B}",
    jade: "\u{1FAC0}",
    cloud: "\u2601\uFE0F",
    tree: "\u{1F384}",
    star: "\u2B50",
    snowflake: "\u2744\uFE0F",
    gift: "\u{1F381}",
    heart: "\u2764\uFE0F",
    rose: "\u{1F339}",
    cupid: "\u{1F498}",
    ribbon: "\u{1F380}",
    cake: "\u{1F382}",
    balloon: "\u{1F388}",
    sparkle: "\u2728",
    feather: "\u{1FAB6}",
    crown: "\u{1F451}",
    moon: "\u{1F319}",
    ice: "\u{1F9CA}",
};

const cornerPositions = [
    { top: "6%", left: "8%", delay: 0 },
    { top: "6%", right: "8%", delay: 0.5 },
    { bottom: "6%", left: "8%", delay: 1.0 },
    { bottom: "6%", right: "8%", delay: 1.5 },
];

export default function TemplateRenderer({
    config,
    className = "",
    showEffects = true,
}: TemplateRendererProps) {
    const theme = getThemeById(config.themeId);
    const cssVars = theme ? themeToCSS(theme) : {};

    const TemplateComponent = config.templateId
        ? TEMPLATE_MAP[config.templateId] ?? null
        : null;

    // Build dynamic font style from theme
    const fontStyle: React.CSSProperties = theme
        ? {
              "--font-display": `"${theme.fontDisplay}", serif`,
              "--font-body": `"${theme.fontBody}", serif`,
          } as React.CSSProperties
        : {};

    const isPostcard = config.outputFormat === "postcard";
    const aspectClass = isPostcard ? "aspect-[16/9]" : "aspect-[3/4]";

    return (
        <div
            className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl card-shadow ${className}`}
            style={{ ...(cssVars as React.CSSProperties), ...fontStyle }}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-card-gradient" />

            {/* Pattern overlay */}
            {theme && !config.aiGeneratedUrl && (
                <div className={`absolute inset-0 opacity-10 ${theme.patternClass}`} />
            )}

            {/* AI-generated image background */}
            {config.aiGeneratedUrl && (
                <div className="absolute inset-0 z-[1]">
                    <img
                        src={config.aiGeneratedUrl}
                        alt="AI generated background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            )}

            {/* Top highlight — simulates light reflection on glossy card */}
            <div className="absolute inset-0 z-[3] pointer-events-none card-top-highlight" />

            {/* Inner vignette for depth */}
            <div className="absolute inset-0 z-[5] pointer-events-none card-vignette" />

            {/* Shimmer overlay — animated metallic sheen */}
            <div className="absolute inset-0 z-[4] pointer-events-none card-shimmer" />

            {/* Decorative inner frame */}
            <div className="absolute inset-0 z-[6] pointer-events-none p-4">
                <div className="relative w-full h-full">
                    {/* Corner ornaments — decorative flourishes */}
                    <svg className="absolute top-0 left-0 w-10 h-10 text-white/20" viewBox="0 0 40 40">
                        <path d="M0 0 L40 0 L40 3 L3 3 L3 40 L0 40 Z" fill="currentColor" />
                        <path d="M6 6 L18 6 L18 8 L8 8 L8 18 L6 18 Z" fill="currentColor" opacity="0.4" />
                        <circle cx="5" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
                    </svg>
                    <svg className="absolute top-0 right-0 w-10 h-10 text-white/20" viewBox="0 0 40 40">
                        <path d="M0 0 L40 0 L40 40 L37 40 L37 3 L0 3 Z" fill="currentColor" />
                        <path d="M22 6 L34 6 L34 18 L32 18 L32 8 L22 8 Z" fill="currentColor" opacity="0.4" />
                        <circle cx="35" cy="5" r="1.5" fill="currentColor" opacity="0.6" />
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-10 h-10 text-white/20" viewBox="0 0 40 40">
                        <path d="M0 0 L3 0 L3 37 L40 37 L40 40 L0 40 Z" fill="currentColor" />
                        <path d="M6 22 L8 22 L8 32 L18 32 L18 34 L6 34 Z" fill="currentColor" opacity="0.4" />
                        <circle cx="5" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-10 h-10 text-white/20" viewBox="0 0 40 40">
                        <path d="M37 0 L40 0 L40 40 L0 40 L0 37 L37 37 Z" fill="currentColor" />
                        <path d="M32 22 L34 22 L34 34 L22 34 L22 32 L32 32 Z" fill="currentColor" opacity="0.4" />
                        <circle cx="35" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
                    </svg>
                    {/* Double border lines for depth */}
                    <div className="absolute inset-2 border border-white/[0.06] rounded-lg" />
                    <div className="absolute inset-3 border border-white/[0.04] rounded-lg" />
                </div>
            </div>

            {/* Theme icon decorations */}
            {theme && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {theme.iconSet.slice(0, 4).map((iconName, i) => {
                        const emoji = ICON_EMOJI_MAP[iconName];
                        if (!emoji) return null;
                        const pos = cornerPositions[i];
                        return (
                            <motion.span
                                key={`${theme.id}-${iconName}`}
                                className="absolute text-lg opacity-30 select-none"
                                style={pos}
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                    duration: 3 + i * 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: pos.delay,
                                }}
                            >
                                {emoji}
                            </motion.span>
                        );
                    })}
                </div>
            )}

            {/* Template content */}
            <div className={`relative z-20 flex flex-col items-center justify-center h-full ${isPostcard ? "p-5" : "p-8"} text-center card-fonts`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${config.templateId ?? "default"}-${config.outputFormat}`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full"
                    >
                        {isPostcard ? (
                            <PostcardFront
                                greeting={config.greeting}
                                subGreeting={config.subGreeting}
                                senderName={config.senderName}
                                recipientName={config.recipientName}
                                seed={config.seed}
                            />
                        ) : TemplateComponent ? (
                            <TemplateComponent
                                greeting={config.greeting}
                                subGreeting={config.subGreeting}
                                senderName={config.senderName}
                                recipientName={config.recipientName}
                                seed={config.seed}
                            />
                        ) : (
                            <DefaultTemplate
                                greeting={config.greeting}
                                subGreeting={config.subGreeting}
                                senderName={config.senderName}
                                recipientName={config.recipientName}
                                seed={config.seed}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Effects layer */}
            {showEffects && (
                <EffectRenderer
                    effects={config.effects}
                    colors={theme ? [theme.colors.primary, theme.colors.secondary, theme.colors.accent] : undefined}
                />
            )}
        </div>
    );
}

const defaultContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const defaultItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function DefaultTemplate({
    greeting,
    subGreeting,
    senderName,
}: TemplateContentProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-6"
            variants={defaultContainerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-lg"
                variants={defaultItemVariants}
            >
                {greeting || "Happy Holidays!"}
            </motion.h1>
            {subGreeting && (
                <motion.p
                    className="text-lg md:text-xl text-white/90 font-serif max-w-xs"
                    variants={defaultItemVariants}
                >
                    {subGreeting}
                </motion.p>
            )}
            {senderName && (
                <motion.p className="text-sm text-white/70 mt-4" variants={defaultItemVariants}>
                    — {senderName}
                </motion.p>
            )}
        </motion.div>
    );
}
