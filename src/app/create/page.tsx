import Link from "next/link";
import UnifiedEditor from "@/components/editor/UnifiedEditor";

export const metadata = {
    title: "Create Card - Festive E-Card Studio",
    description: "Design beautiful animated greeting cards with preset templates, AI styles, and effects",
};

export default function CreatePage() {
    return (
        <main className="min-h-screen bg-parchment">
            {/* Header */}
            <header className="w-full py-6 px-4 text-center">
                <Link href="/" className="inline-block">
                    <h1 className="text-2xl font-display font-bold text-ink tracking-tight hover:text-berry transition-colors">
                        Festive E-Card Studio
                    </h1>
                </Link>
                <p className="text-sm text-ink/50 mt-1">
                    Design your perfect greeting card
                </p>
            </header>

            {/* Unified Editor */}
            <section className="px-4 pb-12">
                <UnifiedEditor />
            </section>
        </main>
    );
}
