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
import { PlusCircle } from "@phosphor-icons/react/dist/ssr";

interface Props {
  title: string;
  children: ReactNode;
  link: string;
}

const classes =
  "flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full";

export const Materi = async () => {
  const title = "Tambah Materi";
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
  const cardTitle: string = "Tambah Project";
  const project = await db.projectList.findMany();

  return (
    <CardDashboard title={cardTitle}>
      {project.map((project, index) => (
        <Card key={index} className={`bg-secondary ${classes}`}>
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

export const Assessment = async () => {
  const cardTitle: string = "Tambah Assessment";
  const assessment = await db.assessment.findMany();
  const link = "/guru/assessment/create";

  return (
    <CardDashboard title={cardTitle} link={link}>
      {assessment.map((assessment, index) => (
        <Card key={index} className={`bg-secondary ${classes}`}>
          <CardHeader>
            <CardTitle>{assessment.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {assessment.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col items-start text-xs md:text-sm space-y-2">
            <Link href={`\\assessment\\${assessment.id}`}>
              <Button variant="outline" size="md">
                Kerjakan
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </CardDashboard>
  );
};

const CardDashboard = ({ title, children, link }: Props) => {
  return (
    <div className="my-4">
      <div className="flex space-x-2">
        <h2 className="font-serif text-primary tracking-wide">{title}</h2>
        <Link href={`${link}`}>
          <Button variant="outline" size="icon">
            <PlusCircle size={32} />
          </Button>
        </Link>
      </div>
      <div className="flex overflow-x-auto justify-between space-x-2">
        {children}
      </div>
    </div>
  );
};
