// frontend/src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
        return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return NextResponse.json({ error: "Password salah" }, { status: 401 })
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1d" }
    )

    return NextResponse.json({
        message: "Login berhasil", token,
        user: {
            email: user.email,
            image: user.image || ""
        }
    })
}
