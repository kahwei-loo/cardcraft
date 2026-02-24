"use client";

import { motion } from "framer-motion";
import { THEMES, getThemesByHoliday } from "@/lib/themes";
import { HolidayType, ThemeConfig } from "@/types/card";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
    selectedThemeId: string;
    onSelect: (theme: ThemeConfig) => void;
    holidayFilter?: HolidayType | null;
}

const HOLIDAY_LABELS: Record<HolidayType, string> = {
    "chinese-new-year": "Chinese New Year",
    christmas: "Christmas",
    valentines: "Valentine's",
    birthday: "Birthday",
    thanksgiving: "Thanksgiving",
    general: "General",
};

export default function ThemeSelector({
    selectedThemeId,
    onSelect,
    holidayFilter,
}: ThemeSelectorProps) {
    const themes = holidayFilter
        ? getThemesByHoliday(holidayFilter)
        : THEMES;

    // Group themes by holiday
    const grouped = themes.reduce<Record<string, ThemeConfig[]>>((acc, theme) => {
        const key = theme.holiday;
        if (!acc[key]) acc[key] = [];
        acc[key].push(theme);
        return acc;
    }, {});

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                Color Theme
            </h3>

            {Object.entries(grouped).map(([holiday, holidayThemes]) => (
                <div key={holiday} className="space-y-2">
                    <p className="text-xs text-ink/50 font-medium">
                        {HOLIDAY_LABELS[holiday as HolidayType]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {holidayThemes.map((theme) => {
                            const isSelected = selectedThemeId === theme.id;
                            return (
                                <motion.button
                                    key={theme.id}
                                    className={cn(
                                        "relative w-10 h-10 rounded-lg border-2 transition-all overflow-visible",
                                        isSelected
                                            ? "border-transparent scale-110"
                                            : "border-transparent hover:border-ink/30"
                                    )}
                                    onClick={() => onSelect(theme)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title={theme.name}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="theme-ring"
                                            className="absolute inset-0 rounded-lg ring-2 ring-berry ring-offset-2"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <div
                                        className="absolute inset-0 rounded-lg overflow-hidden"
                                        style={{
                                            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                                        }}
                                    />
                                    {isSelected && (
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                        >
                                            <span className="text-white text-sm drop-shadow">✓</span>
                                        </motion.div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
