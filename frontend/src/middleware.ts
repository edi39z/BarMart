import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname

    // Routes yang perlu proteksi
    const protectedRoutes = ["/dashboard"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if (!isProtectedRoute) {
        return NextResponse.next()
    }

    const token = req.cookies.get("token")?.value

    // Jika tidak ada token, redirect ke login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
        // Decode token secara manual
        const payload = JSON.parse(atob(token.split(".")[1]))
        const role = payload.role as string
        const exp = payload.exp

        // Check if token expired
        if (exp && Date.now() >= exp * 1000) {
            const response = NextResponse.redirect(new URL("/login", req.url))
            response.cookies.delete("token")
            return response
        }

        // Hanya admin dan petugas yang bisa akses dashboard
        if (pathname.startsWith("/dashboard") && role !== "admin" && role !== "petugas") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        return NextResponse.next()
    } catch (err) {
        console.error("❌ Token decode error:", err)
        const response = NextResponse.redirect(new URL("/login", req.url))
        response.cookies.delete("token")
        return response
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
}
