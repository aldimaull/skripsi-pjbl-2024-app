import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <main>
        <h2 className="text-xl font-bold">Judul</h2>
        <Link href="/admin">Mulai</Link>
      </main>
      <h2>Client session</h2>
      <User />
      <h2>Server session</h2>
      {JSON.stringify(session)}
    </>
  );
}
