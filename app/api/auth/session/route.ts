"use server";

import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { createCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { sessionId } = body;
    // check user is logged in or not
    const session = await db.userSession.findFirst({
      where: {
        sessionId: sessionId as string,
        sessionEnd: null,
      },
    });

    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    createCookie(sessionId);

    // find user
    const user = db.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, profile: true },
    });

    return Response.json(
      { user, message: "Authorized successfully" },
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
