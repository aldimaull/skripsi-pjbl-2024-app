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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ButtonLoading } from "../ui/ButtonLoading";

const formSchema = z.object({
  username: z.string().min(8, {
    message: "Username harus terdiri dari minimal 8 karakter.",
  }),
  password: z
    .string()
    .min(8, { message: "Password harus terdiri dari minimal 8 karakter" })
    .max(20, { message: "Password harus terdiri dari maksimal 20 karakter" }),
});

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Ada masalah saat login. Silakan coba lagi.",
        variant: "destructive",
      });
    } else {
      router.push("/user");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Cth: aldimaul" {...field} />
                </FormControl>
                <FormDescription>Masukkan username Anda.</FormDescription>
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
                <FormDescription>Masukkan password Anda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <ButtonLoading size="default" variant="default" className="" />
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </Form>
  );
}
