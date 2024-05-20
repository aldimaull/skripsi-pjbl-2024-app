import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NoSession from "@/components/error/NoSession";
import dynamic from "next/dynamic";

export default async function Materi({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const Mdx = await getPostsData(params.id);

  if (session?.user) {
    return (
      <>
        <h1>Materi</h1>
        <article>{<Mdx />}</article>
      </>
    );
  }

  return <NoSession />;
}

async function getPostsData(title: string) {
  return dynamic(() => import(`../../content/materi/${title}.mdx`));
}
