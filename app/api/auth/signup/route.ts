"use server";

import bcript from "bcrypt";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createCookie, createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { name, email, password } = body;

    // check email already exist or not
    const isUserAlreadyExist = await db.user.findUnique({
      where: { email },
    });

    if (isUserAlreadyExist) {
      return Response.json({ message: "User already exist" }, { status: 409 });
    }

    // hash password
    const hasPassword = await bcript.hash(password, 10);

    // create user
    const user = await db.user.create({
      data: {
        email,
        password: hasPassword,
        profile: {
          create: {
            name,
            email,
            avatarFallback: name?.slice(0, 2).toUpperCase(),
          },
        },
      },

      select: {
        id: true,
        profile: true,
      },
    });

    // create session
    const ip = request.ip || request.headers.get("x-forwarded-for");

    const session = await createSession({
      userId: user.id,
      ip: ip!,
    });

    // create cookies
    await createCookie(session);

    // return response
    return Response.json(
      { user, session, message: "User created successfully" },
      { status: 201 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
}
