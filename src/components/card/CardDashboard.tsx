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

interface Props {
  title: string;
  children: ReactNode;
}

const classes = "lg:basis-1/2 shrink-0 my-2";

export const Nilai = () => {
  const title = "Nilai";
  const cardTitle = "Project yang telah diselesaikan:";
  const nilai = ListMateri.length;

  return (
    <CardDashboard title={title}>
      <Card className="my-2">
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
        <Link key={index} href={materi.link} className={classes}>
          <Card>
            <CardHeader>
              <CardTitle>{materi.namaMateri}</CardTitle>
              <CardDescription>{materi.deskripsi}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{materi.ringkasan}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </CardDashboard>
  );
};

export const Project = () => {
  const cardTitle: string = "Project";

  return (
    <CardDashboard title={cardTitle}>
      {ListProject.map((project, index) => (
        <Link key={index} href={project.link} className={classes}>
          <Card>
            <CardHeader>
              <CardTitle>{project.namaProject}</CardTitle>
              <CardDescription>{project.deskripsi}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{project.ringkasan}</p>
            </CardContent>
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
