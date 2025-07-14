import { prisma } from "@/lib/prisma"
import { AuthUser } from "./types"

export async function findUserByEmail(email: string): Promise<AuthUser | null> {
    // 🔍 Cek di tabel Admin
    const admin = await prisma.admin.findUnique({
        where: { email },
    })
    if (admin) {
        return {
            id: admin.uuid,
            email: admin.email,
            password: admin.password,
            role: "admin",
        }
    }

    // 🔍 Cek di tabel Petugas
    const petugas = await prisma.petugas.findUnique({
        where: { email },
    })
    if (petugas) {
        return {
            id: petugas.id,
            email: petugas.email,
            password: petugas.password,
            role: "petugas",
        }
    }

    // 🔍 Cek di tabel Pedagang
    const pedagang = await prisma.pedagang.findUnique({
        where: { email },
    })
    if (pedagang) {
        return {
            id: pedagang.id,
            email: pedagang.email,
            password: pedagang.password,
            role: "pedagang",
        }
    }

    // ❌ Tidak ditemukan
    return null
}
