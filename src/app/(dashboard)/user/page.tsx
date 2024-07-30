import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import {
  Materi,
  Project,
  Nilai,
  TookProject,
} from "@/components/card/CardDashboard";
import NoSession from "@/components/error/NoSession";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <>
        <h1>Dashboard</h1>
        <h2>
          Halo, selamat datang kembali{" "}
          <span className="text-primary font-bold">{session?.user.name}</span>!
        </h2>
        <Nilai />
        <TookProject />
        <Project />
        <Materi />
      </>
    );
  }
  return <NoSession />;
};

export default page;
