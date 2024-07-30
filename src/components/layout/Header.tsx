"use client";

import { useSession } from "next-auth/react";
import UserAccountNav from "../UserAccountNav";
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center mb-4">
      <Link href="/">
        <p className="md:text-3xl sm:text-2xl text-xl font-black font-serif tracking-wide">
          <span className="text-primary">Project</span>ful
        </p>
      </Link>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        {session?.user ? <UserAccountNav /> : null}
      </div>
    </header>
  );
};

export default Header;
