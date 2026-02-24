import confetti from "canvas-confetti";

export function fireConfetti(colors?: string[]) {
    const defaults = colors ?? ["#A63044", "#C0596A", "#D4AF37"];
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: defaults,
    });
}

export function fireSuccessConfetti() {
    confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
        colors: ["#A63044", "#D4AF37", "#2E8B57"],
        gravity: 1.2,
        scalar: 0.8,
    });
}
