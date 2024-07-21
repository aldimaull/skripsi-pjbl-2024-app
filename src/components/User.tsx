"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/user"); // Redirect to dashboard if session exists
  }
};

export default User;
