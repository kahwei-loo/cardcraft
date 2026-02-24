"use client";

import { RefreshCw, ArrowLeft } from "lucide-react";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-4 max-w-md">
                <p className="text-6xl">🎴</p>
                <h1 className="text-3xl font-display font-bold text-ink">
                    Something Went Wrong
                </h1>
                <p className="text-ink-light">
                    An unexpected error occurred. Please try again or return to
                    the home page.
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 text-berry hover:text-berry/80 font-medium transition-colors"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-berry hover:text-berry/80 font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </a>
                </div>
            </div>
        </main>
    );
}
