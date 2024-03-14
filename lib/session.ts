/* eslint-disable @typescript-eslint/no-explicit-any */

import * as jose from "jose";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { config } from "@/config";

const secretSessionKey = new TextEncoder().encode(
  config.JWT_SESSION_SECRET_KEY
);

const alg = "HS256";

type CreateSessionArgType = {
  userId: number;
  ip?: string;
};

// create session
export async function createSession({ userId, ip }: CreateSessionArgType) {
  const session = await db.userSession.create({
    data: { userId, ip },
  });
  return session.sessionId!;
}

// create cookies
export async function createCookie(sessionId: string) {
  const jwt = await new jose.SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("7d")
    .setSubject(sessionId)
    .sign(secretSessionKey);

  cookies().set("sessionToken", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

// remove cookies
export function removeCookie(name: string) {
  cookies().delete(name);
}

// verify token
export async function verifyJwtToken(token: string) {
  const decodedToken = await jose.jwtVerify(token, secretSessionKey, {
    issuer: "urn:example:issuer",
    audience: "urn:example:audience",
  });
  return decodedToken;
}

// verify user session
export async function verifyUserSession(token: string) {
  try {
    const res = await fetch(`${config.API}/auth/session`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ token }),
      cache: "force-cache",
    });

    const data = await res.json();

    return { data, status: res.status };
  } catch (error: any) {
    return { data: null, status: error.status };
  }
}
