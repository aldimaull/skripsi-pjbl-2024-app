import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, title, description } = await req.json();

    const newAssessment = await db.assessment.create({
      data: {
        id: id,
        title: title,
        description: description,
      },
    });

    return NextResponse.json(
      {
        tookProject: newAssessment,
        message: "Berhasil mendaftar",
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Gagal mendaftar" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "projectId" }, { status: 400 });
    }

    const assessment = await db.assessment.findMany({
      where: {
        id: id,
      },
    });

    if (!assessment) {
      return NextResponse.json(
        { message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: assessment,
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
