"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode" 

type DecodedToken = {
    email: string
    image?: string
}

export default function HomePage() {
    const [user, setUser] = useState<DecodedToken | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token)
                setUser(decoded)
            } catch (err) {
                console.error("Token tidak valid:", err)
            }
        }
    }, [])

    return (
        <main className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Selamat Datang</h1>

            {user ? (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg">Email: {user.email}</p>
                    {user.image && (
                        <img
                            src={user.image}
                            alt="Foto profil"
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Anda belum login.</p>
            )}
        </main>
    )
}
