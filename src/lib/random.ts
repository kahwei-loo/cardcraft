// ============================================================
// Seeded Random Number Generator (Mulberry32)
// Deterministic: same seed always produces same sequence
// ============================================================

export function mulberry32(seed: number): () => number {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ============================================================
// Golden Ratio Distribution
// Produces evenly-spaced values that avoid clumping
// ============================================================

const GOLDEN_RATIO = 0.618033988749895;

export function goldenRatioSequence(
    seed: number,
    count: number,
    min = 0,
    max = 1
): number[] {
    const rng = mulberry32(seed);
    let current = rng();
    const result: number[] = [];

    for (let i = 0; i < count; i++) {
        current = (current + GOLDEN_RATIO) % 1;
        result.push(min + current * (max - min));
    }

    return result;
}

// ============================================================
// Color Harmony Generators (HSL-based)
// ============================================================

export interface HSLColor {
    h: number; // 0-360
    s: number; // 0-100
    l: number; // 0-100
}

export function hslToString(color: HSLColor): string {
    return `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)`;
}

export function complementaryColor(base: HSLColor): HSLColor {
    return { h: (base.h + 180) % 360, s: base.s, l: base.l };
}

export function analogousColors(base: HSLColor, spread = 30): HSLColor[] {
    return [
        { h: (base.h - spread + 360) % 360, s: base.s, l: base.l },
        base,
        { h: (base.h + spread) % 360, s: base.s, l: base.l },
    ];
}

export function triadicColors(base: HSLColor): HSLColor[] {
    return [
        base,
        { h: (base.h + 120) % 360, s: base.s, l: base.l },
        { h: (base.h + 240) % 360, s: base.s, l: base.l },
    ];
}

// ============================================================
// Random Layout Generators
// ============================================================

export interface Position {
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

/**
 * Generate aesthetically distributed positions using golden ratio
 * Avoids center overlap by excluding a center "safe zone"
 */
export function generateElementPositions(
    seed: number,
    count: number,
    options?: {
        safeZoneCenter?: { x: number; y: number };
        safeZoneRadius?: number;
        minScale?: number;
        maxScale?: number;
    }
): Position[] {
    const rng = mulberry32(seed);
    const {
        safeZoneCenter = { x: 50, y: 50 },
        safeZoneRadius = 20,
        minScale = 0.4,
        maxScale = 1.0,
    } = options ?? {};

    const xValues = goldenRatioSequence(seed, count * 2, 5, 95);
    const yValues = goldenRatioSequence(seed + 1, count * 2, 5, 95);

    const positions: Position[] = [];
    let xi = 0;
    let yi = 0;

    while (positions.length < count && xi < xValues.length && yi < yValues.length) {
        const x = xValues[xi++];
        const y = yValues[yi++];

        // Skip positions inside safe zone
        const dx = x - safeZoneCenter.x;
        const dy = y - safeZoneCenter.y;
        if (Math.sqrt(dx * dx + dy * dy) < safeZoneRadius) {
            continue;
        }

        positions.push({
            x,
            y,
            rotation: rng() * 360 - 180,
            scale: minScale + rng() * (maxScale - minScale),
        });
    }

    return positions;
}

// ============================================================
// Seeded Shuffle (Fisher-Yates with seeded RNG)
// ============================================================

export function seededShuffle<T>(array: T[], seed: number): T[] {
    const rng = mulberry32(seed);
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Pick N random items from an array using seeded RNG
 */
export function seededPick<T>(array: T[], count: number, seed: number): T[] {
    return seededShuffle(array, seed).slice(0, count);
}
