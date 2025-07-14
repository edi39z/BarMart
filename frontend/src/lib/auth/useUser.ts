"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

type Role = "admin" | "petugas" | "pedagang"

type DecodedToken = {
    email: string
    role: Role
    exp: number
}

export function useUser(required = false) {
    const router = useRouter()
    const [user, setUser] = useState<{ email: string; role: Role } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            console.warn("❌ Token tidak ditemukan")
            if (required) router.push("/login")
            setLoading(false)
            return
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token)
            console.log("✅ Token decoded:", decoded)

            const now = Date.now() / 1000
            if (decoded.exp < now) {
                console.warn("❌ Token expired")
                if (required) router.push("/login")
                setLoading(false)
                return
            }

            setUser({ email: decoded.email, role: decoded.role })
        } catch (err) {
            console.error("❌ Gagal decode token:", err)
            if (required) router.push("/login")
        } finally {
            setLoading(false)
        }
    }, [required, router])

    return { user, loading, isLoggedIn: !!user }
}
