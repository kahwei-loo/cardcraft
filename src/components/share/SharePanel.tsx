"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, QrCode, Download, Share2, Check, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SharePanelProps {
    cardUrl: string;
    cardTitle?: string;
    cardDescription?: string;
    cardElementRef?: React.RefObject<HTMLDivElement | null>;
    open: boolean;
    onClose: () => void;
}

type ShareTab = "link" | "qr" | "image";

export default function SharePanel({
    cardUrl,
    cardTitle = "Check out my card!",
    cardDescription = "I made a festive greeting card for you",
    cardElementRef,
    open,
    onClose,
}: SharePanelProps) {
    const [activeTab, setActiveTab] = useState<ShareTab>("link");
    const [copied, setCopied] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(cardUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = cardUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [cardUrl]);

    const handleNativeShare = useCallback(async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: cardTitle,
                    text: cardDescription,
                    url: cardUrl,
                });
            } catch {
                // User cancelled — not an error
            }
        }
    }, [cardUrl, cardTitle, cardDescription]);

    const handleExportImage = useCallback(async () => {
        if (!cardElementRef?.current) return;
        setExporting(true);

        try {
            const el = cardElementRef.current;
            const rect = el.getBoundingClientRect();
            const dataUrl = await toPng(el, {
                quality: 0.95,
                pixelRatio: 2,
                width: rect.width,
                height: rect.height,
                style: {
                    transform: "none",
                    margin: "0",
                },
            });

            const link = document.createElement("a");
            link.download = "festive-card.png";
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Export failed:", err);
        } finally {
            setExporting(false);
        }
    }, [cardElementRef]);

    const tabs: { id: ShareTab; label: string; icon: React.ReactNode }[] = [
        { id: "link", label: "Link", icon: <Link2 size={16} /> },
        { id: "qr", label: "QR Code", icon: <QrCode size={16} /> },
        { id: "image", label: "Download", icon: <Download size={16} /> },
    ];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className="relative bg-parchment rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-ink/40 hover:text-ink transition-colors"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-display font-bold text-ink">
                            Share Your Card
                        </h2>

                        {/* Native share (if available) */}
                        {typeof navigator !== "undefined" && "share" in navigator && (
                            <Button
                                onClick={handleNativeShare}
                                variant="premium"
                                className="w-full"
                                size="lg"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share via...
                            </Button>
                        )}

                        {/* Tab selector */}
                        <div className="flex rounded-lg bg-parchment-dark/50 p-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all",
                                        activeTab === tab.id
                                            ? "bg-white text-ink shadow-sm"
                                            : "text-ink/50 hover:text-ink/70"
                                    )}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div className="min-h-[200px]">
                            {activeTab === "link" && (
                                <motion.div
                                    className="space-y-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={cardUrl}
                                            readOnly
                                            className="flex-1 bg-white/60 border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink font-mono truncate"
                                        />
                                        <Button
                                            onClick={handleCopyLink}
                                            variant="outline"
                                            className={cn(
                                                "shrink-0 border-ink/20",
                                                copied && "bg-green-50 border-green-300 text-green-700"
                                            )}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check size={16} className="mr-1" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Link2 size={16} className="mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-ink/40">
                                        Anyone with this link can view your card
                                    </p>
                                </motion.div>
                            )}

                            {activeTab === "qr" && (
                                <motion.div
                                    className="flex flex-col items-center gap-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="bg-white p-4 rounded-xl shadow-inner">
                                        <QRCodeSVG
                                            value={cardUrl}
                                            size={180}
                                            bgColor="#FFFFFF"
                                            fgColor="#402F26"
                                            level="M"
                                        />
                                    </div>
                                    <p className="text-xs text-ink/40 text-center">
                                        Scan this QR code to view the card
                                    </p>
                                </motion.div>
                            )}

                            {activeTab === "image" && (
                                <motion.div
                                    className="flex flex-col items-center gap-4 py-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Download size={48} className="text-ink/20" />
                                    <p className="text-sm text-ink/60 text-center">
                                        Download your card as a high-quality PNG image
                                    </p>
                                    <Button
                                        onClick={handleExportImage}
                                        variant="premium"
                                        disabled={!cardElementRef?.current || exporting}
                                    >
                                        <Download size={16} className="mr-2" />
                                        {exporting ? "Exporting..." : "Download PNG"}
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
