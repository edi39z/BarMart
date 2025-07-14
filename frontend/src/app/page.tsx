"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    // Jika token tidak ada → redirect ke /login
    if (!token) {
      console.log("⛔ Tidak ada token, redirect ke login")
      router.replace("/login")
      return
    }

    // Optional: validasi token expired
    try {
      const decoded: any = jwtDecode(token)
      const isExpired = decoded.exp * 1000 < Date.now()
      if (isExpired) {
        console.log("⛔ Token kadaluarsa, redirect ke login")
        localStorage.clear()
        router.replace("/login")
        return
      }
    } catch (err) {
      console.log("⛔ Token invalid:", err)
      localStorage.clear()
      router.replace("/login")
      return
    }

    setLoading(false)
  }, [router])

  if (loading) return <p className="p-6">🔄 Mengecek autentikasi...</p>

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Halaman Utama</h1>
      <p>✅ User sudah login</p>
    </main>
  )
}
