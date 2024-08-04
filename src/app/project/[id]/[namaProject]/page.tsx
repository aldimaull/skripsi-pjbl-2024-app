"use client";

import React, { useState, useEffect } from "react";
import CobaIni from "@/components/projects/coba1";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  id: number;
  name: string;
  description: string;
  deadline: Date;
  content: string;
  createdAt: Date;
  updateAt: Date;
};

export default function MulaiProject({
  params,
}: {
  params: { namaProject: string };
}) {
  const [projects, setProjects] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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
      <h1 className="mb-4 text-primary font-serif tracking-wide">
        Detail Project
      </h1>

      <div className="space-y-4 mb-4">
        <h2 className="mb-2 font-semibold">{projects?.name}</h2>
        <p className="bg-secondary px-5 py-6 rounded-md">{projects?.content}</p>
      </div>
      <CobaIni />
    </>
  );
}
