import Form from "@/components/form/SignUpForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <h2 className="text-xl font-serif tracking-wide mb-2">Daftar Akun</h2>
      <Form />
      <p className="mt-2">
        Jika sudah punya akun, silakan{" "}
        <Link href="/login" className="font-bold underline underline-offset-4">
          Login disini
        </Link>
      </p>
    </>
  );
}
