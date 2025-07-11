// frontend/src/app/page.tsx
import { getHelloMessage } from "@/lib/api";

export default async function HomePage() {
  const data = await getHelloMessage();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Halaman Utama</h1>
      <p className="mt-4 text-lg">{data.message}</p>
    </main>
  );
}
