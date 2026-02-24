"use client";

import { motion } from "framer-motion";
import { OutputFormat } from "@/types/card";
import { cn } from "@/lib/utils";

interface FormatSelectorProps {
    selected: OutputFormat;
    onSelect: (format: OutputFormat) => void;
}

const FORMATS: { id: OutputFormat; label: string; emoji: string; description: string; aspect: string }[] = [
    {
        id: "greeting-card",
        label: "Greeting Card",
        emoji: "💌",
        description: "Portrait format with envelope reveal animation",
        aspect: "aspect-[3/4]",
    },
    {
        id: "postcard",
        label: "Postcard",
        emoji: "📬",
        description: "Landscape format with front & back layout",
        aspect: "aspect-[16/9]",
    },
];

export default function FormatSelector({ selected, onSelect }: FormatSelectorProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                Card Format
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {FORMATS.map((format) => (
                    <motion.button
                        key={format.id}
                        className={cn(
                            "relative rounded-xl p-4 text-left transition-all border",
                            selected === format.id
                                ? "bg-berry/10 border-berry/30 shadow-md"
                                : "bg-white/60 border-ink/10 hover:border-ink/20 hover:shadow-sm"
                        )}
                        onClick={() => onSelect(format.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-center space-y-2">
                            <span className="text-3xl block">{format.emoji}</span>
                            <div
                                className={cn(
                                    "mx-auto w-16 rounded border border-ink/20 bg-ink/5",
                                    format.aspect
                                )}
                            />
                            <p className="text-sm font-semibold text-ink">{format.label}</p>
                            <p className="text-xs text-ink/50 leading-tight">{format.description}</p>
                        </div>
                        {selected === format.id && (
                            <motion.div
                                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-berry flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <span className="text-white text-xs">✓</span>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
