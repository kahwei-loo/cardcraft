"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getGreetingsByHoliday, GreetingPreset } from "@/data/greetings";
import { HolidayType } from "@/types/card";
import { cn } from "@/lib/utils";

interface TextEditorProps {
    greeting: string;
    subGreeting: string;
    senderName: string;
    recipientName: string;
    holiday: HolidayType;
    onGreetingChange: (value: string) => void;
    onSubGreetingChange: (value: string) => void;
    onSenderNameChange: (value: string) => void;
    onRecipientNameChange: (value: string) => void;
}

export default function TextEditor({
    greeting,
    subGreeting,
    senderName,
    recipientName,
    holiday,
    onGreetingChange,
    onSubGreetingChange,
    onSenderNameChange,
    onRecipientNameChange,
}: TextEditorProps) {
    const [showPresets, setShowPresets] = useState(false);
    const presets = getGreetingsByHoliday(holiday);

    const applyPreset = (preset: GreetingPreset) => {
        onGreetingChange(preset.greeting);
        onSubGreetingChange(preset.subGreeting);
        setShowPresets(false);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                Card Text
            </h3>

            {/* Preset suggestions */}
            <div className="space-y-2">
                <button
                    className="text-xs text-berry hover:text-berry/80 font-medium transition-colors"
                    onClick={() => setShowPresets(!showPresets)}
                >
                    {showPresets ? "Hide presets ▲" : "Use preset greeting ▼"}
                </button>

                {showPresets && (
                    <motion.div
                        className="grid gap-2 max-h-48 overflow-y-auto pr-1"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        {presets.map((preset) => (
                            <button
                                key={preset.id}
                                className={cn(
                                    "text-left p-2 rounded-lg border border-ink/10 hover:border-berry/30 hover:bg-berry/5 transition-all",
                                    greeting === preset.greeting && "border-berry bg-berry/5"
                                )}
                                onClick={() => applyPreset(preset)}
                            >
                                <p className="font-semibold text-sm text-ink">
                                    {preset.greeting}
                                </p>
                                <p className="text-xs text-ink/60 mt-0.5">
                                    {preset.subGreeting}
                                </p>
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Main greeting input */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-ink/50 uppercase tracking-wider">
                    Main Greeting
                </label>
                <input
                    type="text"
                    value={greeting}
                    onChange={(e) => onGreetingChange(e.target.value)}
                    placeholder="Happy Holidays!"
                    className="w-full bg-white/60 border border-ink/10 rounded-lg px-3 py-2 text-ink text-lg font-display placeholder:text-ink/25 focus:outline-none focus:ring-2 focus:ring-berry/20 focus:border-berry transition-all"
                    maxLength={50}
                />
            </div>

            {/* Sub greeting input */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-ink/50 uppercase tracking-wider">
                    Message
                </label>
                <textarea
                    value={subGreeting}
                    onChange={(e) => onSubGreetingChange(e.target.value)}
                    placeholder="Write your heartfelt message..."
                    rows={3}
                    className="w-full bg-white/60 border border-ink/10 rounded-lg px-3 py-2 text-ink font-serif placeholder:text-ink/25 focus:outline-none focus:ring-2 focus:ring-berry/20 focus:border-berry transition-all resize-none"
                    maxLength={200}
                />
            </div>

            {/* Names row */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-ink/50 uppercase tracking-wider">
                        From
                    </label>
                    <input
                        type="text"
                        value={senderName}
                        onChange={(e) => onSenderNameChange(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-white/60 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm placeholder:text-ink/25 focus:outline-none focus:ring-2 focus:ring-berry/20 focus:border-berry transition-all"
                        maxLength={30}
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-ink/50 uppercase tracking-wider">
                        To
                    </label>
                    <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => onRecipientNameChange(e.target.value)}
                        placeholder="Recipient's name"
                        className="w-full bg-white/60 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm placeholder:text-ink/25 focus:outline-none focus:ring-2 focus:ring-berry/20 focus:border-berry transition-all"
                        maxLength={30}
                    />
                </div>
            </div>
        </div>
    );
}
