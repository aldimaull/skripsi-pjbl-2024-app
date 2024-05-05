import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "../UserAccountNav";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center mb-4">
      <h2 className="text-3xl tracking-tight">
        <span className="font-black">Project</span>ic
      </h2>
      {session?.user ? <UserAccountNav /> : null}
    </header>
  );
};

export default Header;
