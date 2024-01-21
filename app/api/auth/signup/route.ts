import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    console.log("now we are here");
    const body = await request.json();
    const { email, password, username } = body;

    console.log(email, password, username);

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
      { newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Error creating user" },
      { status: 500 }
    );
  }
}
