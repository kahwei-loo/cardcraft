"use client";

import React, { useCallback, useRef, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
    selectedImage?: string | null;
    className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageSelect,
    selectedImage,
    className
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            onImageSelect(files[0]);
        }
    }, [onImageSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onImageSelect(files[0]);
        }
    }, [onImageSelect]);

    return (
        <div
            className={cn(
                "relative w-full aspect-[4/5] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group",
                isDragging ? "border-berry bg-berry/5 scale-[1.01]" : "border-sage bg-parchment-dark/30 hover:border-berry/50",
                selectedImage ? "border-solid border-none" : "",
                className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
            />

            {selectedImage ? (
                <div className="relative w-full h-full">
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-full object-cover rounded-lg shadow-inner"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-serif tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                            CHANGE IMAGE
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-ink/60 space-y-4">
                    <div className={cn(
                        "p-6 rounded-full bg-parchment shadow-sm transition-transform duration-500",
                        isDragging ? "scale-110 rotate-12" : "group-hover:scale-105"
                    )}>
                        {isDragging ? (
                            <ImageIcon className="w-10 h-10 text-berry" />
                        ) : (
                            <Upload className="w-10 h-10 text-sage-500" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="font-serif text-xl font-medium text-ink">
                            {isDragging ? "Drop to Upload" : "Upload Your Photo"}
                        </p>
                        <p className="text-sm mt-2 text-ink/50 max-w-[200px]">
                            Drag & drop or click to browse<br />(JPEG, PNG, WEBP)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
