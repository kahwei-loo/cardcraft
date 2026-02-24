export default function CardLoading() {
    return (
        <main className="min-h-screen bg-parchment flex items-center justify-center p-4">
            <div className="w-full max-w-lg space-y-6 animate-pulse">
                {/* Card skeleton */}
                <div className="aspect-[3/4] rounded-xl bg-ink/5" />
                {/* Action bar skeleton */}
                <div className="flex justify-center gap-3">
                    <div className="h-10 w-28 rounded-lg bg-ink/5" />
                    <div className="h-10 w-28 rounded-lg bg-ink/5" />
                </div>
            </div>
        </main>
    );
}
