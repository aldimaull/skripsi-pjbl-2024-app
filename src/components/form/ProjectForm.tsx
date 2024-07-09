"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/calendar/ProjectCalendar";
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

interface ProjectFormProps {
  namaProject: string;
  userId: { user: { name: string } };
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama terlalu pendek, minimal 3 karakter" })
    .max(50, { message: "Nama terlalu panjang, maksimal 50 karakter" }),
  description: z.string(),
  // .min(3, { message: "Nama terlalu pendek, minimal 3 karakter" })
  // .max(50, { message: "Nama terlalu panjang, maksimal 50 karakter" }),
  user: z
    .string()
    .min(3, { message: "Nama terlalu pendek, minimal 3 karakter" })
    .max(50, { message: "Nama terlalu panjang, maksimal 50 karakter" }),
});

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  // const router = useRouter();
  const response = await fetch("/api/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: values.name,
      description: values.description,
      user: values.user,
    }),
  });
  if (response.ok) {
    console.log(response);
  } else {
    console.log(response);
  }
};

const ProjectForm: React.FC<ProjectFormProps> = ({ namaProject, userId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: namaProject,
      description: "",
      user: userId.user.name,
    },
  });
  console.log(namaProject);
  console.log(userId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Project</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={namaProject}
                    placeholder={namaProject}
                    disabled
                  />
                </FormControl>
                <FormDescription>Nama Project</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={userId.user.name}
                    placeholder={userId.user.name}
                    disabled
                  />
                </FormControl>
                <FormDescription>Nama</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Pengerjaan</FormLabel>
                <FormControl>
                  <DatePickerWithRange />
                </FormControl>
                <FormDescription>Waktu Pengerjaan</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Mulai Project!</Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
