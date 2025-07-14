"use client"

import { useState, useEffect } from "react"
import LogoutButton from "@/components/LogoutButton"

export default function AdminPage() {
    const [email, setEmail] = useState("")

    useEffect(() => {
        const savedEmail = localStorage.getItem("email")
        if (savedEmail) setEmail(savedEmail)
    }, [])

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Selamat Datang Admin</h1>
            <p className="mt-2">Email: {email}</p>
            <LogoutButton />
        </main>
    )
}
