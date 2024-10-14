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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


type Assessment = {
    id: number;
    title: string;
    description: string;
    soal: {
      pertanyaan: string;
      jawaban: {
				options: {
					label: string;
					value: string;
				}[];
				correctAnswer: string;
			};
    }[];
};

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
	soal: z.array(
    z.object({
      pertanyaan: z.string().min(5, {
        message: "Pertanyaan must be at least 5 characters.",
      }),
      jawaban: z.object({
        options: z.array(
          z.object({
            label: z.string().min(1, {
              message: "Option label must be at least 1 character.",
            }),
            value: z.string().min(1, {
              message: "Option value must be at least 1 character.",
            }),
          })
        ),
        correctAnswer: z.string().min(1, {
          message: "Correct answer must be at least 1 character.",
        }),
      }),
    })
  ),
});

export function AssessmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				title: "",
				description: "",
				soal: [
					{
						pertanyaan: "",
						jawaban: {
							options: [
								{
									label: "",
									value: ""
								}
							],
							correctAnswer: "",
						},
					},
				],
			},
	});

  const { register, control, handleSubmit, watch } = form;
  const soal = watch("soal");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function addSoal() {
		form.setValue("soal", [
			...soal,
			{
				pertanyaan: "",
				jawaban: {
					options: [{ label: "", value: "" }],
        	        correctAnswer: "",
				},
			},
		]);
	}

	function addOption(index: number) {
		const newOption = {
			label: "",
			value: "",
		};
		form.setValue(`soal.${index}.jawaban.options`, [
			...soal[index].jawaban.options,
			newOption,
		]);
	}

  function removeSoal(index: number) {
    form.setValue("soal",soal.filter((_, i) => i !== index));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="p-4 border border-accent rounded-lg">
              <FormLabel>Judul Assessment</FormLabel>
              <FormControl>
                <Input placeholder="Masukan nama untuk judul assessment" {...field} />
              </FormControl>
              <FormDescription>
                Buat judul assessment-nya.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="p-4 border border-accent rounded-lg">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {soal.map((_, index) => (
					<div key={index}>
						<FormField
						control={form.control}
						name={`soal.${index}.pertanyaan`}
						render={({ field }) => (
							<FormItem className="p-4 border-s border-t border-e border-accent rounded-t-lg">
								<FormLabel>Pertanyaan {index + 1}</FormLabel>
								<FormControl>
									<Input placeholder="Pertanyaan" {...field} />
								</FormControl>
								<FormDescription>
									Buat pertanyaan-nya.
								</FormDescription>
								<FormMessage />
							</FormItem>
					)}
					/>
					<FormField
					control={form.control}
					name={`soal.${index}.jawaban`}
					render={({ field }) => (
						<FormItem className="p-4 border-s border-b border-e border-accent rounded-b-lg">
							<FormLabel>Jawaban {index + 1}</FormLabel>
							<FormControl>
								<RadioGroup {...field} value={soal[index].jawaban.correctAnswer} onChange={field.onChange}>
									{soal[index].jawaban.options.map((option, optionIndex) => (
										<FormItem
											className="flex items-center space-x-3 space-y-0"
											key={index}
										>
											<FormControl>
												<RadioGroupItem key={optionIndex} value={option.value}/>
											</FormControl>
											<FormLabel className="text-base">
												<input
                      	                        type="text"
												value={option.label}
												onChange={(e) =>form.setValue(`soal.${index}.jawaban.options.${optionIndex}.label`, e.target.value)}
												/>
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
								</FormControl>
								<Button type="button" onClick={() => addOption(index)}>
									Tambah Opsi
								</Button>
							<FormDescription>
								Pilih jawaban yang benar.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
					/>
					<Button className="mt-2" type="button" onClick={() => removeSoal(index)}>
						Hapus Soal
					</Button>
				</div>
				))}
				<Button className="mr-2" type="button" onClick={addSoal}>
					Tambah Soal
				</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
