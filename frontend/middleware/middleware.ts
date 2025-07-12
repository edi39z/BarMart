// frontend/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    const protectedPaths = ["/", "/dashboard", "/profile"]

    const { pathname } = request.nextUrl

    if (protectedPaths.includes(pathname) && !token) {
        const loginUrl = new URL("/login", request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}
