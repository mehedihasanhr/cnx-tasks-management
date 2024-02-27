"use server";

import bcript from "bcrypt";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createCookie, createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { email, password } = body;

    // check email already exist or not
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        profile: true,
      },
    });

    if (!user) {
      return Response.json({ message: "User not exist" }, { status: 404 });
    }

    const { password: hashPassword, ...userData } = user;

    // hash password
    const isSame = await bcript.compare(password, hashPassword);

    if (!isSame) {
      return Response.json(
        { message: "Incorrect Credential" },
        { status: 401 }
      );
    }

    // create session
    const ip = request.ip || request.headers.get("x-forwarded-for");

    // create session
    const session = await createSession({
      userId: user.id,
      ip: ip!,
    });

    // create cookies
    await createCookie(session);

    // return response
    return Response.json(
      { user: userData, message: "Login successfully" },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
}
