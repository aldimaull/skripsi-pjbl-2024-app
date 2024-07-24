import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import NoSession from "@/components/error/NoSession";

const Project = async () => {
  const session = await getServerSession(authOptions);
  const projectList = await db.projectList.findMany();

  if (session?.user) {
    return (
      <>
        <h1 className="mb-2 lg:mb-4">Daftar Project Anda</h1>
        <div className="lg:grid grid-cols-2 lg:gap-4">
          {projectList.map((project, index) => (
            <div
              key={index}
              className="my-4 p-4 lg:my-0 bg-secondary rounded-md space-y-2"
            >
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div>
                <Link href={`/project/${project.id}`}>
                  <Button>Lihat Project</Button>
                </Link>
                <p>Tenggat waktu: {project.deadline.toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  return <NoSession />;
};

export default Project;
