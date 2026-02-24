import { ArrowLeft, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                {/* Two offset card shapes */}
                <div className="relative w-40 h-52 mx-auto">
                    <div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ink/5 to-ink/10 border border-ink/10 animate-[float_5s_ease-in-out_infinite]"
                        style={{ transform: "rotate(-8deg)" }}
                    />
                    <div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-berry/5 to-berry/10 border border-berry/10 flex items-center justify-center animate-[float_5s_ease-in-out_infinite_0.6s]"
                        style={{ transform: "rotate(4deg)" }}
                    >
                        <Search className="w-10 h-10 text-berry/25" />
                    </div>
                </div>

                <h1 className="text-3xl font-display font-bold text-ink">
                    Card Not Found
                </h1>
                <p className="text-ink-light">
                    This card may have been removed or the link might be incorrect.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-ink/60 hover:text-ink transition-colors font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <Link
                        href="/create"
                        className="inline-flex items-center gap-2 bg-berry hover:bg-berry/90 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                        <Plus size={16} />
                        Create a Card
                    </Link>
                </div>
            </div>
        </main>
    );
}
