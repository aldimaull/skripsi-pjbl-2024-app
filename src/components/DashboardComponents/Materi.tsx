import React, { ReactNode } from "react";
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

const Materi = async () => {
  const materi = await db.materiList.findMany();

  return (
    <>
      {materi.map((materi, index) => (
        <Card
          key={index}
          className={`bg-secondary flex flex-col justify-between lg:basis-1/2 shrink-0 my-2 max-w-full`}
        >
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
    </>
  );
};

export default Materi;
