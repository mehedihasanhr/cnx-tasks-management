"use server";

import { db } from "@/lib/db";
import { verifyJwtToken } from "@/lib/session";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { payload } = await verifyJwtToken(body.token);
    const sessionId = payload.sub as string;
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
    if (error.name === "JWTExpired") {
      return Response.json({ message: "Session Expired!" }, { status: 401 });
    }
    return Response.json({ message: "Session Expired!" }, { status: 500 });
  }
}
