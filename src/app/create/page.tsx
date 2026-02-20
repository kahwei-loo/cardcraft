import CardEditor from "@/components/editor/CardEditor";

export const metadata = {
    title: "Create Card - Festive E-Card Studio",
    description: "Design beautiful animated greeting cards with preset templates and effects",
};

export default function CreatePage() {
    return (
        <main className="min-h-screen bg-parchment">
            {/* Header */}
            <header className="w-full py-6 px-4 text-center">
                <a href="/" className="inline-block">
                    <h1 className="text-2xl font-display font-bold text-ink tracking-tight hover:text-berry transition-colors">
                        Festive E-Card Studio
                    </h1>
                </a>
                <p className="text-sm text-ink/50 mt-1">
                    Design your perfect greeting card
                </p>
            </header>

            {/* Editor */}
            <section className="px-4 pb-12">
                <CardEditor />
            </section>
        </main>
    );
}
