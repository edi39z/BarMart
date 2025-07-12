/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        if (image) {
            formData.append("file", image)
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: formData,
            })

            const data = await res.json()
            setMessage(data.message || data.error)
        } catch (err) {
            setMessage("❌ Terjadi kesalahan saat register")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4 text-center">Form Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="text" placeholder="Nama" value={name} onChange={e => setName(e.target.value)} required className="p-2 border rounded" />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="p-2 border rounded" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="p-2 border rounded" />
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="p-2 border rounded" />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white font-medium p-2 rounded hover:bg-blue-700 transition">
                    {loading ? "Loading..." : "Daftar"}
                </button>
                {message && <p className="text-sm text-center mt-2 text-red-600">{message}</p>}
            </form>
        </main>
    )
}
