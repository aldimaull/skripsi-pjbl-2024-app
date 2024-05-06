import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="text-xl font-bold">Judul</h1>
      <Button>
        <Link href="/login">Mulai</Link>
      </Button>
    </>
  );
}
