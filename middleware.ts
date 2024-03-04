import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyUserSession } from "./lib/session";

// eslint-disable-next-line consistent-return
export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const { pathname } = request.nextUrl;

  // verified user
  const verified = sessionToken ? await verifyUserSession(sessionToken) : false;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  if (["/login", "/sign-up"].includes(pathname)) {
    if (typeof verified !== "boolean" && verified.status === 200) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
  } else if (
    !verified ||
    (typeof verified !== "boolean" && verified.status !== 200)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (pathname === "/tasks") {
    return NextResponse.redirect(new URL(`${pathname}/list`, request.url));
  } else
    return NextResponse.rewrite(new URL(`/private${pathname}`, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico$).*)",
  ],
};
