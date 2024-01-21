import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import { hash } from "bcrypt";

// const createUserSchema = z.object({
//   email: z.string().min(1).max(50),
//   password: z
//     .string()
//     .min(1, "password is required")
//     .min(8, "password must be at least 8 characters"),
// });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(
      { newUser, message: "User creatd succefully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Error creating book" },
      { status: 500 }
    );
  }
}
