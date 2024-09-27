import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NoSession from "@/components/error/NoSession";
import ProjectForm from "@/components/form/ProjectForm";
import { db } from "@/lib/db";
import ButtonBack from "@/components/ui/ButtonBack";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import CardDashboard from "@/components/card/CardDashboard";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

export default async function Project({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const projects = await db.projectList.findMany({
    where: {
      id: parseInt(params.id, 10),
    },
  });
  const materi = await db.materiList.findMany();

  if (session?.user) {
    return (
      <>
        <h1 className="text-primary font-serif tracking-wide">
          Detail Project
        </h1>
        <ButtonBack />
        {projects.map((project, index) => (
          <div key={index} className="space-y-4 ">
            <h2 className="mb-2 font-semibold">{project.name}</h2>
            <article className="bg-secondary px-5 py-6 rounded-md">
              <MDXRemote source={project?.content ?? ""} options={options} />
            </article>
            <CardDashboard title="Materi">
              {materi?.map((materi: any, index: any) => (
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
            </CardDashboard>
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
