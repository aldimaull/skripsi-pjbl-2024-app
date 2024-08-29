import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

function makeTitle(slug: any) {
  const words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const res = await db.projectList.findMany();

  return NextResponse.json({
    data: res.find((r) => r.name === makeTitle(params.namaProject)),
  });
}
