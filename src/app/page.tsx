import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center mt-10 mb-4">
        Transformasi Pembelajaran dengan <br/><span className="text-primary">Mobile Project Based Learning</span>.
      </h1>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight text-center my-8">
        Pembelajaran Aktif dan Interaktif <br/>di Genggaman Anda.
      </h1>
      <Button>
        <Link href="/login">Mulai</Link>
      </Button>
    </>
  );
}
