import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { projectId, code, userId } = await req.json();
    const userInt = parseInt(userId, 10);
    const updatedProject = await db.tookProject.update({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userInt,
        },
      },
      data: { submission: code },
    });

    return NextResponse.json({
      data: updatedProject,
      message: "Berhasil disimpan",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan" }, { status: 500 });
  }
}
