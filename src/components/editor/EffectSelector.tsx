"use client";

import { motion } from "framer-motion";
import { EffectType } from "@/types/card";
import { cn } from "@/lib/utils";

interface EffectSelectorProps {
    selected: EffectType[];
    onToggle: (effect: EffectType) => void;
}

interface EffectOption {
    id: EffectType;
    label: string;
    emoji: string;
}

const EFFECTS: EffectOption[] = [
    { id: "confetti", label: "Confetti", emoji: "🎊" },
    { id: "fireworks", label: "Fireworks", emoji: "🎆" },
    { id: "snow", label: "Snowfall", emoji: "❄️" },
    { id: "petals", label: "Petals", emoji: "🌸" },
    { id: "lanterns", label: "Lanterns", emoji: "🏮" },
    { id: "sparkle", label: "Sparkle", emoji: "✨" },
    { id: "none", label: "None", emoji: "⊘" },
];

export default function EffectSelector({
    selected,
    onToggle,
}: EffectSelectorProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                Effects
            </h3>
            <div className="flex flex-wrap gap-2">
                {EFFECTS.map((effect) => {
                    const isSelected =
                        effect.id === "none"
                            ? selected.length === 0 || selected.includes("none")
                            : selected.includes(effect.id);

                    return (
                        <motion.button
                            key={effect.id}
                            className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-all",
                                isSelected
                                    ? "bg-berry/10 text-berry border-berry/30"
                                    : "bg-white/60 text-ink/60 border-ink/10 hover:border-ink/20"
                            )}
                            onClick={() => onToggle(effect.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>{effect.emoji}</span>
                            <span className="font-medium">{effect.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
