import { db } from "@/lib/db";
import { removeCookie, verifyJwtToken } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // use session token
    const token = cookies().get("sessionToken")?.value;

    // if not exist response session timeout.
    if (!token) {
      // clear cookies
      removeCookie("sessionToken");
      return Response.json(
        { message: "Session time out. Please login and try again." },
        { status: 401 }
      );
    }

    // if token exist, check validation
    const { payload } = await verifyJwtToken(token);

    // if token don't validate response session timeout.
    if (!payload) {
      removeCookie("sessionToken");
      return Response.json(
        { message: "Session time out. Please login and try again." },
        { status: 401 }
      );
    }

    // if token validate, get userId from session table

    const session = await db.userSession.findUnique({
      where: { sessionId: payload.sub },
      select: { userId: true },
    });

    const user = await db.profile.findUnique({
      where: { userId: session?.userId },
    });

    // if user not exist, response user not found
    if (!user) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    }

    return Response.json(
      { user, message: "User fetch successfully" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "JWTExpired") {
      return Response.json({ message: "Session Expired!" }, { status: 401 });
    }
    return Response.json(
      { message: "Something went wrong! Please contact administrator" },
      { status: 500 }
    );
  }
}
