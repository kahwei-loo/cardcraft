export default function CreateLoading() {
    return (
        <main className="min-h-screen bg-parchment p-4 md:p-8">
            <div className="max-w-6xl mx-auto animate-pulse">
                {/* Header skeleton */}
                <div className="h-8 w-48 rounded bg-ink/5 mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor panel skeleton */}
                    <div className="space-y-4">
                        <div className="h-12 rounded-lg bg-ink/5" />
                        <div className="h-32 rounded-lg bg-ink/5" />
                        <div className="h-12 rounded-lg bg-ink/5" />
                        <div className="h-12 rounded-lg bg-ink/5" />
                    </div>

                    {/* Preview panel skeleton */}
                    <div className="aspect-[3/4] rounded-xl bg-ink/5" />
                </div>
            </div>
        </main>
    );
}
