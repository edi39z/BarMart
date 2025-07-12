"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [user, setUser] = useState<{ email: string; image?: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log("🚀 useEffect dijalankan")

    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    const image = localStorage.getItem("image")

    console.log("📦 Data dari localStorage:")
    console.log("token:", token)
    console.log("email:", email)
    console.log("image:", image)

    if (!token) {
      console.log("⛔ Token tidak ditemukan, redirect ke /login")
      router.push("/login")
    } else {
      setUser({ email: email || "", image: image || "" })
      console.log("✅ User diset:", { email: email || "", image: image || "" })
    }
  }, [])

  const handleLogout = () => {
    console.log("🚪 Logout ditekan")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("image")
    setUser(null)
    router.push("/login")
  }
  const handleFetchSecret = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:4000/api/secret", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    console.log("📥 Data dari Go backend:", data)
    alert(data.message || "Gagal")
  }
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    console.log("🧑‍💻 Data user dari backend Go:", data)
  }



  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Halaman Utama</h1>

      {user ? (
        <>
          <p className="mt-4 text-lg">Email: {user.email}</p>
          {user.image && (
            <img
              src={user.image}
              alt="Foto Profil"
              className="w-24 h-24 rounded-full border mt-4"
            />
          )}
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <button onClick={handleFetchSecret} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Fetch API Go (/api/secret)
          </button>
          <button onClick={fetchUserInfo} className="bg-purple-600 text-white px-4 py-2 rounded mt-4">
            Cek Profil (/api/user)
          </button>


        </>
      ) : (
        <p className="mt-4">🔄 Memuat data user...</p>
      )}
    </main>
  )
}
