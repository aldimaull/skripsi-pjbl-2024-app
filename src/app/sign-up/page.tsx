import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Form from "@/components/form/SignUpForm";

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <h2 className="text-xl font-bold">Daftar Akun</h2>
        <Form />
      </main>
      <Footer />
    </>
  );
}
