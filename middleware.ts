import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line consistent-return
export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const { pathname } = request.nextUrl;

  // verified user
  // const verified = sessionToken ? await verifyUserSession(sessionToken) : false;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  // if upcoming requested page is login or sign-up
  if (["/login", "/sign-up"].includes(pathname)) {
    // if session token exist redirect to dashboard
    if (sessionToken) {
      return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }
  } else {
    // others all requested url if session token not exist redirect to login page
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // modified url request
    if (pathname === "/projects" || pathname === "/tasks") {
      return NextResponse.redirect(new URL(`${pathname}/list`, request.url));
    }
    // return NextResponse.redirect(new URL(pathname, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico$).*)",
  ],
};
