import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { slugify } from "@/lib/utils";

const TookProject = async () => {
  const session = await getServerSession(authOptions);
  const user: number = Number(session?.user.id);

  const projects = await db.tookProject.findMany({
    where: {
      userId: user,
    },
    select: {
      project: {
        select: {
          name: true,
        },
      },
      userId: true,
      status: true,
      deadlineFrom: true,
      deadlineTo: true,
    },
  });

  const isSubmitted = projects.some((project) => project.status === "FINISHED");

  return (
    <>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <Card
            key={index}
            className={`${
              isSubmitted ? "bg-green-300 dark:bg-green-950" : "bg-secondary"
            } flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full`}
          >
            <CardHeader>
              <CardTitle>{project.project.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start text-xs md:text-sm space-y-2">
              Tenggat waktu: <br />{" "}
              <strong className="text-primary">
                {project.deadlineFrom.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {project.deadlineTo.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
              <Link
                href={`\\project\\${project.userId}\\${slugify(
                  project.project.name
                )}`}
              >
                <Button variant="outline" size="md">
                  Lihat Project
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>Tidak ada project yang sedang diambil</p>
      )}
    </>
  );
};

export default TookProject;
