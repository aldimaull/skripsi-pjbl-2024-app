import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main>
        <h2 className="text-xl font-bold">Judul</h2>
        <Link href="/login">Mulai</Link>
      </main>
    </>
  );
}
