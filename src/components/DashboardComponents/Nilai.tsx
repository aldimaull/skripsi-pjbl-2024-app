import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

const Nilai = async () => {
  const session = await getServerSession(authOptions);
  const user: number = Number(session?.user.id);
  const projects = await db.tookProject.findMany({
    where: {
      userId: user,
    },
    select: {
      status: true,
    },
  });

  const finishedProjects = projects.filter(
    (project) => project.status === "FINISHED"
  ).length;

  return (
    <div className="flex space-x-2">
      <Card className="my-2 bg-secondary">
        <CardHeader>
          <CardTitle>Project yang telah diselesaikan: </CardTitle>
        </CardHeader>
        <CardContent className="text-right text-3xl font-black">
          {finishedProjects} /{" "}
          <span className="text-primary">{projects.length}</span>
        </CardContent>
      </Card>
      <Card className="my-2 bg-secondary">
        <CardHeader>
          <CardTitle>Nilai Assessment: </CardTitle>
        </CardHeader>
        <CardContent className="text-right font-black">
          <Button variant="outline" size="md">
            <Link href="/nilai">List Nilai</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Nilai;
