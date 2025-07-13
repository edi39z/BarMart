import { prisma } from "@/lib/prisma"

type Role = "admin" | "petugas" | "pedagang"

type FoundUser = {
    id: string | number
    email: string
    password: string
    role: Role
}

export async function findUserByEmail(email: string): Promise<FoundUser | null> {
    // Coba cari di Admin
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (admin) {
        return {
            id: admin.uuid,
            email: admin.email,
            password: admin.password,
            role: "admin",
        }
    }

    // Coba cari di Petugas
    const petugas = await prisma.petugas.findUnique({ where: { email } })
    if (petugas) {
        return {
            id: petugas.id,
            email: petugas.email,
            password: petugas.password,
            role: "petugas",
        }
    }

    // Coba cari di Pedagang
    const pedagang = await prisma.pedagang.findUnique({ where: { email } })
    if (pedagang) {
        return {
            id: pedagang.id,
            email: pedagang.email,
            password: pedagang.password,
            role: "pedagang",
        }
    }

    return null
}
