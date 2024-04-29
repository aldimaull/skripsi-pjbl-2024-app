import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <div>Hallo, {session?.user.username}</div>;
  }
  return <div>Silakan login terlebih dahulu</div>;
};

export default page;
