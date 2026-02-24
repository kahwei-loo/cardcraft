import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Admin Client for secure uploads
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MIME_EXTENSIONS: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        if (!ALLOWED_MIME_TYPES.has(file.type)) {
            return NextResponse.json({ error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }, { status: 400 })
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'File size must be under 10MB' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate safe filename (no user input)
        const ext = MIME_EXTENSIONS[file.type] || "jpg";
        const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

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
