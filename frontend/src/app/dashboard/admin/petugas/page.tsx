"use client"

import { useState, useEffect } from "react"
import LogoutButton from "@/components/LogoutButton"

export default function PetugasDashboard() {
    const [userInfo, setUserInfo] = useState({ email: "", role: "" })
    const [data, setData] = useState<Record<string, any> | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem("email") || ""
        const role = localStorage.getItem("role") || ""
        setUserInfo({ email, role })
    }, [])

    const testPetugasAPI = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        setLoading(true)
        try {
            const res = await fetch("http://localhost:4000/api/petugas", {
                headers: { Authorization: `Bearer ${token}` },
            })
            const result = await res.json()
            setData(result)
        } catch (err) {
            console.error("Error:", err)
        } finally {
            setLoading(false)
        }
    }

    const menuItems = [
        { title: "Kelola Pedagang", icon: "🛒", description: "Verifikasi dan kelola pedagang" },
        { title: "Monitoring Lapak", icon: "🏪", description: "Pantau aktivitas lapak" },
        { title: "Laporan Harian", icon: "📋", description: "Buat laporan harian" },
        { title: "Profile", icon: "👤", description: "Kelola profile petugas" },
    ]

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Dashboard Petugas</h1>
                            <p className="text-sm text-gray-500">Panel Kontrol Petugas</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{userInfo.email}</span>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">👮 {userInfo.role}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Selamat Datang, Petugas!</h2>
                    <p className="text-gray-600">Email: {userInfo.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Anda memiliki akses untuk mengelola pedagang dan monitoring lapak
                    </p>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {menuItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer">
                            <div className="text-center">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Test API Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Test API Petugas</h3>
                    <button
                        onClick={testPetugasAPI}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Test Petugas API"}
                    </button>

                    {data && (
                        <div className="mt-4 bg-gray-100 p-4 rounded">
                            <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {/* Logout */}
                <div className="bg-white rounded-lg shadow p-6">
                    <LogoutButton />
                </div>
            </div>
        </main>
    )
}
