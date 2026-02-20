import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: Request) {
    try {
        const { imageUrl, prompt } = await request.json()

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
        }

        // Default system prompt if none provided
        const stylePrompt = prompt || "watercolor painting style, festive, warm lighting, holiday card, magical atmosphere"

        // Call Replicate (using a fast, high-quality model like SDXL or specific Style Transfer)
        // Using simple diffusion for img2img as a placeholder
        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: imageUrl,
                    prompt: stylePrompt,
                    strength: 0.75, // How much to stick to original structure
                    guidance_scale: 7.5,
                    num_inference_steps: 30
                }
            }
        )

        // Replicate returns an array of output URLs
        const generatedImage = Array.isArray(output) ? output[0] : output

        return NextResponse.json({ result: generatedImage })

    } catch (error) {
        console.error('Generation error:', error)
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
    }
}
