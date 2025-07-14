import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        const role = payload.role as string

        // Redirect berdasarkan role & path
        const pathname = req.nextUrl.pathname

        if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        if (pathname.startsWith("/dashboard/petugas") && role !== "petugas") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        return NextResponse.next()
    } catch (err) {
        console.error("❌ Invalid token:", err)
        return NextResponse.redirect(new URL("/login", req.url))
    }
}

export const config = {
    matcher: [
        "/",                    // proteksi beranda
        "/dashboard/admin",     // proteksi admin
        "/dashboard/petugas",   // proteksi petugas
        "/dashboard/:path*", 
    ],
}
