import { db } from "@/lib/db";
import { NextResponse } from "next/server";

function titleCase(str: string) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const res = await db.projectList.findMany();

  return NextResponse.json({
    data: res.find((r) => r.name === titleCase(params.namaProject)),
  });
}
