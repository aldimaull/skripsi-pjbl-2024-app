import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-10 mb-4">
        Transformasi Pembelajaran dengan <br />
        <span className="text-primary">Mobile Project Based Learning</span>.
      </h1>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight my-8">
        Pembelajaran Aktif <br />
        Dimana Saja, Kapan Saja
      </h1>
      <div className="flex space-x-4">
        <Link href="/login">
          <Button>Mulai!</Button>
        </Link>
        <Link href="https://github.com/aldimaull/skripsi-pjbl-2024-app">
          <Button variant="outline">
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> Github Repo
          </Button>
        </Link>
      </div>
    </>
  );
}
