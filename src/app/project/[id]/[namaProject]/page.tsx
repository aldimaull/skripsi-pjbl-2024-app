"use client";

import React, { useState, useEffect } from "react";
import Project from "@/components/projects/palindrom";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import ButtonBack from "@/components/ui/ButtonBack";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";

type Project = {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  content: string;
  createdAt: Date;
  updateAt: Date;
};

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

export default function MulaiProject({
  params,
}: {
  params: { namaProject: string };
}) {
  const [projects, setProjects] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projectList/${params.namaProject}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProjects(result.data);
      } catch (error) {
        console.error("gagal");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.namaProject]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-primary font-serif tracking-wide">Detail Project</h1>
      <ButtonBack />

      <div className="space-y-4 mb-4">
        <h2 className="mb-2 font-semibold">{projects?.name}</h2>
        <article className="bg-secondary px-5 py-5 rounded-md text-sm lg:text-base">
          <MDXRemote source={projects?.content ?? ""} options={options} />
        </article>
      </div>
      <Project userId={session?.user.id ?? ""} projectId={projects?.id ?? 0} />
    </>
  );
}
