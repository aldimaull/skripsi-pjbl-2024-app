import React from "react";
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
import ButtonBack from "@/components/ui/ButtonBack";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function DialogDemo({
  jawaban,
  pertanyaan,
}: {
  jawaban: string[];
  pertanyaan: any;
}) {
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
              {pertanyaan.map((question: any, index: number) => (
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
  const session = await getServerSession(authOptions);
  const user: number = Number(session?.user.id);
  const responses = await db.response.findMany({
    where: {
      userId: user,
    },
    include: {
      question: true,
    },
  });
  const abc = await db.nilai.findMany({
    where: {
      userId: user,
    },
    include: {
      assessment: true,
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Assessment</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Hasil</TableHead>
          <TableHead>Lihat Jawaban</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {abc.map((abcs, index) => {
          const filteredResponses = responses.filter(
            (response) => response.question.assessmentId === abcs.assessmentId
          );
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{abcs.assessment.title}</TableCell>
              <TableCell>{abcs.assessment.category}</TableCell>
              <TableCell>{abcs.nilaiAssessment}</TableCell>
              <TableCell>
                <DialogDemo
                  jawaban={filteredResponses.map(
                    (response) => response.selectedOption
                  )}
                  pertanyaan={filteredResponses.map(
                    (response) => response.question
                  )}
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
      <h1 className="font-serif tracking-wide">Nilai</h1>
      <ButtonBack />
      <TableNilai />
    </div>
  );
};

export default page;
