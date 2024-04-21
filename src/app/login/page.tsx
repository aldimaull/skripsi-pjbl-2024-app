import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";

// implement user login auth, connect to database with prisma
// import { useState } from "react";
// import { PrismaClient } from "@prisma/client";
// import { useRouter } from "next/router";

// const prisma = new PrismaClient();

// async function loginUser(username: string, password: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       username: username,
//     },
//   });

//   if (user && user.password === password) {
//     return user;
//   } else {
//     throw new Error("Invalid username or password");
//   }
// }

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const user = await loginUser(username, password);
//       // Here you can set the user to your state and redirect to the home page
//       router.push("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     // ... rest of your code
//   );
// }

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <h2 className="text-xl font-bold">Login</h2>
        <form action="submit" method="post" className="my-4 space-y-2">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Masukkan Username Anda" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="Masukkan Password Anda"
          />
          <Button type="submit">Login</Button>
        </form>
        <Button>Register</Button>
      </main>
      <Footer />
    </>
  );
}
