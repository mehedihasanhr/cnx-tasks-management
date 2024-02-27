"use server";

import { db } from "@/lib/db";
import { removeCookie, verifyJwtToken } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
  const sessionToken = cookies().get("sessionToken")?.value;

  try {
    if (sessionToken) {
      const { payload } = await verifyJwtToken(sessionToken);

      await db.userSession.update({
        where: { sessionId: payload.sub as string },
        data: {
          sessionEnd: new Date(),
        },
      });

      // clear cookie
      removeCookie("sessionToken");

      return Response.json({ message: "Logout successfully" }, { status: 200 });
    }

    return Response.json({ message: "Logout successfully" }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
}
