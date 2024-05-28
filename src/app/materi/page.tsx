import React from "react";
import { ListMateri } from "@/utils/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NoSession from "@/components/error/NoSession";

const Materi = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <>
        <h1 className="mb-2 lg:mb-4">Daftar Materi</h1>
        <div className="lg:grid grid-cols-2 lg:gap-4">
          {ListMateri.map((materi, index) => (
            <div
              key={index}
              className="my-4 p-4 lg:my-0 bg-secondary rounded-md space-y-2"
            >
              <h2>{materi.namaMateri}</h2>
              <p className="text-sm">Deskripsi materi: {materi.deskripsi}</p>
              <div>
                <Link href={materi.link}>
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
