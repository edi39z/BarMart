import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const file = formData.get("file") as File | null

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // 1. Coba simpan user dulu (tanpa gambar)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                image: null,
            },
        })

        // 2. Jika ada gambar, baru upload & update
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const filename = `profile_${Date.now()}_${Math.random().toString(36).substring(7)}`
            const result: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "profile_images",
                        public_id: filename,
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) return reject(error)
                        resolve(result)
                    }
                ).end(buffer)
            })

            // Update user dengan image URL
            await prisma.user.update({
                where: { id: user.id },
                data: { image: result.secure_url },
            })
        }

        return NextResponse.json({ message: "Berhasil register", user })
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 })
        }

        console.error("❌ Register error:", error)
        return NextResponse.json({ error: "Server error saat register" }, { status: 500 })
    }
}
