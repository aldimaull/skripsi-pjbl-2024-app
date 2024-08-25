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

const Project = async () => {
  const cardTitle: string = "Project";
  const project = await db.projectList.findMany();
  const session = await getServerSession(authOptions);
  const user: number = Number(session?.user.id);
  const userProject = await db.tookProject.findFirst({
    where: {
      userId: user,
    },
  });

  const isTook = userProject ? true : false;

  return (
    <>
      {project.map((project, index) => (
        <Card
          key={index}
          className={`bg-secondary flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full`}
        >
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.content}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col items-start text-xs md:text-sm space-y-2">
            Tenggat waktu: <br />{" "}
            <strong className="text-primary">
              {project.deadline.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>
            <Button variant="outline" size="md" disabled={isTook}>
              <Link href={`\\project\\${project.id}`} aria-disabled={isTook}>
                Lihat Project
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default Project;
