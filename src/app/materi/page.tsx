import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import NoSession from "@/components/error/NoSession";

const Materi = async () => {
  const session = await getServerSession(authOptions);
  const materiList = await db.materiList.findMany();

  if (session?.user) {
    return (
      <>
        <h1 className="mb-2 lg:mb-4 font-serif tracking-wide">Daftar Materi</h1>
        <div className="lg:grid grid-cols-2 lg:gap-4">
          {materiList.map((materi, index) => (
            <div
              key={index}
              className="my-4 p-4 lg:my-0 bg-secondary rounded-md space-y-2"
            >
              <h2>{materi.name}</h2>
              <p className="text-sm">Deskripsi materi: {materi.description}</p>
              <div>
                <Link href={`/materi/${materi.id}`}>
                  <Button>Lihat Materi</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  return <NoSession />;
};

export default Materi;
