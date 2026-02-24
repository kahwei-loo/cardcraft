export default function CardLoading() {
    return (
        <main className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-4">
                {/* Envelope skeleton */}
                <div className="relative">
                    {/* Flap */}
                    <div className="flex justify-center">
                        <div
                            className="w-0 h-0"
                            style={{
                                borderLeft: "140px solid transparent",
                                borderRight: "140px solid transparent",
                                borderTop: "70px solid rgba(64,47,38,0.05)",
                            }}
                        />
                    </div>
                    {/* Card body */}
                    <div className="aspect-[3/4] rounded-b-2xl bg-ink/[0.03] border border-ink/5 -mt-px flex items-center justify-center animate-pulse">
                        <div className="w-14 h-14 rounded-full bg-berry/10" />
                    </div>
                </div>
                {/* Tap hint */}
                <div className="h-3 w-20 bg-ink/5 rounded mx-auto animate-pulse" />
            </div>
        </main>
    );
}
