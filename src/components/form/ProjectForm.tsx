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
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "@radix-ui/react-icons";

import * as React from "react";
import { addDays, format, subDays } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { slugify } from "@/lib/utils";

interface ProjectFormProps {
  namaProject: string;
  userId: { user: { name: string; id: string } };
  idProject: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama terlalu pendek, minimal 3 karakter" })
    .max(50, { message: "Nama terlalu panjang, maksimal 50 karakter" }),
  deadline: z.object({
    from: z.date().refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to start of the day
        return date >= today;
      },
      {
        message: "Start date must be in the future",
      }
    ),
    to: z.date().refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to start of the day
        return date > today;
      },
      {
        message: "End date must be after today",
      }
    ),
  }),
  user: z
    .string()
    .min(1, { message: "Nama terlalu pendek, minimal 3 karakter" })
    .max(50, { message: "Nama terlalu panjang, maksimal 50 karakter" }),
});

const ProjectForm: React.FC<ProjectFormProps> = ({
  namaProject,
  userId,
  idProject,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        deadlineFrom: values.deadline.from,
        deadlineTo: values.deadline.to,
        user: values.user,
      }),
    });

    const data = await response.json();

    if (data?.status === 409) {
      toast({
        title: "Error",
        description: "Anda sudah mengambil Project",
        variant: "destructive",
      });
    } else if (data?.status === 201) {
      toast({
        title: "Success",
        description: "Project berhasil dibuat",
        variant: "default",
      });
      router.push(`\\project\\${userId.user.id}\\${slugify(namaProject)}`);
    } else {
      toast({
        title: "Error",
        description: data.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  };

  const date = new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: namaProject,
      deadline: {
        from: new Date(date.setDate(date.getDate())),
        to: new Date(date.setDate(date.getDate() + 7)),
      },
      user: userId.user.id,
    },
  });

  const today = new Date();
  const yesterday = subDays(today, 1);
  const twoWeeksFromNow = addDays(today, 14);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pb-80">
        <div className="flex space-x-0 flex-col lg:flex-row lg:justify-start lg:space-x-2 space-y-2 lg:space-y-0">
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
                <FormLabel>ID User</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={userId.user.id}
                    placeholder={userId.user.name}
                    disabled
                  />
                </FormControl>
                <FormDescription>ID User</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Pengerjaan</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[300px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={(date) =>
                          date < yesterday || date > twoWeeksFromNow
                        }
                      />
                    </PopoverContent>
                  </Popover>
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
