// /app/api/nilai/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { userId, assessmentId, nilai } = await req.json();

    if (!userId || !assessmentId || nilai === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newScore = await db.nilai.create({
      data: {
        userId: parseInt(userId),
        assessmentId: parseInt(assessmentId),
        nilaiAssessment: nilai,
      },
    });

    return NextResponse.json(newScore, { status: 201 });
  } catch (error) {
    console.error("Error saving score:", error);
    return NextResponse.json(
      { message: "An error occurred while saving the score" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const nilai = await db.nilai.findMany({
      where: {
        userId: parseInt(userId ?? "", 10),
      },
      include: {
        assessment: true,
      },
    });

    return NextResponse.json({
      data: nilai,
      message: "Berhasil disimpan",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan" }, { status: 500 });
  }
}
