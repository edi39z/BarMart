/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

export default function Dashboard() {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({ email: "", role: "" })
    const [petugasList, setPetugasList] = useState<any[]>([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "", name: "", hp: "" })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem("email") || ""
        const role = localStorage.getItem("role") || ""
        setUserInfo({ email, role })

        if (role === "admin") {
            fetchPetugasList()
        }
    }, [])

    const fetchPetugasList = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const res = await fetch("http://localhost:4000/api/petugas-list", {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (res.ok) {
                const data = await res.json()
                setPetugasList(data.data || [])
            }
        } catch (err) {
            console.error("Error fetching petugas:", err)
        }
    }

    const handleAddPetugas = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const res = await fetch("http://localhost:4000/api/register-petugas", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                setMessage("✅ Petugas berhasil ditambahkan")
                setFormData({ email: "", password: "", name: "", hp: "" })
                setShowAddForm(false)
                fetchPetugasList()
            } else {
                setMessage(`❌ ${data.error || "Gagal menambahkan petugas"}`)
            }
        } catch (err) {
            setMessage("❌ Terjadi kesalahan")
        } finally {
            setLoading(false)
        }
    }

    const deletePetugas = async (id: number) => {
        if (!confirm("Yakin ingin menghapus petugas ini?")) return

        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const res = await fetch(`http://localhost:4000/api/petugas-delete?id=${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })

            if (res.ok) {
                setMessage("✅ Petugas berhasil dihapus")
                fetchPetugasList()
            } else {
                setMessage("❌ Gagal menghapus petugas")
            }
        } catch (err) {
            setMessage("❌ Terjadi kesalahan")
        }
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-500">{userInfo.role === "admin" ? "Panel Admin" : "Panel Petugas"}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{userInfo.email}</span>
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${userInfo.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {userInfo.role === "admin" ? "👑" : "👮"} {userInfo.role}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Selamat Datang, {userInfo.role === "admin" ? "Admin" : "Petugas"}!
                    </h2>
                    <p className="text-gray-600">Email: {userInfo.email}</p>
                </div>

                {/* Admin Only - Kelola Petugas */}
                {userInfo.role === "admin" && (
                    <div className="bg-white rounded-lg shadow p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Kelola Petugas</h3>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {showAddForm ? "Batal" : "➕ Tambah Petugas"}
                            </button>
                        </div>

                        {/* Form Tambah Petugas */}
                        {showAddForm && (
                            <form onSubmit={handleAddPetugas} className="mb-6 p-4 bg-gray-50 rounded">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nama"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="No. HP"
                                        value={formData.hp}
                                        onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                                        className="p-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                                >
                                    {loading ? "Menambahkan..." : "Tambah Petugas"}
                                </button>
                            </form>
                        )}

                        {/* Tabel Petugas */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">HP</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {petugasList.map((petugas) => (
                                        <tr key={petugas.id}>
                                            <td className="px-4 py-2 text-sm text-gray-900">{petugas.id}</td>
                                            <td className="px-4 py-2 text-sm text-gray-900">{petugas.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-900">{petugas.email}</td>
                                            <td className="px-4 py-2 text-sm text-gray-900">{petugas.hp}</td>
                                            <td className="px-4 py-2 text-sm">
                                                <button onClick={() => deletePetugas(petugas.id)} className="text-red-600 hover:text-red-900">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Message */}
                {message && (
                    <div
                        className={`mb-4 p-3 rounded ${message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                    >
                        {message}
                    </div>
                )}

                {/* Common Features */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Umum</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                            <div className="text-2xl mb-2">📊</div>
                            <h4 className="font-medium">Laporan</h4>
                            <p className="text-sm text-gray-600">Lihat laporan sistem</p>
                        </button>
                        <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                            <div className="text-2xl mb-2">🛒</div>
                            <h4 className="font-medium">Pedagang</h4>
                            <p className="text-sm text-gray-600">Kelola data pedagang</p>
                        </button>
                        <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                            <div className="text-2xl mb-2">⚙️</div>
                            <h4 className="font-medium">Pengaturan</h4>
                            <p className="text-sm text-gray-600">Konfigurasi sistem</p>
                        </button>
                    </div>
                </div>

                {/* Logout */}
                <div className="mt-8">
                    <LogoutButton />
                </div>
            </div>
        </main>
    )
}
