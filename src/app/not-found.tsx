import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-4 max-w-md">
                <p className="text-6xl">🎴</p>
                <h1 className="text-3xl font-display font-bold text-ink">
                    Card Not Found
                </h1>
                <p className="text-ink-light">
                    This card may have been removed or the link might be incorrect.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 mt-4 text-berry hover:text-berry/80 font-medium transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </a>
            </div>
        </main>
    );
}
