"use client";

import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { Button } from '@/components/ui/button'; // Assuming Button is created
import { Wand2, Zap } from 'lucide-react';

export default function CardGenerator() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [credits, setCredits] = useState(3);
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState("");

    const handleImageSelect = (file: File) => {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleBuyCredits = async () => {
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quantity: 5,
                    returnUrl: window.location.href
                })
            });
            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (error) {
            console.error("Checkout failed", error);
        }
    };

    const handleGenerate = async () => {
        if (!selectedFile) return;
        if (credits <= 0) {
            alert("Please purchase credits!");
            return;
        }

        setIsProcessing(true);
        setStatus("Uploading image...");

        try {
            // 1. Upload
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) throw new Error("Upload failed");
            const { url: uploadUrl } = await uploadRes.json();

            // 2. Generate
            setStatus("Painting your card...");
            const genRes = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imageUrl: uploadUrl,
                    prompt: "oil painting style, masterpiece, holiday card, detailed"
                })
            });

            if (!genRes.ok) throw new Error("Generation failed");
            const { result } = await genRes.json();

            setGeneratedImage(result);
            setCredits(prev => prev - 1);
            setStatus("Done!");

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-8">
            <div className="bg-white/40 p-1 rounded-2xl shadow-xl backdrop-blur-sm border border-white/50">
                <div className="bg-parchment rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sage/20 to-transparent -mr-12 -mt-12 rounded-full" />

                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-serif font-bold text-ink">Create Your Card</h2>
                        <p className="text-ink-light italic">Upload a photo to begin the magic</p>
                    </div>

                    <ImageUploader
                        onImageSelect={handleImageSelect}
                        selectedImage={generatedImage || previewUrl}
                    />

                    {isProcessing && (
                        <div className="text-center text-berry font-serif animate-pulse">
                            ✨ {status} ✨
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                        <div className="text-sm font-medium text-ink-light flex items-center gap-1">
                            <Zap className="w-4 h-4 text-berry fill-berry" />
                            <span>{credits} Credits Available</span>
                        </div>

                        <div className="flex gap-2">
                            {credits <= 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handleBuyCredits}
                                    className="border-berry text-berry hover:bg-berry/10"
                                >
                                    Top Up
                                </Button>
                            )}
                            <Button
                                size="lg"
                                variant="premium"
                                disabled={!selectedFile || isProcessing || credits <= 0}
                                onClick={handleGenerate}
                                className="bg-berry w-full md:w-auto min-w-[150px]"
                            >
                                {!selectedFile ? (
                                    "Select Image First"
                                ) : isProcessing ? (
                                    "Creating Magic..."
                                ) : credits <= 0 ? (
                                    "No Credits"
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4 mr-2" />
                                        Render (1 Credit)
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
