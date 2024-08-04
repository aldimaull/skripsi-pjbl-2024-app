import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NoSession from "@/components/error/NoSession";
import ProjectForm from "@/components/form/ProjectForm";
import { db } from "@/lib/db";

export default async function Project({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const projects = await db.projectList.findMany({
    where: {
      id: parseInt(params.id, 10),
    },
  });

  if (session?.user) {
    return (
      <>
        <h1 className="mb-4 text-primary font-serif tracking-wide">
          Detail Project
        </h1>
        {projects.map((project, index) => (
          <div key={index} className="space-y-4 ">
            <h2 className="mb-2 font-semibold">{project.name}</h2>
            <p className="bg-secondary px-5 py-6 rounded-md">
              {project.content}
            </p>
            <ProjectForm
              idProject={project.id.toString()}
              namaProject={project.name}
              userId={session}
            />
          </div>
        ))}
      </>
    );
  }
  return <NoSession />;
}
