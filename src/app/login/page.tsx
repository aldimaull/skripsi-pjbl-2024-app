"use client";
import Form from "@/components/form/SignInForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
      <h2 className="text-xl font-serif tracking-wide mb-2">Login</h2>
      <Form />
      <p className="mt-2">
        Jika belum punya akun, silakan{" "}
        <Link
          href="/sign-up"
          className="font-bold underline underline-offset-4"
        >
          Daftar disini
        </Link>
      </p>
    </>
  );
}
