"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

export default function AdminDashboard() {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({ email: "", role: "" })
    const [stats, setStats] = useState({
        totalPetugas: 0,
        totalPedagang: 0,
        totalTransaksi: 0,
    })

    useEffect(() => {
        const email = localStorage.getItem("email") || ""
        const role = localStorage.getItem("role") || ""
        setUserInfo({ email, role })

        // Simulasi data statistik
        setStats({
            totalPetugas: 5,
            totalPedagang: 25,
            totalTransaksi: 150,
        })
    }, [])

    const menuItems = [
        {
            title: "Kelola Petugas",
            description: "CRUD data petugas",
            icon: "👮",
            path: "/dashboard/admin/petugas",
            color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
        },
        {
            title: "Daftar Admin/Petugas",
            description: "Tambah admin atau petugas baru",
            icon: "➕",
            path: "/dashboard/admin/register",
            color: "bg-green-100 hover:bg-green-200 text-green-800",
        },
        {
            title: "Kelola Pedagang",
            description: "Lihat dan kelola pedagang",
            icon: "🛒",
            path: "/dashboard/admin/pedagang",
            color: "bg-purple-100 hover:bg-purple-200 text-purple-800",
        },
        {
            title: "Laporan Sistem",
            description: "Lihat laporan dan statistik",
            icon: "📊",
            path: "/dashboard/admin/reports",
            color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
        },
        {
            title: "Pengaturan Sistem",
            description: "Konfigurasi sistem",
            icon: "⚙️",
            path: "/dashboard/admin/settings",
            color: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        },
        {
            title: "Test API",
            description: "Test koneksi backend",
            icon: "🔧",
            path: "/dashboard/admin/test",
            color: "bg-red-100 hover:bg-red-200 text-red-800",
        },
    ]

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-500">Panel Kontrol Administrator</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{userInfo.email}</span>
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">👑 {userInfo.role}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-2xl">👮</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Petugas</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalPetugas}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-2xl">🛒</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Pedagang</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalPedagang}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalTransaksi}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => router.push(item.path)}
                            className={`${item.color} rounded-lg shadow p-6 cursor-pointer transition-all duration-200 hover:shadow-md`}
                        >
                            <div className="flex items-center mb-3">
                                <span className="text-2xl mr-3">{item.icon}</span>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>
                            <p className="text-sm opacity-80">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => router.push("/dashboard/admin/register")}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            ➕ Tambah Petugas
                        </button>
                        <button
                            onClick={() => router.push("/dashboard/admin/petugas")}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            👮 Lihat Petugas
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                            📊 Export Data
                        </button>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </main>
    )
}
