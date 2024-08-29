import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, deadlineFrom, deadlineTo, user, status, rencana } =
      await req.json();
    const userInt = parseInt(user);
    const projectInt = parseInt(id);

    const newProject = await db.tookProject.create({
      data: {
        projectId: projectInt,
        userId: userInt,
        deadlineFrom,
        deadlineTo,
        status,
        rencana: rencana,
      },
    });

    return NextResponse.json(
      { tookProject: newProject, message: "Berhasil mendaftar", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat membuat tookProject:", error);
    return NextResponse.json({ message: "Gagal mendaftar" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const projects = await db.tookProject.findMany({
      relationLoadStrategy: "join",
      include: {
        user: true,
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });
    if (!projects) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: projects,
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

export async function PUT(req: NextRequest) {
  try {
    const { status } = await req.json();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const userId = searchParams.get("userId");
    const projectInt = parseInt(projectId ?? "0", 10);
    const userInt = parseInt(userId ?? "0", 10);
    const projects = await db.tookProject.update({
      where: {
        projectId_userId: {
          projectId: projectInt,
          userId: userInt,
        },
      },
      data: { status: status },
    });
    if (!projects) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: projects,
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
