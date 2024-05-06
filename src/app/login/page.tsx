"use client";
import Form from "@/components/form/SignInForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/user");
    } else {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <>
      <h2 className="text-xl font-bold">Login</h2>
      <Form />
    </>
  );
}
