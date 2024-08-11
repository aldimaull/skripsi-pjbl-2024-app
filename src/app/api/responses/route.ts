import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { responses, userId } = await req.json();
    const userInt = parseInt(userId, 10);
    const savedResponses = await db.response.createMany({
      data: responses.map(
        (response: { questionId: string; answer: string }) => ({
          userId: userInt,
          questionId: response.questionId,
          selectedOption: response.answer,
        })
      ),
    });

    return NextResponse.json({
      data: savedResponses,
      message: "Berhasil disimpan",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan" }, { status: 500 });
  }
}
