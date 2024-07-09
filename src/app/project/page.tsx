import React from "react";
import { ListProject } from "@/utils/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NoSession from "@/components/error/NoSession";

const Project = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <>
        <h1 className="mb-2 lg:mb-4">Daftar Project Anda</h1>
        <div className="lg:grid grid-cols-2 lg:gap-4">
          {ListProject.map((project, index) => (
            <div
              key={index}
              className="my-4 p-4 lg:my-0 bg-secondary rounded-md space-y-2"
            >
              <h2>{project.namaProject}</h2>
              <p>{project.deskripsi}</p>
              <div>
                <Link href={project.link}>
                  <Button>Lihat Project</Button>
                </Link>
                <p>Tenggat waktu: {project.tenggat?.toString()}</p>
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
