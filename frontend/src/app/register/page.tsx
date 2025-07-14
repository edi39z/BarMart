"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
    })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        if (formData.password !== formData.confirmPassword) {
            setMessage("Password tidak cocok")
            setLoading(false)
            return
        }

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("password", formData.password)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: formDataToSend,
            })

            const data = await res.json()

            if (res.ok) {
                setMessage("✅ Pendaftaran berhasil! Silakan login.")
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
            } else {
                setMessage(data.error || "❌ Pendaftaran gagal")
            }
        } catch (err) {
            setMessage("❌ Terjadi kesalahan saat mendaftar")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Daftar Sebagai Pedagang</h1>
                        <p className="text-gray-600 mt-2">Bergabunglah dengan BarMart dan mulai berjualan online</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="nama@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password *
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Minimal 6 karakter"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Konfirmasi Password *
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ulangi password"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                No. Telepon
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Alamat Toko
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Alamat lengkap toko Anda"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 font-medium"
                        >
                            {loading ? "Mendaftar..." : "Daftar Sekarang"}
                        </button>

                        {message && (
                            <div
                                className={`text-sm text-center p-3 rounded ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {message}
                            </div>
                        )}
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun?{" "}
                            <button onClick={() => router.push("/login")} className="text-blue-600 hover:text-blue-500 font-medium">
                                Login di sini
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
