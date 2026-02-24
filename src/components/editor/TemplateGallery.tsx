"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TEMPLATES } from "@/data/templates";
import { CardTemplate, HolidayType, TemplateId } from "@/types/card";
import { getThemesByHoliday } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface TemplateGalleryProps {
    selectedTemplateId: TemplateId | null;
    onSelect: (template: CardTemplate) => void;
    holidayFilter?: HolidayType | null;
}

export default function TemplateGallery({
    selectedTemplateId,
    onSelect,
    holidayFilter,
}: TemplateGalleryProps) {
    const templates = holidayFilter
        ? TEMPLATES.filter((t) => t.holiday === holidayFilter)
        : TEMPLATES;

    // Pre-compute theme lookups once per holiday filter change instead of per-template
    const themesByHoliday = useMemo(() => {
        const map = new Map<HolidayType, ReturnType<typeof getThemesByHoliday>>();
        for (const t of templates) {
            if (!map.has(t.holiday)) map.set(t.holiday, getThemesByHoliday(t.holiday));
        }
        return map;
    }, [templates]);

    if (templates.length === 0) {
        return (
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                    Card Template
                </h3>
                <p className="text-sm text-ink/50 text-center py-8">
                    No templates available for this occasion yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                Card Template
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => {
                    const previewTheme = themesByHoliday.get(template.holiday)?.[0];
                    const isSelected = selectedTemplateId === template.id;

                    return (
                        <motion.button
                            key={template.id}
                            className={cn(
                                "relative rounded-xl overflow-visible aspect-[3/4] text-left transition-all",
                                isSelected
                                    ? "shadow-lg scale-[1.02]"
                                    : "ring-1 ring-ink/10 hover:ring-ink/30 hover:shadow-md"
                            )}
                            onClick={() => onSelect(template)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSelected && (
                                <motion.div
                                    layoutId="template-ring"
                                    className="absolute inset-0 rounded-xl ring-2 ring-berry ring-offset-2"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}

                            {/* Gradient preview */}
                            <div
                                className="absolute inset-0 rounded-xl overflow-hidden"
                                style={{
                                    background: previewTheme
                                        ? `linear-gradient(135deg, ${previewTheme.gradientFrom}, ${previewTheme.gradientTo})`
                                        : "linear-gradient(135deg, #667eea, #764ba2)",
                                }}
                            />

                            {/* Content overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                                <span className="text-2xl mb-2">
                                    {getTemplateEmoji(template.id)}
                                </span>
                                <p className="text-white font-display font-semibold text-sm drop-shadow">
                                    {template.name}
                                </p>
                                <p className="text-white/70 text-xs mt-1 line-clamp-2">
                                    {template.description}
                                </p>
                            </div>

                            {/* Selected indicator */}
                            {isSelected && (
                                <motion.div
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <span className="text-ink text-xs">✓</span>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

function getTemplateEmoji(id: TemplateId): string {
    const map: Partial<Record<TemplateId, string>> = {
        "spring-festival": "🧧",
        "winter-wonder": "❄️",
        "love-bloom": "💕",
        "party-pop": "🎉",
        "golden-harvest": "🍁",
        "lantern-glow": "🏮",
        "postcard": "📬",
    };
    return map[id] ?? "✨";
}
