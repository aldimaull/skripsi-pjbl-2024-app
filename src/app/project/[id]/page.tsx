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
        <div className="my-2">
          <h2 className="mb-2 font-serif tracking-wide font-semibold text-primary">
            Tujuan Pembelajaran
          </h2>
          <ol>
            <li>
              Siswa dapat menyebutkan konsep dasar array dalam pemrograman.
            </li>
            <li>
              Siswa dapat memberi contoh penggunaan array dalam pemrograman.
            </li>
            <li>Siswa dapat menerapkan operasi yang ada pada konsep array.</li>
            <li>
              Siswa dapat menganalisis pola-pola umum dalam penggunaan array
              untuk pemrosesan data
            </li>
            <li>Siswa mampu mengevaluasi data yang disimpan dalam array.</li>
          </ol>
        </div>
        <div className="my-2">
          <h2 className="mb-2 font-serif tracking-wide font-semibold text-primary">
            Menurutmu...
          </h2>
          <p>❗ Apa yang dimaksud dengan array? Mengapa array sering digunakan dalam pemrograman?</p>
        </div>
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
        {projects.map((project, index) => (
          <div key={index} className="space-y-4 ">
            <h2 className="my-2 font-serif tracking-wide">{project.name}</h2>
            <article className="bg-secondary p-5 rounded-md">
              <MDXRemote source={project?.content ?? ""} options={options} />
            </article>
            <div>
              <p className="font-medium">
                Rancang Project-mu dengan Kreatif!
                <br />
                ❗ Setelah kalian mempelajari materi di atas, jawablah pertanyaan di bagian <strong>Menurutmu...</strong> di atas dan tuliskan jawabannya di kolom <strong>Rencana Project</strong> sebelum membuat <strong>Nama Project</strong>.
                <br />
                <span className="text-primary font-semibold">Buatlah:</span>
              </p>
              <ol>
                <li>Nama Project</li>
                <li>Deskripsi Project</li>
                <li>Langkah-langkah Pengerjaan Project</li>
                <li>Alokasi Waktu Pengerjaan Project</li>
                <li>Sumber Daya dan Bahan Project</li>
                <li>Tantangan yang Dihadapi, dan</li>
                <li>Kriteria Keberhasilan Project-nya</li>
              </ol>
            </div>
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
