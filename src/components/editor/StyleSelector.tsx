"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImageIcon, Wand2, Zap, Info } from "lucide-react";
import { AIStyleId } from "@/types/card";
import { AI_STYLES } from "@/data/ai-styles";
import { useCredits } from "@/hooks/useCredits";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface StyleSelectorProps {
    selectedStyleId: AIStyleId | null;
    onStyleSelect: (styleId: AIStyleId) => void;
    onImageGenerated: (url: string) => void;
    customImageUrl: string | null;
    onImageSelect: (url: string) => void;
    aiGeneratedUrl: string | null;
}

export default function StyleSelector({
    selectedStyleId,
    onStyleSelect,
    onImageGenerated,
    customImageUrl,
    onImageSelect,
    aiGeneratedUrl,
}: StyleSelectorProps) {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const prevBlobRef = useRef<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState("");
    const { credits, deductCredit } = useCredits();

    // Revoke old blob URLs and abort pending requests on unmount
    useEffect(() => {
        return () => {
            if (prevBlobRef.current) URL.revokeObjectURL(prevBlobRef.current);
            abortRef.current?.abort();
        };
    }, []);

    const createBlobUrl = useCallback(
        (file: File) => {
            if (prevBlobRef.current) URL.revokeObjectURL(prevBlobRef.current);
            const url = URL.createObjectURL(file);
            prevBlobRef.current = url;
            onImageSelect(url);
        },
        [onImageSelect]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file?.type.startsWith("image/")) {
                createBlobUrl(file);
            }
        },
        [createBlobUrl]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file?.type.startsWith("image/")) {
                createBlobUrl(file);
            }
        },
        [createBlobUrl]
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        // Only set isDragging to false when actually leaving the drop zone,
        // not when moving over child elements
        if (
            dropZoneRef.current &&
            e.relatedTarget instanceof Node &&
            dropZoneRef.current.contains(e.relatedTarget)
        ) {
            return;
        }
        setIsDragging(false);
    }, []);

    const handleGenerate = async () => {
        if (!customImageUrl || !selectedStyleId || credits <= 0) return;

        // Abort any pending request
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setIsProcessing(true);
        setStatus("Uploading image...");

        try {
            // Upload the image first (convert blob URL to file)
            const response = await fetch(customImageUrl);
            const blob = await response.blob();
            const formData = new FormData();
            formData.append("file", blob, "photo.jpg");

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            if (!uploadRes.ok) throw new Error("upload");
            const { url: uploadUrl } = await uploadRes.json();

            // Generate with style
            setStatus("Applying AI style...");
            const genRes = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageUrl: uploadUrl,
                    styleId: selectedStyleId,
                }),
                signal: controller.signal,
            });

            if (!genRes.ok) throw new Error("generation");
            const { result } = await genRes.json();

            onImageGenerated(result);
            deductCredit();
            setStatus("");
            toast("AI style applied!", "success");
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") return;

            const msg =
                error instanceof Error && error.message === "upload"
                    ? "Image upload failed. Please try a smaller image."
                    : "AI generation failed. Please try again.";
            toast(msg, "error");
            setStatus("");
        } finally {
            setIsProcessing(false);
        }
    };

    const creditsExhausted = credits <= 0;

    return (
        <div className="space-y-5">
            {/* Photo Upload */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                    Photo Upload
                </h3>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                    aria-label="Upload your photo"
                />
                <div
                    ref={dropZoneRef}
                    className={cn(
                        "relative w-full aspect-[4/3] rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group",
                        isDragging
                            ? "border-berry bg-berry/5"
                            : customImageUrl
                              ? "border-solid border-transparent"
                              : "border-ink/20 bg-white/40 hover:border-berry/50"
                    )}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {customImageUrl ? (
                        <div className="relative w-full h-full">
                            <img
                                src={customImageUrl}
                                alt="Selected photo"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white text-sm bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                    Change Photo
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-ink/50 gap-2">
                            {isDragging ? (
                                <ImageIcon className="w-8 h-8 text-berry" />
                            ) : (
                                <Upload className="w-8 h-8" />
                            )}
                            <p className="text-sm font-medium">
                                {isDragging ? "Drop to upload" : "Upload your photo"}
                            </p>
                            <p className="text-xs text-ink/60">Drag & drop or click</p>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Style Grid */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                    AI Style
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AI_STYLES.map((style) => (
                        <motion.button
                            key={style.id}
                            className={cn(
                                "flex flex-col items-center gap-1 p-3 rounded-lg border text-center transition-all",
                                selectedStyleId === style.id
                                    ? "bg-berry/10 border-berry/30 shadow-sm"
                                    : "bg-white/60 border-ink/10 hover:border-ink/20"
                            )}
                            onClick={() => onStyleSelect(style.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="text-xl">{style.icon}</span>
                            <span className="text-xs font-medium text-ink">{style.name}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Before/After Preview */}
            <AnimatePresence>
                {aiGeneratedUrl && (
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h3 className="text-sm font-semibold text-ink/70 uppercase tracking-wider">
                            AI Result
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {customImageUrl && (
                                <div className="rounded-lg overflow-hidden border border-ink/10">
                                    <p className="text-[10px] text-ink/60 text-center py-1 bg-white/60">
                                        Original
                                    </p>
                                    <img
                                        src={customImageUrl}
                                        alt="Original"
                                        className="w-full aspect-square object-cover"
                                    />
                                </div>
                            )}
                            <div className="rounded-lg overflow-hidden border border-berry/20">
                                <p className="text-[10px] text-berry text-center py-1 bg-berry/5">
                                    AI Generated
                                </p>
                                <img
                                    src={aiGeneratedUrl}
                                    alt="AI Generated"
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Generate Button + Credits */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-ink/50">
                        <Zap className="w-4 h-4 text-berry fill-berry" />
                        <span>{credits} credit{credits !== 1 ? "s" : ""}</span>
                    </div>
                    <Button
                        variant="premium"
                        size="lg"
                        disabled={!customImageUrl || !selectedStyleId || isProcessing || creditsExhausted}
                        onClick={handleGenerate}
                    >
                        {isProcessing ? (
                            <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {status || "Processing..."}
                            </motion.span>
                        ) : (
                            <>
                                <Wand2 className="w-4 h-4 mr-2" />
                                Generate (1 Credit)
                            </>
                        )}
                    </Button>
                </div>

                {/* Credits exhausted message */}
                {creditsExhausted && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                        <Info className="w-4 h-4 mt-0.5 shrink-0" />
                        <p className="text-xs leading-relaxed">
                            Free trial includes 3 AI generations. You can still create
                            beautiful cards using templates and effects without AI.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
