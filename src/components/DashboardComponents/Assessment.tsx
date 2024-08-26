import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Assessment = async () => {
  const assessment = await db.assessment.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const session = await getServerSession(authOptions);
  const user: number = Number(session?.user.id);
  const userProject = await db.tookProject.findFirst({
    where: {
      userId: user,
    },
  });
  const nilai = await db.nilai.findMany({
    where: {
      userId: user,
    },
  });

  return (
    <>
      <>
        {assessment.map((assessment, index) => {
          let isSubmitted = nilai.some(
            (nilaiItem) => nilaiItem.userId === user
          );

          if (userProject?.status === "FINISHED") {
            isSubmitted = nilai.length > 0;
          } else if (userProject?.status === "SUBMITTED") {
            isSubmitted = true;
          } else if (!userProject) {
            isSubmitted = true;
          }
          return (
            <Card
              key={index}
              className={`bg-secondary flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full`}
            >
              <CardHeader>
                <CardTitle>{assessment.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {assessment.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex-col items-start text-xs md:text-sm space-y-2">
                <Button variant="outline" size="md" disabled={isSubmitted}>
                  <Link href={`\\assessment\\${assessment.id}`}>Kerjakan</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </>
    </>
  );
};

export default Assessment;
