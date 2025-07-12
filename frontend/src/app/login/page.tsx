"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function LoginPage() {
    const router = useRouter() // ✅ Inisialisasi router

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            console.log("📦 Res login:", data)

            if (res.ok && data.user) {
                Cookies.set("token", data.token)
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", data.user.email)
                localStorage.setItem("image", data.user.image || "")
                console.log("✅ Login sukses, redirect ke /")
                router.push("/")
                return
            }

            setMessage(data.message || data.error || "Login gagal")
        } catch (err) {
            console.error("❌ Error saat login:", err)
            setMessage("Terjadi kesalahan")
        }
    }

    return (
        <main className="p-6">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
                {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
            </form>
        </main>
    )
}
