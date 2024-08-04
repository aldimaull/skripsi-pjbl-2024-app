import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, deadlineFrom, deadlineTo, user, submission, status } =
      await req.json();
    const userInt = parseInt(user);
    const projectInt = parseInt(id);

    const newProject = await db.tookProject.create({
      data: {
        projectId: projectInt,
        userId: userInt,
        deadlineFrom,
        deadlineTo,
        submission,
        status,
      },
    });

    return NextResponse.json(
      { tookProject: newProject, message: "Berhasil mendaftar", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Gagal mendaftar" }, { status: 500 });
  }
}
