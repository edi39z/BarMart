/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import LogoutButton from "@/components/LogoutButton"

export default function AdminRegisterPage() {
    const [activeTab, setActiveTab] = useState<"admin" | "petugas">("petugas")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        hp: "",
    })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        const token = localStorage.getItem("token")
        if (!token) {
            setMessage("❌ Token tidak ditemukan")
            setLoading(false)
            return
        }

        const endpoint = activeTab === "admin" ? "/api/register-admin" : "/api/register-petugas"

        try {
            const res = await fetch(`http://localhost:4000${endpoint}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage(`✅ ${data.message}`)
                setFormData({ email: "", password: "", name: "", hp: "" })
            } else {
                setMessage(`❌ ${data.error || "Gagal mendaftarkan"}`)
            }
        } catch (err) {
            setMessage("❌ Terjadi kesalahan saat mendaftarkan")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Daftarkan Admin/Petugas Baru</h1>

            {/* Tab Navigation */}
            <div className="flex mb-6 border-b">
                <button
                    onClick={() => setActiveTab("petugas")}
                    className={`px-4 py-2 font-medium ${activeTab === "petugas" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
                        }`}
                >
                    Daftar Petugas
                </button>
                <button
                    onClick={() => setActiveTab("admin")}
                    className={`px-4 py-2 font-medium ${activeTab === "admin" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
                        }`}
                >
                    Daftar Admin
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        placeholder="email@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                    />
                </div>

                {activeTab === "petugas" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                placeholder="Nama lengkap"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">No. HP</label>
                            <input
                                type="tel"
                                name="hp"
                                value={formData.hp}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Mendaftarkan..." : `Daftar ${activeTab === "admin" ? "Admin" : "Petugas"}`}
                </button>

                {message && (
                    <p className={`text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>
                )}
            </form>

            <div className="mt-8">
                <LogoutButton />
            </div>
        </main>
    )
}
