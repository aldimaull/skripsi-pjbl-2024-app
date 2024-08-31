import TableProjects from "@/components/(guru)/TableProjects";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {
  Materi,
  Project,
  Assessment,
} from "@/components/(guru)/CardDashboardGuru";
import NoSession from "@/components/error/NoSession";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <div>
        <h1 className="font-serif tracking-wide text-primary">
          Dashboard Guru
        </h1>
        <h2>
          Halo, selamat datang kembali{" "}
          <span className="nama-siswa text-primary font-bold">
            {session?.user.name}
          </span>
          !
        </h2>
        <TableProjects />
        <Project />
        <Assessment />
        <Materi />
      </div>
    );
  }
  return <NoSession />;
};

export default page;
