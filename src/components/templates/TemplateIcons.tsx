"use client";

/**
 * Theme-color-aware SVG decorations for card templates.
 * All SVGs use currentColor to inherit theme text color via CSS classes.
 */

interface IconProps {
    className?: string;
    size?: number;
}

// ============================================================
// Chinese New Year
// ============================================================

export function RedEnvelopeSVG({ className = "", size = 40 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            className={className}
        >
            {/* Envelope body */}
            <rect x="8" y="6" width="32" height="38" rx="4" fill="currentColor" opacity="0.9" />
            {/* Flap */}
            <path d="M8 12 L24 22 L40 12" stroke="currentColor" strokeWidth="2" opacity="0.5" fill="none" />
            {/* Gold circle seal */}
            <circle cx="24" cy="26" r="8" fill="currentColor" opacity="0.3" />
            {/* Fortune character placeholder (abstract) */}
            <path
                d="M21 24 L24 21 L27 24 L24 27 Z"
                fill="currentColor"
                opacity="0.6"
            />
        </svg>
    );
}

export function HorseSVG({ className = "", size = 28 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
        >
            {/* Simplified horse silhouette */}
            <path
                d="M8 26 L10 18 L12 14 L16 10 L20 8 L24 8 L26 10 L24 14 L22 16 L22 20 L24 26 M12 14 L10 20 L10 26 M16 10 L18 6 L20 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Mane */}
            <path
                d="M18 6 L16 8 M20 4 L18 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
            />
        </svg>
    );
}

export function FireElementSVG({ className = "", size = 20 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 2 C12 2 5 10 5 15 C5 19 8 22 12 22 C16 22 19 19 19 15 C19 10 12 2 12 2 Z"
                fill="currentColor"
                opacity="0.8"
            />
            <path
                d="M12 8 C12 8 9 13 9 16 C9 18 10.5 19 12 19 C13.5 19 15 18 15 16 C15 13 12 8 12 8 Z"
                fill="currentColor"
                opacity="0.4"
            />
        </svg>
    );
}

// ============================================================
// Christmas / Winter
// ============================================================

export function SnowflakeSVG({ className = "", size = 32 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
        >
            {/* 6-armed snowflake */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {/* Vertical arm */}
                <line x1="16" y1="2" x2="16" y2="30" />
                <line x1="14" y1="6" x2="16" y2="4" />
                <line x1="18" y1="6" x2="16" y2="4" />
                <line x1="14" y1="26" x2="16" y2="28" />
                <line x1="18" y1="26" x2="16" y2="28" />
                {/* 60deg arm */}
                <line x1="3.9" y1="9" x2="28.1" y2="23" />
                <line x1="6" y1="7.5" x2="5.5" y2="10.5" />
                <line x1="26" y1="24.5" x2="26.5" y2="21.5" />
                {/* -60deg arm */}
                <line x1="28.1" y1="9" x2="3.9" y2="23" />
                <line x1="26" y1="7.5" x2="26.5" y2="10.5" />
                <line x1="6" y1="24.5" x2="5.5" y2="21.5" />
            </g>
            {/* Center */}
            <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5" />
        </svg>
    );
}

export function StarBurstSVG({ className = "", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 2 L13.5 9 L20 7 L15 12 L20 17 L13.5 15 L12 22 L10.5 15 L4 17 L9 12 L4 7 L10.5 9 Z"
                fill="currentColor"
                opacity="0.8"
            />
        </svg>
    );
}

// ============================================================
// Valentine's
// ============================================================

export function HeartSVG({ className = "", size = 48 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            className={className}
        >
            <path
                d="M24 42 C24 42 4 28 4 16 C4 10 9 5 15 5 C19 5 22 7 24 10 C26 7 29 5 33 5 C39 5 44 10 44 16 C44 28 24 42 24 42 Z"
                fill="currentColor"
                opacity="0.85"
            />
            {/* Inner shine */}
            <path
                d="M15 14 C15 11 17 9 19 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
            />
        </svg>
    );
}

export function SmallHeartSVG({ className = "", size = 16 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}
        >
            <path
                d="M8 14 C8 14 1 9.5 1 5.5 C1 3 3 1.5 5 1.5 C6.5 1.5 7.5 2.5 8 3.5 C8.5 2.5 9.5 1.5 11 1.5 C13 1.5 15 3 15 5.5 C15 9.5 8 14 8 14 Z"
                fill="currentColor"
            />
        </svg>
    );
}

// ============================================================
// Birthday / Party
// ============================================================

export function BalloonSVG({ className = "", size = 32 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 40"
            fill="none"
            className={className}
        >
            {/* Balloon body */}
            <ellipse cx="16" cy="14" rx="10" ry="13" fill="currentColor" opacity="0.85" />
            {/* Highlight */}
            <ellipse cx="12" cy="10" rx="3" ry="4" fill="currentColor" opacity="0.3" />
            {/* Knot */}
            <polygon points="14,27 16,29 18,27" fill="currentColor" opacity="0.7" />
            {/* String */}
            <path
                d="M16 29 C14 33 18 35 16 39"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
            />
        </svg>
    );
}

export function CakeSVG({ className = "", size = 32 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
        >
            {/* Cake layers */}
            <rect x="6" y="18" width="20" height="8" rx="2" fill="currentColor" opacity="0.7" />
            <rect x="8" y="12" width="16" height="8" rx="2" fill="currentColor" opacity="0.85" />
            {/* Frosting drip */}
            <path
                d="M8 14 Q10 16 12 14 Q14 12 16 14 Q18 16 20 14 Q22 12 24 14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
            />
            {/* Candle */}
            <rect x="15" y="6" width="2" height="7" rx="1" fill="currentColor" opacity="0.6" />
            {/* Flame */}
            <ellipse cx="16" cy="5" rx="2" ry="3" fill="currentColor" opacity="0.4" />
        </svg>
    );
}

export function ConfettiStarSVG({ className = "", size = 24 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z"
                fill="currentColor"
                opacity="0.8"
            />
        </svg>
    );
}

// ============================================================
// Autumn / Thanksgiving
// ============================================================

export function MapleLeafSVG({ className = "", size = 28 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
        >
            <path
                d="M16 2 L18 8 L24 6 L20 12 L26 14 L20 16 L22 22 L16 18 L10 22 L12 16 L6 14 L12 12 L8 6 L14 8 Z"
                fill="currentColor"
                opacity="0.85"
            />
            {/* Stem */}
            <line x1="16" y1="18" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

export function WheatSVG({ className = "", size = 28 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 32"
            fill="none"
            className={className}
        >
            {/* Stem */}
            <line x1="12" y1="8" x2="12" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Grains - left */}
            <ellipse cx="9" cy="10" rx="3" ry="2" fill="currentColor" opacity="0.7" transform="rotate(-30 9 10)" />
            <ellipse cx="9" cy="15" rx="3" ry="2" fill="currentColor" opacity="0.6" transform="rotate(-30 9 15)" />
            <ellipse cx="9" cy="20" rx="3" ry="2" fill="currentColor" opacity="0.5" transform="rotate(-30 9 20)" />
            {/* Grains - right */}
            <ellipse cx="15" cy="12" rx="3" ry="2" fill="currentColor" opacity="0.7" transform="rotate(30 15 12)" />
            <ellipse cx="15" cy="17" rx="3" ry="2" fill="currentColor" opacity="0.6" transform="rotate(30 15 17)" />
            {/* Top grain */}
            <ellipse cx="12" cy="6" rx="2" ry="3" fill="currentColor" opacity="0.8" />
        </svg>
    );
}

// ============================================================
// Lantern (CNY variant)
// ============================================================

export function LanternSVG({ className = "", size = 32 }: IconProps) {
    return (
        <svg
            width={size}
            height={size * 1.4}
            viewBox="0 0 32 44"
            fill="none"
            className={className}
        >
            {/* Hanging string */}
            <line x1="16" y1="0" x2="16" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Top cap */}
            <rect x="11" y="6" width="10" height="3" rx="1" fill="currentColor" opacity="0.7" />
            {/* Lantern body */}
            <ellipse cx="16" cy="22" rx="12" ry="14" fill="currentColor" opacity="0.8" />
            {/* Inner glow band */}
            <ellipse cx="16" cy="22" rx="8" ry="10" fill="currentColor" opacity="0.3" />
            {/* Bottom cap */}
            <rect x="12" y="35" width="8" height="3" rx="1" fill="currentColor" opacity="0.7" />
            {/* Tassel */}
            <line x1="16" y1="38" x2="16" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

// ============================================================
// Elegant / General
// ============================================================

export function CrownSVG({ className = "", size = 28 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 28"
            fill="none"
            className={className}
        >
            <path
                d="M4 22 L2 8 L10 14 L16 4 L22 14 L30 8 L28 22 Z"
                fill="currentColor"
                opacity="0.8"
            />
            {/* Jewels */}
            <circle cx="10" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
            <circle cx="16" cy="17" r="1.5" fill="currentColor" opacity="0.4" />
            <circle cx="22" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
            {/* Base band */}
            <rect x="4" y="22" width="24" height="4" rx="1" fill="currentColor" opacity="0.6" />
        </svg>
    );
}

export function FeatherSVG({ className = "", size = 28 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 32"
            fill="none"
            className={className}
        >
            {/* Quill */}
            <path
                d="M12 30 Q10 20 6 12 Q4 8 6 4 Q10 0 14 4 Q18 8 16 16 Q14 24 12 30 Z"
                fill="currentColor"
                opacity="0.7"
            />
            {/* Center vein */}
            <path
                d="M12 30 Q10 18 10 8"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
            />
        </svg>
    );
}
