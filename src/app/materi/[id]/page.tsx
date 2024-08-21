import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NoSession from "@/components/error/NoSession";
import { db } from "@/lib/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const mdx = await db.materiList.findUnique({
    where: {
      id: parseInt(params.id, 10),
    },
  });

  if (session?.user) {
    return (
      <>
        <h1 className="font-serif tracking-wide">Materi</h1>
        <article>
          <MDXRemote source={mdx?.content ?? ""} options={options} />
        </article>
      </>
    );
  }

  return <NoSession />;
}
