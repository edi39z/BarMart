"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const router = useRouter()
    const [user, setUser] = useState<{ email: string; role: string } | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem("email")
        const role = localStorage.getItem("role")

        if (email && role) {
            setUser({ email, role })
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        setUser(null)
        router.push("/")
        window.location.reload()
    }

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div onClick={() => router.push("/")} className="cursor-pointer">
                        <h1 className="text-xl font-bold text-blue-600">BarMart</h1>
                        <p className="text-xs text-gray-500">Pasar Digital</p>
                    </div>

                    {/* Navigation Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => router.push("/")} className="text-gray-700 hover:text-blue-600 transition">
                            Beranda
                        </button>
                        <button className="text-gray-700 hover:text-blue-600 transition">Produk</button>
                        <button className="text-gray-700 hover:text-blue-600 transition">Tentang</button>
                        <button className="text-gray-700 hover:text-blue-600 transition">Kontak</button>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">{user.email.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <span className="hidden md:block text-sm">{user.email}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            <p className="font-medium">{user.email}</p>
                                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                        </div>

                                        {user.role === "pedagang" && (
                                            <>
                                                <button
                                                    onClick={() => router.push("/profile")}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    👤 Profile
                                                </button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    📦 Produk Saya
                                                </button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    📊 Penjualan
                                                </button>
                                            </>
                                        )}

                                        {(user.role === "admin" || user.role === "petugas") && (
                                            <button
                                                onClick={() => router.push("/dashboard")}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                🏠 Dashboard
                                            </button>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <button onClick={() => router.push("/login")} className="text-gray-700 hover:text-blue-600 transition">
                                    Masuk
                                </button>
                                <button
                                    onClick={() => router.push("/register")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    Daftar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
