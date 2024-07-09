"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nama terlalu pendek, minimal 3 karakter" })
      .max(50, { message: "Nama terlalu panjang, maksimal 50 karakter" }),
    username: z
      .string()
      .min(8, {
        message: "Username harus terdiri dari minimal 8 karakter.",
      })
      .max(20, {
        message: "Username harus terdiri dari maksimal 20 karakter.",
      }),
    password: z
      .string()
      .min(8, { message: "Password harus terdiri dari minimal 8 karakter" })
      .max(20, { message: "Password harus terdiri dari maksimal 20 karakter" }),
    confirmPassword: z.string().min(8, "Password harus terisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
  });

export default function SignUpForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        username: values.username,
        password: values.password,
      }),
    });
    if (response.ok) {
      router.push("/login");
    } else {
      console.error("gagal");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Cth: Aldi Maulana" {...field} />
                </FormControl>
                <FormDescription>
                  Masukkan nama lengkap Anda.
                  <br />
                  *Nama harus berisi minimal 3 karakter.
                  <br />
                  *Nama harus berisi maksimal 20 karakter.
                  <br />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Cth: aldimaul" {...field} />
                </FormControl>
                <FormDescription>
                  Masukkan username Anda.
                  <br />
                  *Username harus berisi minimal 8 karakter.
                  <br />
                  *Username harus berisi maksimal 20 karakter.
                  <br />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Masukkan password Anda.
                  <br />
                  *Password harus berisi minimal 8 karakter.
                  <br />
                  *Password harus berisi maksimal 20 karakter.
                  <br />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Masukkan ulang password anda.
                  <br />
                  *Konfirmasi password anda.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
