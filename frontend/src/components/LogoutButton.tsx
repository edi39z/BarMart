"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = () => {
        console.log("🔒 Logout dijalankan")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        router.replace("/login")
    }

    return (
        <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
            Logout
        </button>
    )
}
