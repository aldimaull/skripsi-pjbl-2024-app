"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ZodNumberDef } from "zod";
import ButtonBack from "@/components/ui/ButtonBack";

type Response = {
  id: number;
  questionId: number;
  userId: number;
  user: {
    id: number;
    username: string;
    password: string;
    name: string;
  };
  selectedOption: string;
};

type Nilai = {
  assessment: {
    id: number;
    title: string;
    description: string;
  };
  id: number;
  assessmentId: number;
  userId: number;
  nilaiAssessment: number;
};

type Questions = {
  id: number;
  content: string;
  assessmentId: number;
  options: string[];
  kunci: string;
};

async function DialogDemo({
  jawaban,
  index,
}: {
  jawaban: string[];
  index: number;
}) {
  const [questions, setQuestions] = useState<Questions[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/questions?id=${index}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result.data);
        setQuestions(result.data);
      } catch (error) {
        console.error("gagal");
      }
    };
    fetchData();
  }, [index]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Lihat Hasil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Jawaban</DialogTitle>
          <DialogDescription>
            <ul>
              {jawaban.map((jawaban, index) => (
                <li key={index}>
                  <span>{index + 1}. </span>
                  {jawaban}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold">Pertanyaan dan Kunci Jawaban</p>
            <ul>
              {questions.map((question: Questions, index: number) => (
                <li key={index} className="my-2">
                  <span>{index + 1}. </span>
                  {question.content}
                  <p className="mt-2 font-bold">Jawaban</p>
                  <p>➡️ {question.kunci}</p>
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

async function TableNilai() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [groupedResponses, setGroupedResponses] = useState<
    Record<number, Response[]>
  >({});
  const [assessment, setAssessment] = useState<Nilai[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/responses/`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setResponses(result.data);

        const grouped = result.data.reduce(
          (acc: Record<number, Response[]>, current: Response) => {
            if (!acc[current.userId]) {
              acc[current.userId] = [];
            }
            acc[current.userId].push(current);
            return acc;
          },
          {}
        );

        setGroupedResponses(grouped);
      } catch (error) {
        console.error("gagal");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/nilai/`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result.data);
        setAssessment(result.data);
      } catch (error) {
        console.error("gagal");
      }
    };
    fetchData();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Assessment</TableHead>
          <TableHead>Hasil</TableHead>
          <TableHead>Lihat Jawaban</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(groupedResponses).map(([userId, responses], index) => {
          const userAssessment = assessment.find(
            (a) => a.userId === parseInt(userId)
          );
          return (
            <TableRow key={userId}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{userAssessment?.assessment.title || "N/A"}</TableCell>
              <TableCell>{userAssessment?.nilaiAssessment}</TableCell>
              <TableCell>
                <DialogDemo
                  jawaban={responses.map((response) => response.selectedOption)}
                  index={userAssessment?.assessmentId ?? 0}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const page = () => {
  return (
    <div>
      <ButtonBack />
      <h1 className="font-serif tracking-wide">Nilai</h1>
      <TableNilai />
    </div>
  );
};

export default page;
