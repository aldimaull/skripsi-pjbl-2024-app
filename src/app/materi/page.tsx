import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Hello from "@/app/content/hello.mdx";
import NoSession from "@/components/error/NoSession";

const Materi = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <Hello />;
  }
  return <NoSession />;
};

export default Materi;
