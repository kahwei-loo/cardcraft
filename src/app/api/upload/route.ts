import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Admin Client for secure uploads
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const filename = `uploads/${Date.now()}-${file.name}`

        // Upload to Supabase Storage
        const { data, error } = await supabaseAdmin
            .storage
            .from('images')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) throw error

        // Get Public URL
        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('images')
            .getPublicUrl(filename)

        return NextResponse.json({ url: publicUrl, path: filename })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
