import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { Materi, Project, Nilai } from "@/components/card/CardDashboard";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <>
        <main>
          <h1>Dashboard</h1>
          <h2>
            Halo, selamat datang kembali{" "}
            <span className="text-primary font-bold">
              {session?.user.username}
            </span>
            !
          </h2>
          <Nilai />
          <Materi />
          <Project />
        </main>
      </>
    );
  }
  return <div>Silakan login terlebih dahulu</div>;
};

export default page;
