"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "../ui/skeleton";
import { ButtonLoading } from "../ui/ButtonLoading";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Question = {
  id: number;
  content: string;
  assessmentId: number;
  kunci: string;
  options: string[];
  createdAt: Date;
  updateAt: Date;
};

const FormSchema = z.object({
  id: z.number(),
  answer: z.string().min(1, "You must select an option"),
});

function DialogCloseButton({ handleSubmit }: { handleSubmit: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mt-4">
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-auto">
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin untuk mengirim jawaban?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Kembali
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Questions = ({ params }: { params: { id: string } }) => {
  const [value, setValue] = useState<Question[] | []>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nilai, setNilai] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/questions?id=${params.id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setValue(data.data);
      } catch (error) {
        console.error("Failed to fetch code");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const currentQuestion = value[currentQuestionIndex];
    const savedAnswer = answers[currentQuestion?.id.toString()];
    if (savedAnswer) {
      form.setValue("answer", savedAnswer);
    } else {
      form.reset({ answer: "" });
    }
  }, [currentQuestionIndex, answers, value, form]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  const handleNext = () => {
    const currentQuestion = value[currentQuestionIndex];
    const selectedAnswer = form.getValues("answer");

    setAnswers((prevResponse) => {
      const existingAnswerIndex = Object.keys(prevResponse).findIndex(
        (key) => key === currentQuestion.id.toString()
      );
      if (existingAnswerIndex >= 0) {
        const updatedResponse = { ...prevResponse };
        updatedResponse[currentQuestion.id.toString()] = selectedAnswer;
        return updatedResponse;
      } else {
        return {
          ...prevResponse,
          [currentQuestion.id.toString()]: selectedAnswer,
        };
      }
    });

    if (currentQuestionIndex < value?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      form.reset({ answer: "" });
    }
  };

  const handlePrevious = () => {
    const currentQuestion = value[currentQuestionIndex];
    const selectedAnswer = form.getValues("answer");
    setAnswers((prevResponse) => {
      const existingAnswerIndex = Object.keys(prevResponse).findIndex(
        (key) => key === currentQuestion.id.toString()
      );
      if (existingAnswerIndex >= 0) {
        const updatedResponse = { ...prevResponse };
        updatedResponse[currentQuestion.id.toString()] = selectedAnswer;
        return updatedResponse;
      } else {
        return {
          ...prevResponse,
          [currentQuestion.id.toString()]: selectedAnswer,
        };
      }
    });

    if (currentQuestionIndex > 0) {
      const previousQuestion = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousQuestion);
      form.reset({ answer: "" });
    }
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
    const currentQuestion = value[currentQuestionIndex];
    const selectedAnswer = form.getValues("answer");

    setAnswers((prevResponse) => {
      const existingAnswerIndex = Object.keys(prevResponse).findIndex(
        (key) => key === currentQuestion.id.toString()
      );
      if (existingAnswerIndex >= 0) {
        const updatedResponse = { ...prevResponse };
        updatedResponse[currentQuestion.id.toString()] = selectedAnswer;
        return updatedResponse;
      } else {
        return {
          ...prevResponse,
          [currentQuestion.id.toString()]: selectedAnswer,
        };
      }
    });
    // form.reset();
  };

  const handleSubmit = async () => {
    const currentQuestion = value[currentQuestionIndex];
    const selectedAnswer = form.getValues("answer");

    setAnswers((prevResponse) => ({
      ...prevResponse,
      [currentQuestion.id.toString()]: selectedAnswer,
    }));

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id.toString()]: selectedAnswer,
    };

    const payload = Object.keys(updatedAnswers).map((questionId) => ({
      questionId: parseInt(questionId),
      answer: updatedAnswers[questionId],
    }));

    const isAnyAnswerEmpty = Object.values(updatedAnswers).some(
      (answer) => answer.trim() === ""
    );

    if (isAnyAnswerEmpty) {
      toast({
        title: "Error",
        description: "Masih ada soal yang belum terjawab!",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    let calculatedScore = 0;
    Object.keys(updatedAnswers).forEach((questionId) => {
      const question = value.find((q) => q.id.toString() === questionId);
      if (question && updatedAnswers[questionId] === question.kunci) {
        calculatedScore += 5;
      }
    });
    setNilai(calculatedScore);

    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses: payload,
          userId: session?.user?.id,
        }),
      });

      const responseNilai = await fetch("/api/nilai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          assessmentId: params.id,
          nilai: calculatedScore,
        }),
      });

      if (response.ok && responseNilai.ok) {
        toast({
          title: "Success",
          description: "Jawaban berhasil disubmit!",
          variant: "default",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Jawaban gagal disubmit",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi error: " + error + " saat disubmit!",
        variant: "destructive",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!value) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Form {...form}>
        {value[currentQuestionIndex] && (
          <form
            onSubmit={form.handleSubmit(
              currentQuestionIndex < value.length - 1
                ? handleNext
                : handleSubmit
            )}
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    {value[currentQuestionIndex].content}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {value[currentQuestionIndex].options.map(
                        (option, index) => (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0"
                            key={index}
                          >
                            <FormControl>
                              <RadioGroupItem
                                id={value[currentQuestionIndex].id.toString()}
                                value={option}
                              />
                            </FormControl>
                            <FormLabel className="text-base">
                              {option}
                            </FormLabel>
                          </FormItem>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2 items-center">
              {currentQuestionIndex > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="mt-4 mr-2"
                >
                  Previous
                </Button>
              )}
              {currentQuestionIndex < value.length - 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNext}
                  className="mt-4 mr-2"
                >
                  Next
                </Button>
              ) : (
                <>
                  {isSubmitting ? (
                    <ButtonLoading
                      size="default"
                      variant="default"
                      className="mt-4"
                    />
                  ) : (
                    <DialogCloseButton handleSubmit={handleSubmit} />
                  )}
                </>
              )}
            </div>
          </form>
        )}
      </Form>
      <div className="mt-4 flex space-x-2">
        {value.map((question, index) => (
          <Button
            key={index}
            onClick={() => handleQuestionClick(index)}
            className={`p-4 ${
              answers[question.id.toString()] ? "bg-green-500" : ""
            } ${!answers[question.id.toString()]} ? "bg-gray-200" : ""`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Questions;
