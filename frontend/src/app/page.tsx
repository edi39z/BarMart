"use client"

import { useState } from "react"
import LogoutButton from "@/components/LogoutButton"

export default function AdminPage() {
  const [data, setData] = useState<Record<string, any> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchSecret = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("❌ Token tidak ditemukan")
      return
    }

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch("http://localhost:4000/api/secret", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const errData = await res.text()
        throw new Error(errData || "Terjadi kesalahan saat mengambil data")
      }

      const result = await res.json()
      setData(result)
    } catch (err: any) {
      console.error("❌ Error:", err)
      setError(err.message || "Gagal fetch data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      <button
        onClick={fetchSecret}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Memuat..." : "🔐 Ambil Data Rahasia"}
      </button>

      {data && (
        <pre className="mt-4 p-4 bg-gray-100 border rounded text-sm whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <LogoutButton />
    </main>
  )
}
