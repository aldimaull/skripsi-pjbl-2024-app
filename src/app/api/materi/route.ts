import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const materi = await db.materiList.findMany();
    if (!materi) {
      return NextResponse.json(
        { message: "Materi tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: materi,
      message: "Berhasil diambil",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
