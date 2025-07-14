// frontend/src/app/unauthorized/page.tsx
export default function UnauthorizedPage() {
    return (
        <main className="p-6 text-center">
            <h1 className="text-3xl font-bold text-red-600">⛔ Akses Ditolak</h1>
            <p className="mt-4 text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        </main>
    )
}
