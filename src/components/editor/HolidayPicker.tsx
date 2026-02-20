"use client";

import { motion } from "framer-motion";
import { HolidayType } from "@/types/card";
import { cn } from "@/lib/utils";

interface HolidayPickerProps {
    selected: HolidayType;
    onSelect: (holiday: HolidayType) => void;
}

interface HolidayOption {
    id: HolidayType;
    label: string;
    emoji: string;
}

const HOLIDAYS: HolidayOption[] = [
    { id: "chinese-new-year", label: "Chinese New Year", emoji: "🧧" },
    { id: "christmas", label: "Christmas", emoji: "🎄" },
    { id: "valentines", label: "Valentine's", emoji: "💕" },
    { id: "birthday", label: "Birthday", emoji: "🎂" },
    { id: "thanksgiving", label: "Thanksgiving", emoji: "🍁" },
    { id: "general", label: "General", emoji: "✨" },
];

export default function HolidayPicker({
    selected,
    onSelect,
}: HolidayPickerProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                Occasion
            </h3>
            <div className="flex flex-wrap gap-2">
                {HOLIDAYS.map((holiday) => (
                    <motion.button
                        key={holiday.id}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all",
                            selected === holiday.id
                                ? "bg-ink text-parchment border-ink"
                                : "bg-white/60 text-ink border-ink/10 hover:border-ink/30"
                        )}
                        onClick={() => onSelect(holiday.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>{holiday.emoji}</span>
                        <span className="font-medium">{holiday.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
