import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NoSession from "@/components/error/NoSession";
import dynamic from "next/dynamic";
import { ListProject } from "@/utils/data";
import { Button } from "@/components/ui/button";
import ProjectForm from "@/components/form/ProjectForm";

export default async function Project({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const Mdx = await getPostData(
    ListProject[parseInt(params.id, 10) - 1].content
  );
  const title = ListProject[parseInt(params.id, 10) - 1].namaProject;
  const deskripsi = ListProject[parseInt(params.id, 10) - 1].deskripsi;

  if (session?.user) {
    return (
      <>
        <div className="space-y-4">
          <h1 className="mb-4 text-primary">Detail Project</h1>
          {ListProject.find((project) => project.idProject === params.id) ? (
            <>
              <h2 className="mb-2 font-semibold">{title}</h2>
              <p className="bg-secondary px-5 py-6 rounded-md">{deskripsi}</p>
              <ProjectForm namaProject={title} userId={session} />
            </>
          ) : (
            <p>Project tidak ditemukan</p>
          )}
        </div>
      </>
    );
  }
  return <NoSession />;
}

async function getPostData(title: string) {
  return dynamic(() => import(`../../content/project/${title}.mdx`));
}
