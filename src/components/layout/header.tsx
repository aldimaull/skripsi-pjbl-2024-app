import { authOptions } from "@/lib/auth";
import { List } from "@phosphor-icons/react/dist/ssr/List";
import { getServerSession } from "next-auth";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import UserAccountNav from "../UserAccountNav";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-3xl tracking-tight">
        <span className="font-black">Project</span>ic
      </h1>
      {session?.user ? (
        <UserAccountNav />
      ) : (
        <Link className={buttonVariants()} href="login">
          Login
        </Link>
      )}
      <List size={32} weight="duotone" />
    </header>
  );
};

export default Header;
