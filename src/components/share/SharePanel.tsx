"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, QrCode, Download, Share2, Check, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
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
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<ShareTab>("link");
    const [copied, setCopied] = useState(false);
    const [exporting, setExporting] = useState(false);

    const panelRef = useRef<HTMLDivElement>(null);

    // Focus trap and Escape key handler
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }

            // Focus trap: cycle focus within the panel
            if (e.key === "Tab" && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Move focus into the panel on open
        const timer = setTimeout(() => {
            panelRef.current?.querySelector<HTMLElement>("button, [href], input")?.focus();
        }, 100);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            clearTimeout(timer);
        };
    }, [open, onClose]);

    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(cardUrl);
            setCopied(true);
            toast("Link copied!", "success");
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
            toast("Link copied!", "success");
            setTimeout(() => setCopied(false), 2000);
        }
    }, [cardUrl, toast]);

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
            toast("Failed to export image.", "error");
        } finally {
            setExporting(false);
        }
    }, [cardElementRef, toast]);

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
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="share-panel-title"
                        className="relative bg-parchment rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-ink/60 hover:text-ink transition-colors"
                            onClick={onClose}
                            aria-label="Close share panel"
                        >
                            <X size={20} />
                        </button>

                        <h2 id="share-panel-title" className="text-xl font-display font-bold text-ink">
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

                        {/* Social share buttons */}
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(`${cardTitle} ${cardUrl}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-sm font-medium"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(cardTitle)}&url=${encodeURIComponent(cardUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/5 text-ink/70 hover:bg-black/10 transition-colors text-sm font-medium"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                X
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors text-sm font-medium"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </a>
                        </div>

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
                                    <p className="text-xs text-ink/60">
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
                                    <p className="text-xs text-ink/60 text-center">
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
