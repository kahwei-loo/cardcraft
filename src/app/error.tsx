"use client";

import { motion } from "framer-motion";
import { RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                className="space-y-6 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Broken card visual */}
                <div className="relative w-40 h-52 mx-auto">
                    {/* Left half */}
                    <motion.div
                        className="absolute left-0 top-0 w-[48%] h-full rounded-l-2xl bg-gradient-to-br from-ink/5 to-ink/8 border border-ink/10 border-r-0"
                        animate={{ rotate: [-2, -3, -2], x: [-1, -3, -1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Right half */}
                    <motion.div
                        className="absolute right-0 top-0 w-[48%] h-full rounded-r-2xl bg-gradient-to-br from-berry/5 to-berry/8 border border-berry/10 border-l-0"
                        animate={{ rotate: [2, 3, 2], x: [1, 3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    />
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-berry/30" />
                    </div>
                </div>

                <h1 className="text-3xl font-display font-bold text-ink">
                    Something Went Wrong
                </h1>
                <p className="text-ink-light">
                    An unexpected error occurred. Please try again or return to the home page.
                </p>
                <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 bg-berry hover:bg-berry/90 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-ink/60 hover:text-ink transition-colors font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </a>
                </div>
            </motion.div>
        </main>
    );
}
