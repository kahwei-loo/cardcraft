import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { getStyleById } from '@/data/ai-styles'
import { AIStyleId } from '@/types/card'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

const ALLOWED_IMAGE_HOSTS = [
    process.env.NEXT_PUBLIC_SUPABASE_URL
        ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
        : null,
    "replicate.delivery",
    "pbxt.replicate.delivery",
].filter(Boolean) as string[];

const VALID_STYLE_IDS: Set<string> = new Set([
    "manga", "watercolor", "oil-painting", "anime", "sketch", "pop-art",
]);

function isAllowedImageUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") return false;
        return ALLOWED_IMAGE_HOSTS.some((host) => parsed.hostname.endsWith(host));
    } catch {
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { imageUrl, styleId } = body

        if (!imageUrl || typeof imageUrl !== "string") {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
        }

        if (!isAllowedImageUrl(imageUrl)) {
            return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 })
        }

        if (!styleId || !VALID_STYLE_IDS.has(styleId)) {
            return NextResponse.json({ error: 'Valid styleId is required' }, { status: 400 })
        }

        const style = getStyleById(styleId as AIStyleId)
        if (!style) {
            return NextResponse.json({ error: 'Unknown style' }, { status: 400 })
        }

        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: imageUrl,
                    prompt: style.prompt,
                    strength: style.strength,
                    guidance_scale: 7.5,
                    num_inference_steps: 30
                }
            }
        )

        const generatedImage = Array.isArray(output) ? output[0] : output

        if (typeof generatedImage !== "string") {
            return NextResponse.json({ error: 'Unexpected output format from model' }, { status: 500 })
        }

        return NextResponse.json({
            result: generatedImage,
            styleId: style.id,
            styleName: style.name,
        })

    } catch (error) {
        console.error('Generation error:', error)
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
    }
}
