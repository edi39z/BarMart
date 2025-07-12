// frontend/src/lib/prisma.ts

import { PrismaClient } from "@prisma/client"

// Buat variabel global agar Prisma tidak inisialisasi ulang saat hot-reload (di dev mode)
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Buat koneksi Prisma 1x saja
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : [],
    })

// Simpan ke globalThis agar tidak di-recreate saat Next.js reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
