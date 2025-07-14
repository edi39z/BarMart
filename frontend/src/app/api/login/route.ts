import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/auth/findUserByEmail"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ✅ Gunakan JWT secret yang sama dengan backend
const JWT_SECRET = "your-secret-key-here-make-it-long-and-secure"

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 })
        }

        console.log("🔍 Login attempt for:", email)

        const user = await findUserByEmail(email)

        if (!user) {
            console.log("❌ User not found:", email)
            return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            console.log("❌ Invalid password for:", email)
            return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
        }

        const token = jwt.sign(
            {
                userId: user.id.toString(),
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "24h" },
        )

        console.log("✅ Login successful for:", email, "Role:", user.role)
        console.log("🔑 Generated token:", token.substring(0, 20) + "...")

        return NextResponse.json({
            message: "Login berhasil",
            token,
            role: user.role,
            user: {
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        console.error("❌ Login error:", error)
        return NextResponse.json({ error: "Server error saat login" }, { status: 500 })
    }
}
