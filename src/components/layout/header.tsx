import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "../UserAccountNav";
import DarkModeToggle from "@/components/DarkModeToggle";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center mb-4">
      <h2 className="text-3xl tracking-tight">
        <span className="font-black">Project</span>ic
      </h2>
      <div className="flex items-center gap-4">
        <DarkModeToggle />
        {session?.user ? <UserAccountNav /> : null}
      </div>
    </header>
  );
};

export default Header;
