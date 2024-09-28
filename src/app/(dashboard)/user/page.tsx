import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Pretest from "@/components/DashboardComponents/Pretest";
import Posttest from "@/components/DashboardComponents/Posttest";
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
        <CardDashboard title="💯 Nilai">
          <Nilai />
        </CardDashboard>
        <CardDashboard title="☑️ Pre Test">
          <Pretest />
        </CardDashboard>
        <CardDashboard title="📚 Project dan Materi">
          <Project />
        </CardDashboard>
        <CardDashboard title="📑 Project yang Sedang Dikerjakan">
          <TookProject />
        </CardDashboard>
        <CardDashboard title="✅ Post Test">
          <Posttest />
        </CardDashboard>
      </>
    );
  }
  return <NoSession />;
};

export default page;
