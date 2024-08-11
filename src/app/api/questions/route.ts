import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const questionId = searchParams.get("id");
    const questionInt = parseInt(questionId ?? "0", 10);

    if (!questionId) {
      return NextResponse.json({ message: "projectId" }, { status: 400 });
    }

    const questions = await db.question.findMany({
      where: {
        assessmentId: questionInt,
      },
    });

    if (!questions) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: questions,
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
