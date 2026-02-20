import { HolidayType } from "@/types/card";

export interface GreetingPreset {
    id: string;
    holiday: HolidayType;
    greeting: string;
    subGreeting: string;
    language: "en" | "zh" | "bilingual";
}

// ============================================================
// Preset Greetings by Holiday
// ============================================================

export const GREETINGS: GreetingPreset[] = [
    // Chinese New Year - Year of the Fire Horse 2026
    {
        id: "cny-1",
        holiday: "chinese-new-year",
        greeting: "新年快乐",
        subGreeting: "Happy New Year! Wishing you prosperity in the Year of the Horse",
        language: "bilingual",
    },
    {
        id: "cny-2",
        holiday: "chinese-new-year",
        greeting: "恭喜发财",
        subGreeting: "May wealth and fortune find their way to you",
        language: "bilingual",
    },
    {
        id: "cny-3",
        holiday: "chinese-new-year",
        greeting: "龙马精神",
        subGreeting: "Wishing you the vigor of dragons and horses",
        language: "bilingual",
    },
    {
        id: "cny-4",
        holiday: "chinese-new-year",
        greeting: "马到成功",
        subGreeting: "May success come swiftly like a galloping horse",
        language: "bilingual",
    },
    {
        id: "cny-5",
        holiday: "chinese-new-year",
        greeting: "万事如意",
        subGreeting: "May all your wishes come true in the new year",
        language: "bilingual",
    },
    {
        id: "cny-6",
        holiday: "chinese-new-year",
        greeting: "Happy Year of the Horse!",
        subGreeting: "Gallop into a year of success and prosperity",
        language: "en",
    },

    // Christmas
    {
        id: "xmas-1",
        holiday: "christmas",
        greeting: "Merry Christmas",
        subGreeting: "Wishing you joy, peace, and love this holiday season",
        language: "en",
    },
    {
        id: "xmas-2",
        holiday: "christmas",
        greeting: "Season's Greetings",
        subGreeting: "May your days be merry and bright",
        language: "en",
    },
    {
        id: "xmas-3",
        holiday: "christmas",
        greeting: "Joy to the World",
        subGreeting: "Wishing you warmth and wonder this Christmas",
        language: "en",
    },

    // Valentine's Day
    {
        id: "val-1",
        holiday: "valentines",
        greeting: "Happy Valentine's Day",
        subGreeting: "You make every day brighter just by being you",
        language: "en",
    },
    {
        id: "val-2",
        holiday: "valentines",
        greeting: "With All My Love",
        subGreeting: "Every moment with you is a treasure",
        language: "en",
    },

    // Birthday
    {
        id: "bday-1",
        holiday: "birthday",
        greeting: "Happy Birthday!",
        subGreeting: "Here's to another year of amazing adventures",
        language: "en",
    },
    {
        id: "bday-2",
        holiday: "birthday",
        greeting: "Make a Wish!",
        subGreeting: "May all your birthday dreams come true",
        language: "en",
    },
    {
        id: "bday-3",
        holiday: "birthday",
        greeting: "Cheers to You!",
        subGreeting: "Celebrating the wonderful person you are",
        language: "en",
    },

    // Thanksgiving
    {
        id: "thanks-1",
        holiday: "thanksgiving",
        greeting: "Happy Thanksgiving",
        subGreeting: "Grateful for the blessing of having you in my life",
        language: "en",
    },

    // General
    {
        id: "gen-1",
        holiday: "general",
        greeting: "Thinking of You",
        subGreeting: "Sending warm wishes and good vibes your way",
        language: "en",
    },
    {
        id: "gen-2",
        holiday: "general",
        greeting: "Congratulations!",
        subGreeting: "Celebrating this wonderful milestone with you",
        language: "en",
    },
    {
        id: "gen-3",
        holiday: "general",
        greeting: "Best Wishes",
        subGreeting: "Wishing you all the happiness in the world",
        language: "en",
    },
];

// ============================================================
// Greeting Helpers
// ============================================================

export function getGreetingsByHoliday(holiday: HolidayType): GreetingPreset[] {
    return GREETINGS.filter((g) => g.holiday === holiday);
}

export function getGreetingById(id: string): GreetingPreset | undefined {
    return GREETINGS.find((g) => g.id === id);
}

export function getRandomGreeting(holiday: HolidayType): GreetingPreset {
    const pool = getGreetingsByHoliday(holiday);
    if (pool.length === 0) {
        return GREETINGS[GREETINGS.length - 1]; // fallback to general
    }
    return pool[Math.floor(Math.random() * pool.length)];
}
