import CardGenerator from "@/components/hero/CardGenerator";

export const metadata = {
    title: "AI Transform - Festive E-Card Studio",
    description: "Transform your photos into hand-painted holiday cards with AI",
};

export default function AIModePage() {
    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center">
            {/* Header */}
            <header className="w-full py-6 px-4 text-center">
                <a href="/" className="inline-block">
                    <h1 className="text-2xl font-display font-bold text-ink tracking-tight hover:text-berry transition-colors">
                        Festive E-Card Studio
                    </h1>
                </a>
                <p className="text-sm text-ink/50 mt-1">
                    AI-powered photo transformation
                </p>
            </header>

            {/* AI Generator */}
            <section className="w-full max-w-4xl px-4 pb-12">
                <div className="flex flex-col items-center gap-8">
                    <CardGenerator />
                </div>
            </section>
        </main>
    );
}
