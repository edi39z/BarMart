import { NextRequest, NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/auth/findUserByEmail"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    if (!email || !password) {
        return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 })
    }

    const user = await findUserByEmail(email)

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
    )

    return NextResponse.json({
        message: "Login berhasil",
        token,
        user: {
            email: user.email,
            role: user.role,
        },
    })
}
