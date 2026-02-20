"use client";

import { EffectType } from "@/types/card";
import ConfettiEffect from "./ConfettiEffect";
import FireworksEffect from "./FireworksEffect";
import SnowEffect from "./SnowEffect";
import PetalsEffect from "./PetalsEffect";
import LanternEffect from "./LanternEffect";
import SparkleEffect from "./SparkleEffect";

interface EffectRendererProps {
    effects: EffectType[];
    colors?: string[];
    active?: boolean;
}

export default function EffectRenderer({
    effects,
    colors,
    active = true,
}: EffectRendererProps) {
    if (!active || effects.length === 0) return null;

    return (
        <>
            {effects.map((effect) => {
                switch (effect) {
                    case "confetti":
                        return <ConfettiEffect key={effect} active={active} colors={colors} />;
                    case "fireworks":
                        return <FireworksEffect key={effect} active={active} colors={colors} />;
                    case "snow":
                        return <SnowEffect key={effect} active={active} colors={colors} />;
                    case "petals":
                        return <PetalsEffect key={effect} active={active} colors={colors} />;
                    case "lanterns":
                        return <LanternEffect key={effect} active={active} colors={colors} />;
                    case "sparkle":
                        return <SparkleEffect key={effect} active={active} colors={colors} />;
                    case "none":
                        return null;
                    default:
                        return null;
                }
            })}
        </>
    );
}
