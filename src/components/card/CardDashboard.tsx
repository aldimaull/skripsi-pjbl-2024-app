import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
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
import { slugify } from "@/lib/utils";

interface Props {
  title: string;
  children: ReactNode;
}

const classes =
  "flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full";

export const Nilai = () => {
  const title = "Nilai";
  const cardTitle = "Project yang telah diselesaikan:";

  return (
    <CardDashboard title={title}>
      <Card className="my-2 bg-secondary">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-right text-3xl font-black">
          1 / <span className="text-primary">4</span>
        </CardContent>
      </Card>
    </CardDashboard>
  );
};

export const TookProject = async () => {
  const cardTitle: string = "Project yang Sedang Dikerjakan";
  const session = await getServerSession(authOptions);
  const user: number = Number(session?.user.id);
  const projects = await db.project.findMany({
    where: {
      userId: user,
    },
  });

  return (
    <CardDashboard title={cardTitle}>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <Card key={index} className={`bg-secondary ${classes}`}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
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
                href={`\\project\\${project.userId}\\${slugify(project.name)}`}
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
    </CardDashboard>
  );
};

export const Materi = async () => {
  const title = "Materi";
  const materi = await db.materiList.findMany();

  return (
    <CardDashboard title={title}>
      {materi.map((materi, index) => (
        <Card key={index} className={`bg-secondary ${classes}`}>
          <CardHeader>
            <CardTitle>{materi.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {materi.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/materi/${materi.id}`}>
              <Button variant="outline" size="md">
                Lihat Materi
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </CardDashboard>
  );
};

export const Project = async () => {
  const cardTitle: string = "Project";
  const project = await db.projectList.findMany();

  return (
    <CardDashboard title={cardTitle}>
      {project.map((project, index) => (
        <Card key={index} className={`bg-secondary ${classes}`}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
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
            <Link href={`\\project\\${project.id}`}>
              <Button variant="outline" size="md">
                Lihat Project
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </CardDashboard>
  );
};

const CardDashboard = ({ title, children }: Props) => {
  return (
    <div className="my-4">
      <h2 className="font-bold text-primary">{title}</h2>
      <div className="flex overflow-x-auto justify-between space-x-2">
        {children}
      </div>
    </div>
  );
};
