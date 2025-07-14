import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🔄 Mulai seeding user...")

    const hashed = await bcrypt.hash("admin123", 10)

    // Admin
    await prisma.admin.upsert({
        where: { email: "admin@gmail.com" },
        update: {},
        create: {
            email: "admin@gmail.com",
            password: hashed,
            HP: "081234567890",
        },
    })

    // Petugas
    await prisma.petugas.upsert({
        where: { email: "petugas@gmail.com" },
        update: {},
        create: {
            email: "petugas@gmail.com",
            password: hashed,
            nama: "Petugas 1",
            HP: "082222222222",
        },
    })

    // Pedagang
    await prisma.pedagang.upsert({
        where: { email: "pedagang@gmail.com" },
        update: {},
        create: {
            email: "pedagang@gmail.com",
            password: hashed,
            nama: "Pedagang 1",
            HP: "083333333333",
            jenis_dagangan: "Sayuran",
            id_lapak: "1", // ← Ubah jadi string!
        },

    })

    console.log("✅ Selesai seeding admin, petugas, dan pedagang")
}

main()
    .catch((e) => {
        console.error("❌ Error saat seeding:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
