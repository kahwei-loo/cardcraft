"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Share2, Shuffle, RotateCcw } from "lucide-react";
import {
    CardConfig,
    DEFAULT_CARD_CONFIG,
    HolidayType,
    EffectType,
    TemplateId,
    OutputFormat,
    AIStyleId,
} from "@/types/card";
import { ThemeConfig } from "@/types/card";
import { getThemesByHoliday } from "@/lib/themes";
import { getRandomGreeting } from "@/data/greetings";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { PostcardBack } from "@/components/templates/PostcardTemplate";
import SharePanel from "@/components/share/SharePanel";
import FormatSelector from "./FormatSelector";
import HolidayPicker from "./HolidayPicker";
import ThemeSelector from "./ThemeSelector";
import TemplateGallery from "./TemplateGallery";
import TextEditor from "./TextEditor";
import EffectSelector from "./EffectSelector";
import StyleSelector from "./StyleSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: "format", label: "Format", emoji: "📐" },
    { id: "template", label: "Template", emoji: "🎨" },
    { id: "text", label: "Text", emoji: "✍️" },
    { id: "photo", label: "Photo + AI", emoji: "🤖" },
    { id: "effects", label: "Effects", emoji: "✨" },
    { id: "preview", label: "Preview", emoji: "👁️" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export default function UnifiedEditor() {
    const { toast } = useToast();
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [shareOpen, setShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [saving, setSaving] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [holiday, setHoliday] = useState<HolidayType>("chinese-new-year");

    // Initialize greeting from data instead of hardcoding
    const initialGreeting = useMemo(() => getRandomGreeting("chinese-new-year"), []);
    const [config, setConfig] = useState<CardConfig>({
        ...DEFAULT_CARD_CONFIG,
        greeting: initialGreeting.greeting,
        subGreeting: initialGreeting.subGreeting,
    });

    const updateConfig = useCallback((updates: Partial<CardConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    }, []);

    // ── Holiday Change ──
    const handleHolidayChange = useCallback(
        (newHoliday: HolidayType) => {
            setHoliday(newHoliday);
            const themes = getThemesByHoliday(newHoliday);
            const greeting = getRandomGreeting(newHoliday);
            updateConfig({
                themeId: themes[0]?.id ?? "cny-red-gold",
                greeting: greeting.greeting,
                subGreeting: greeting.subGreeting,
                templateId: null,
            });
        },
        [updateConfig]
    );

    const handleThemeChange = useCallback(
        (theme: ThemeConfig) => updateConfig({ themeId: theme.id }),
        [updateConfig]
    );

    const handleTemplateSelect = useCallback(
        (template: { id: TemplateId; effects: EffectType[] }) => {
            updateConfig({ templateId: template.id, effects: template.effects });
        },
        [updateConfig]
    );

    const handleEffectToggle = useCallback(
        (effect: EffectType) => {
            if (effect === "none") {
                updateConfig({ effects: ["none"] });
                return;
            }
            setConfig((prev) => {
                const current = prev.effects.filter((e) => e !== "none");
                const newEffects = current.includes(effect)
                    ? current.filter((e) => e !== effect)
                    : [...current, effect];
                return { ...prev, effects: newEffects.length === 0 ? ["none"] : newEffects };
            });
        },
        [updateConfig]
    );

    const handleRandomize = useCallback(() => {
        const greeting = getRandomGreeting(holiday);
        updateConfig({
            seed: Date.now(),
            greeting: greeting.greeting,
            subGreeting: greeting.subGreeting,
        });
    }, [holiday, updateConfig]);

    // ── Save & Share ──
    const handleShare = useCallback(async () => {
        setSaving(true);
        try {
            // Strip blob URLs before persisting — they are session-local and cannot be loaded later
            const configToSave = {
                ...config,
                customImageUrl: config.customImageUrl?.startsWith("blob:") ? null : config.customImageUrl,
            };
            const res = await fetch("/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ config: configToSave }),
            });
            if (!res.ok) throw new Error("Failed to save");
            const data = await res.json();
            const url = `${window.location.origin}/card/${data.shortId}`;
            setShareUrl(url);
            setShareOpen(true);
            toast("Card saved!", "success");
        } catch (err) {
            toast("Could not save card. Using current page link instead.", "error");
            setShareUrl(window.location.href);
            setShareOpen(true);
        } finally {
            setSaving(false);
        }
    }, [config, toast]);

    // ── Step Validation ──
    const getStepWarning = useCallback(
        (stepId: StepId): string | null => {
            switch (stepId) {
                case "template":
                    return !config.templateId ? "Please select a template before continuing." : null;
                case "text":
                    return !config.greeting.trim() ? "Please enter a greeting message." : null;
                default:
                    return null;
            }
        },
        [config.templateId, config.greeting]
    );

    // ── Step Navigation ──
    const goNext = () => {
        const warning = getStepWarning(STEPS[currentStep].id);
        if (warning) {
            toast(warning, "error");
            return;
        }
        setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    };
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));
    const isLastStep = currentStep === STEPS.length - 1;

    // ── Render Step Content ──
    const renderStepContent = () => {
        switch (STEPS[currentStep].id) {
            case "format":
                return (
                    <div className="space-y-6">
                        <FormatSelector
                            selected={config.outputFormat}
                            onSelect={(f: OutputFormat) => updateConfig({ outputFormat: f })}
                        />
                        <HolidayPicker selected={holiday} onSelect={handleHolidayChange} />
                    </div>
                );
            case "template":
                return (
                    <div className="space-y-6">
                        <ThemeSelector
                            selectedThemeId={config.themeId}
                            onSelect={handleThemeChange}
                            holidayFilter={holiday}
                        />
                        <TemplateGallery
                            selectedTemplateId={config.templateId}
                            onSelect={handleTemplateSelect}
                            holidayFilter={holiday}
                        />
                    </div>
                );
            case "text":
                return (
                    <TextEditor
                        greeting={config.greeting}
                        subGreeting={config.subGreeting}
                        senderName={config.senderName}
                        recipientName={config.recipientName}
                        holiday={holiday}
                        onGreetingChange={(v) => updateConfig({ greeting: v })}
                        onSubGreetingChange={(v) => updateConfig({ subGreeting: v })}
                        onSenderNameChange={(v) => updateConfig({ senderName: v })}
                        onRecipientNameChange={(v) => updateConfig({ recipientName: v })}
                    />
                );
            case "photo":
                return (
                    <StyleSelector
                        selectedStyleId={config.aiStyleId}
                        onStyleSelect={(id: AIStyleId) =>
                            updateConfig({ aiStyleId: id, mode: "ai" })
                        }
                        onImageGenerated={(url: string) =>
                            updateConfig({ aiGeneratedUrl: url })
                        }
                        customImageUrl={config.customImageUrl}
                        onImageSelect={(url: string) =>
                            updateConfig({ customImageUrl: url })
                        }
                        aiGeneratedUrl={config.aiGeneratedUrl}
                    />
                );
            case "effects":
                return (
                    <EffectSelector selected={config.effects} onToggle={handleEffectToggle} />
                );
            case "preview":
                return (
                    <div className="space-y-4 text-center">
                        <p className="text-sm text-ink/60">
                            Your card is ready! Share it with someone special.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Step Indicator */}
            <div className="mb-6">
                <div className="flex items-center justify-between max-w-2xl mx-auto px-2" role="tablist" aria-label="Card creation steps">
                    {STEPS.map((step, i) => (
                        <button
                            key={step.id}
                            role="tab"
                            aria-selected={i === currentStep}
                            aria-label={`Step ${i + 1}: ${step.label}${i < currentStep ? " (completed)" : ""}`}
                            title={step.label}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all",
                                i <= currentStep ? "opacity-100" : "opacity-40"
                            )}
                            onClick={() => setCurrentStep(i)}
                        >
                            <div
                                className={cn(
                                    "w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all",
                                    i === currentStep
                                        ? "bg-berry text-white shadow-md scale-110"
                                        : i < currentStep
                                          ? "bg-berry/20 text-berry"
                                          : "bg-ink/10 text-ink/60"
                                )}
                            >
                                {i < currentStep ? "✓" : step.emoji}
                            </div>
                            <span
                                className={cn(
                                    "text-[10px] font-medium hidden sm:block",
                                    i === currentStep ? "text-berry" : "text-ink/60"
                                )}
                            >
                                {step.label}
                            </span>
                        </button>
                    ))}
                </div>
                {/* Progress bar */}
                <div className="mt-3 max-w-2xl mx-auto h-1 bg-ink/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label="Card creation progress">
                    <motion.div
                        className="h-full bg-berry rounded-full"
                        animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Controls Panel */}
                <div className="w-full lg:w-[400px] order-2 lg:order-1">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-ink/5 shadow-sm">
                        {/* Step Title */}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-display font-bold text-ink">
                                {STEPS[currentStep].emoji} {STEPS[currentStep].label}
                            </h2>
                            <span className="text-xs text-ink/60">
                                Step {currentStep + 1} of {STEPS.length}
                            </span>
                        </div>

                        {/* Step Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={STEPS[currentStep].id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-ink/10">
                            <Button
                                variant="outline"
                                className="border-ink/20 text-ink/60"
                                onClick={goBack}
                                disabled={currentStep === 0}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back
                            </Button>
                            {!isLastStep ? (
                                <Button variant="premium" onClick={goNext}>
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            ) : (
                                <Button
                                    variant="premium"
                                    onClick={handleShare}
                                    disabled={saving}
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    {saving ? "Saving..." : "Share Card"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Card Preview */}
                <div className="flex-1 order-1 lg:order-2">
                    <div className="sticky top-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-ink/50 uppercase tracking-wider font-semibold">
                                Live Preview
                            </p>
                            <motion.button
                                className="flex items-center gap-1 text-xs text-ink/50 hover:text-ink transition-colors"
                                onClick={handleRandomize}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Shuffle size={14} />
                                Randomize
                            </motion.button>
                        </div>

                        {/* Postcard flip toggle */}
                        {config.outputFormat === "postcard" && (
                            <div className="flex justify-center">
                                <button
                                    className={cn(
                                        "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all",
                                        showBack
                                            ? "bg-berry/10 border-berry/30 text-berry"
                                            : "bg-white/60 border-ink/10 text-ink/50 hover:text-ink/70"
                                    )}
                                    onClick={() => setShowBack((v) => !v)}
                                >
                                    <RotateCcw size={12} />
                                    {showBack ? "Show Front" : "Show Back"}
                                </button>
                            </div>
                        )}

                        <div className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md mx-auto" style={{ perspective: "1000px" }}>
                            <motion.div
                                ref={cardRef}
                                animate={{ rotateY: showBack && config.outputFormat === "postcard" ? 180 : 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front face */}
                                <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                    <TemplateRenderer config={config} showEffects={true} />
                                </div>
                                {/* Back face (postcard only) */}
                                {config.outputFormat === "postcard" && (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backfaceVisibility: "hidden",
                                            WebkitBackfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)",
                                        }}
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
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Panel */}
            <SharePanel
                cardUrl={shareUrl}
                cardTitle={config.greeting || "Festive Card"}
                cardDescription={config.subGreeting || "A beautiful greeting card made for you"}
                cardElementRef={cardRef}
                open={shareOpen}
                onClose={() => setShareOpen(false)}
            />
        </div>
    );
}
