import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description, user } = JSON.parse(body);

    // cek username jika ada
    const existingProjectByProjectName = await db.project.findUnique({
      where: { userId: user },
    });
    if (existingProjectByProjectName) {
      return NextResponse.json(
        { project: null, error: "Project sudah diambil" },
        { status: 409 }
      );
    }

    const newProject = await db.project.create({
      data: {
        name,
        description,
        user,
      },
    });

    return NextResponse.json(
      { project: newProject, message: "Berhasil mendaftar" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Gagal mendaftar" }, { status: 500 });
  }
}
