import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Assessment from "@/components/DashboardComponents/Assessment";
import Materi from "@/components/DashboardComponents/Materi";
import Nilai from "@/components/DashboardComponents/Nilai";
import Project from "@/components/DashboardComponents/Project";
import TookProject from "@/components/DashboardComponents/TookProject";
import NoSession from "@/components/error/NoSession";
import CardDashboard from "@/components/card/CardDashboard";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <>
        <h1 className="font-serif tracking-wide">Dashboard</h1>
        <h2>
          Halo, selamat datang kembali{" "}
          <span className="nama-siswa text-primary font-bold">
            {session?.user.name}
          </span>
          !
        </h2>
        <CardDashboard title="Nilai">
          <Nilai />
        </CardDashboard>
        <CardDashboard title="Project yang Sedang Dikerjakan">
          <TookProject />
        </CardDashboard>
        <CardDashboard title="Assessment">
          <Assessment />
        </CardDashboard>
        <CardDashboard title="Project">
          <Project />
        </CardDashboard>
        <CardDashboard title="Materi">
          <Materi />
        </CardDashboard>
      </>
    );
  }
  return <NoSession />;
};

export default page;
