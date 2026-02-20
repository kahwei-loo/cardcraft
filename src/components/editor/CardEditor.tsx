"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Shuffle, Share2, Download } from "lucide-react";
import { CardConfig, DEFAULT_CARD_CONFIG, HolidayType, EffectType, TemplateId } from "@/types/card";
import { ThemeConfig } from "@/types/card";
import { getThemesByHoliday } from "@/lib/themes";
import { getTemplateById } from "@/data/templates";
import { getRandomGreeting } from "@/data/greetings";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import SharePanel from "@/components/share/SharePanel";
import HolidayPicker from "./HolidayPicker";
import ThemeSelector from "./ThemeSelector";
import TemplateGallery from "./TemplateGallery";
import TextEditor from "./TextEditor";
import EffectSelector from "./EffectSelector";
import { Button } from "@/components/ui/button";

export default function CardEditor() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [saving, setSaving] = useState(false);
    const [holiday, setHoliday] = useState<HolidayType>("chinese-new-year");
    const [config, setConfig] = useState<CardConfig>({
        ...DEFAULT_CARD_CONFIG,
        greeting: "Happy New Year",
        subGreeting: "Wishing you prosperity in the Year of the Horse",
    });

    const updateConfig = useCallback((updates: Partial<CardConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    }, []);

    const handleHolidayChange = useCallback(
        (newHoliday: HolidayType) => {
            setHoliday(newHoliday);
            const themes = getThemesByHoliday(newHoliday);
            const greeting = getRandomGreeting(newHoliday);
            updateConfig({
                themeId: themes[0]?.id ?? "elegant-gold",
                greeting: greeting.greeting,
                subGreeting: greeting.subGreeting,
                templateId: null,
            });
        },
        [updateConfig]
    );

    const handleThemeChange = useCallback(
        (theme: ThemeConfig) => {
            updateConfig({ themeId: theme.id });
        },
        [updateConfig]
    );

    const handleTemplateSelect = useCallback(
        (template: { id: TemplateId; defaultGreetingKey: string; effects: EffectType[] }) => {
            updateConfig({
                templateId: template.id,
                effects: template.effects,
            });
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

    const handleShare = useCallback(async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ config }),
            });

            if (!res.ok) throw new Error("Failed to save");

            const data = await res.json();
            const url = `${window.location.origin}/card/${data.shortId}`;
            setShareUrl(url);
            setShareOpen(true);
        } catch (err) {
            console.error("Save failed:", err);
            // Fallback: share current page URL
            setShareUrl(window.location.href);
            setShareOpen(true);
        } finally {
            setSaving(false);
        }
    }, [config]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Controls Panel */}
                <div className="w-full lg:w-[380px] space-y-6 order-2 lg:order-1">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-ink/5 shadow-sm space-y-6">
                        <HolidayPicker selected={holiday} onSelect={handleHolidayChange} />
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
                        <EffectSelector
                            selected={config.effects}
                            onToggle={handleEffectToggle}
                        />
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
                    </div>
                </div>

                {/* Right: Card Preview */}
                <div className="flex-1 order-1 lg:order-2">
                    <div className="sticky top-8 space-y-4">
                        {/* Preview label */}
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

                        {/* Card preview */}
                        <div className="w-full max-w-md mx-auto">
                            <div ref={cardRef}>
                                <TemplateRenderer
                                    config={config}
                                    showEffects={true}
                                />
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 max-w-md mx-auto">
                            <Button
                                variant="premium"
                                className="flex-1"
                                size="lg"
                                onClick={handleShare}
                                disabled={saving}
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                {saving ? "Saving..." : "Share Card"}
                            </Button>
                            <Button
                                variant="outline"
                                className="border-ink/20 text-ink hover:bg-ink/5"
                                size="lg"
                                onClick={handleShare}
                                disabled={saving}
                            >
                                <Download className="w-4 h-4" />
                            </Button>
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
