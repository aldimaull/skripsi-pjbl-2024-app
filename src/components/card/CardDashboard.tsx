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
import { ListMateri, ListProject } from "@/utils/data";
import { Button } from "../ui/button";

interface Props {
  title: string;
  children: ReactNode;
}

const classes =
  "flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full";

export const Nilai = () => {
  const title = "Nilai";
  const cardTitle = "Project yang telah diselesaikan:";
  const nilai = ListMateri.length;

  return (
    <CardDashboard title={title}>
      <Card className="my-2 bg-secondary">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-right text-3xl font-black">
          1 / <span className="text-primary">{nilai}</span>
        </CardContent>
      </Card>
    </CardDashboard>
  );
};

export const Materi = () => {
  const title = "Materi";

  return (
    <CardDashboard title={title}>
      {ListMateri.map((materi, index) => (
        <Card key={index} className={`bg-secondary ${classes}`}>
          <CardHeader>
            <CardTitle>{materi.namaMateri}</CardTitle>
            <CardDescription className="line-clamp-2">
              {materi.deskripsi}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={materi.link}>
              <Button variant="outline">Lihat Materi</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </CardDashboard>
  );
};

export const Project = () => {
  const cardTitle: string = "Project";

  return (
    <CardDashboard title={cardTitle}>
      {ListProject.map((project, index) => (
        <Link
          key={index}
          href={`\\project\\${project.idProject}`}
          className={classes}
        >
          <Card className="bg-secondary hover:bg-accent hover:shadow-sm hover:shadow-primary transition-all ease-in-out">
            <CardHeader>
              <CardTitle>{project.namaProject}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.deskripsi}
              </CardDescription>
            </CardHeader>
            <CardFooter>Tenggat waktu: {String(project.tenggat)}</CardFooter>
          </Card>
        </Link>
      ))}
    </CardDashboard>
  );
};

const CardDashboard = ({ title, children }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold text-primary">{title}</h3>
      <div className="flex overflow-x-auto justify-between space-x-2">
        {children}
      </div>
    </div>
  );
};
