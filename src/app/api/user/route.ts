import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import z from "zod";

const userSchema = z.object({
  name: z.string().min(3, { message: "Nama terlalu pendek" }).max(50),
  username: z
    .string()
    .min(8, {
      message: "Username harus terisi",
    })
    .max(20),
  password: z
    .string()
    .min(8, { message: "Password terlalu pendek" })
    .max(20, { message: "Password terlalu panjang" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, username, password } = userSchema.parse(body);

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
        name,
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
