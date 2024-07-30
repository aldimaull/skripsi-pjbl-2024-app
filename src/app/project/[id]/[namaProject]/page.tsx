import { db } from "@/lib/db";
import React from "react";
import CobaIni from "@/components/projects/coba1";

export default async function MulaiProject({
  params,
}: {
  params: { namaProject: string };
}) {
  function titleCase(str: string) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const projects = await db.projectList.findMany({
    where: {
      name: titleCase(params.namaProject),
    },
  });
  return (
    <>
      <h1 className="mb-4 text-primary font-serif tracking-wide">
        Detail Project
      </h1>
      {projects.map((project, index) => (
        <div key={index} className="space-y-4 mb-4">
          <h2 className="mb-2 font-semibold">{project.name}</h2>
          <p className="bg-secondary px-5 py-6 rounded-md">
            {project.description}
          </p>
        </div>
      ))}
      <CobaIni />
    </>
  );
}
