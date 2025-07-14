"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // Redirect jika sudah login
    useEffect(() => {
        const token = localStorage.getItem("token")
        const role = localStorage.getItem("role")

        if (token && role) {
            if (role === "admin" || role === "petugas") {
                router.push("/dashboard")
            } else {
                router.push("/")
            }
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (res.ok && data.token) {
                // Simpan token
                Cookies.set("token", data.token, { expires: 1 })
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", email)
                localStorage.setItem("role", data.role)

                // Redirect berdasarkan role
                if (data.role === "admin" || data.role === "petugas") {
                    router.push("/dashboard")
                } else {
                    router.push("/") // Pedagang ke beranda
                }
            } else {
                setMessage(data.error || "Login gagal")
            }
        } catch (err) {
            console.error("❌ Error saat login:", err)
            setMessage("Terjadi kesalahan saat login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-center text-gray-900">Login BarMart</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">Masuk ke akun Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="admin@gmail.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? "Memproses..." : "Login"}
                    </button>

                    {message && <div className="text-sm text-center p-3 rounded bg-red-100 text-red-700">{message}</div>}
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Belum punya akun?{" "}
                        <button onClick={() => router.push("/register")} className="text-blue-600 hover:text-blue-500 font-medium">
                            Daftar sebagai Pedagang
                        </button>
                    </p>

                    <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">Demo Login:</p>
                        <div className="text-xs text-gray-500 mt-1 space-y-1">
                            <p>👑 Admin: admin@gmail.com / admin123</p>
                            <p>👮 Petugas: petugas@gmail.com / admin123</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
