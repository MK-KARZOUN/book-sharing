import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { compare } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        body: { error: "user does not exist" },
      });
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        body: { error: "invalid password" },
      });
    }

    return NextResponse.json({
      user,
      status: 200,
      body: { message: "user logged in successfully" },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error, message: "Error logging in user" },
    });
  }
}
