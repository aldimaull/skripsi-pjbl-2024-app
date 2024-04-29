import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import z from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username harus terisi",
    })
    .max(100),
  password: z
    .string()
    .min(8, { message: "Password terlalu pendek" })
    .max(20, { message: "Password terlalu panjang" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, password } = userSchema.parse(body);

    // cek username jika ada
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, error: "Username sudah terdaftar" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: newUser, message: "Berhasil mendaftar" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Gagal mendaftar" }, { status: 500 });
  }
}
