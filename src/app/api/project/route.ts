import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, user } = await req.json();
    const userInt = parseInt(user);

    const existingProjectByProjectName = await db.project.findUnique({
      where: { userId: userInt },
    });
    if (existingProjectByProjectName) {
      return NextResponse.json(
        { project: null, error: "Project sudah diambil", status: 409 },
        { status: 409 }
      );
    }

    const newProject = await db.project.create({
      data: {
        name,
        description,
        userId: userInt,
      },
    });

    return NextResponse.json(
      { project: newProject, message: "Berhasil mendaftar", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Gagal mendaftar" }, { status: 500 });
  }
}
