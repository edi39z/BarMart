"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)
  const [products] = useState([
    {
      id: 1,
      name: "Sayur Bayam",
      price: "Rp 5.000",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Toko Sayur Segar",
    },
    {
      id: 2,
      name: "Apel Malang",
      price: "Rp 15.000",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Buah Segar",
    },
    {
      id: 3,
      name: "Daging Sapi",
      price: "Rp 120.000",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Daging Fresh",
    },
    {
      id: 4,
      name: "Ikan Lele",
      price: "Rp 25.000",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Ikan Segar",
    },
    {
      id: 5,
      name: "Telur Ayam",
      price: "Rp 28.000",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Peternakan Jaya",
    },
    {
      id: 6,
      name: "Beras Premium",
      price: "Rp 12.000",
      image: "/placeholder.svg?height=200&width=200",
      seller: "Beras Berkah",
    },
  ])

  useEffect(() => {
    const email = localStorage.getItem("email")
    const role = localStorage.getItem("role")

    if (email && role) {
      setUser({ email, role })
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Selamat Datang di BarMart</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Pasar Digital untuk Semua Kebutuhan Anda</p>
          {!user && (
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Mulai Belanja
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Jadi Pedagang
              </button>
            </div>
          )}
        </div>
      </section>

      {/* User Welcome (if logged in) */}
      {user && (
        <section className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Selamat Datang, {user.email}!</h2>
                <p className="text-gray-600 capitalize">Anda login sebagai {user.role}</p>
              </div>
              {user.role === "pedagang" && (
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    📦 Kelola Produk
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                    ➕ Tambah Produk
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Terbaru</h2>
            <p className="text-gray-600">Temukan produk segar dan berkualitas dari pedagang terpercaya</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">{product.price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BarMart</h3>
              <p className="text-gray-400 text-sm">
                Pasar digital yang menghubungkan pedagang dan pembeli dengan mudah dan aman.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategori</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sayuran</li>
                <li>Buah-buahan</li>
                <li>Daging & Ikan</li>
                <li>Sembako</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Cara Berbelanja</li>
                <li>Cara Berjualan</li>
                <li>FAQ</li>
                <li>Kontak</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 info@barmart.com</li>
                <li>📞 (021) 123-4567</li>
                <li>📍 Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 BarMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
