export default function CreateLoading() {
    return (
        <main className="min-h-screen bg-parchment">
            <header className="w-full py-6 px-4 text-center">
                <div className="h-8 w-48 bg-ink/5 rounded-lg mx-auto animate-pulse" />
                <div className="h-4 w-64 bg-ink/5 rounded mt-2 mx-auto animate-pulse" />
            </header>

            <section className="px-4 pb-12 max-w-6xl mx-auto">
                {/* Step indicator skeleton */}
                <div className="flex items-center justify-between max-w-2xl mx-auto mb-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className={`w-9 h-9 rounded-full animate-pulse ${i === 0 ? "bg-berry/20" : "bg-ink/5"}`} />
                            <div className="h-2 w-10 rounded bg-ink/5 animate-pulse hidden sm:block" />
                        </div>
                    ))}
                </div>
                {/* Progress bar */}
                <div className="max-w-2xl mx-auto h-1 bg-ink/10 rounded-full mb-8 overflow-hidden">
                    <div className="h-full w-[16%] bg-berry/20 rounded-full" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white/50 rounded-2xl p-5 border border-ink/5 space-y-4">
                            <div className="h-6 w-28 bg-ink/5 rounded animate-pulse" />
                            <div className="h-12 bg-ink/[0.03] rounded-lg animate-pulse" />
                            <div className="h-20 bg-ink/[0.03] rounded-lg animate-pulse" />
                            <div className="flex justify-between pt-4 border-t border-ink/5">
                                <div className="h-10 w-20 bg-ink/5 rounded-lg animate-pulse" />
                                <div className="h-10 w-20 bg-berry/10 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 hidden lg:block">
                        <div className="aspect-[3/4] rounded-2xl bg-ink/[0.03] animate-pulse max-w-md mx-auto" />
                    </div>
                </div>
            </section>
        </main>
    );
}
