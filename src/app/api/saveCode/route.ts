import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const { projectId, value, userId } = await req.json();
    const userInt = parseInt(userId ?? "0", 10);
    const updatedProject = await db.tookProject.update({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userInt,
        },
      },
      data: { submission: value },
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const session = await getServerSession(authOptions);
    const projectInt = parseInt(projectId ?? "0", 10);

    if (!projectId) {
      return NextResponse.json({ message: "projectId" }, { status: 400 });
    }

    const userId = session?.user.id;
    const userInt = parseInt(userId ?? "0", 10);
    const project = await db.tookProject.findUnique({
      where: {
        projectId_userId: {
          projectId: projectInt,
          userId: userInt,
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: project,
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
