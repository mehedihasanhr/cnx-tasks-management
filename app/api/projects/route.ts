import { db } from "@/lib/db";
import { verifyJwtToken } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

type StatusType = {
  in?: string[] | Prisma.FieldRef<"Status", "String[]">;
  not?: string | Prisma.NestedStringFilter<"Status">;
};

const StatusEnum = [
  "COMPLETE",
  "PENDING",
  "PROGRESSING",
  "OVER_DUE",
  "HOLD",
] as StatusType["in"];

export async function GET(req: NextRequest) {
  // query params
  const query = req.nextUrl.searchParams;

  // project status
  let status = query.getAll("status") as StatusType["in"];

  // response back without this status
  const withoutStatus =
    (query.get("w-status") as StatusType["not"]) ?? undefined;

  // If status query params is not exist show all data
  if (Array.isArray(status) && status.length === 0) {
    status = StatusEnum;
  }

  try {
    const projects = await db.project.findMany({
      where: { status: { slug: { not: withoutStatus, in: status } } },
      include: {
        status: true,
        tasks: true,
        collaborators: {
          select: {
            userId: true,
            id: true,
            avatar: true,
            avatarFallback: true,
            name: true,
          },
        },
        manager: {
          select: {
            userId: true,
            id: true,
            avatar: true,
            avatarFallback: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            userId: true,
            id: true,
            avatar: true,
            avatarFallback: true,
            name: true,
          },
        },
      },
    });

    if (!projects) {
      return Response.json(
        { projects: [], message: "Projects successfully fetch" },
        { status: 200 }
      );
    }

    return Response.json(
      { projects, message: "Projects successfully fetch" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

// Create project
export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = headers().get("authentication")?.split("Bearer")[1];

  try {
    const { data } = body;

    if (!token) {
      return Response.json(
        { message: "Unauthorized!", success: false },
        { status: 401 }
      );
    }

    const { payload } = await verifyJwtToken(token);

    if (!payload) {
      return Response.json(
        { message: "Unauthorized!", success: false },
        { status: 401 }
      );
    }

    // user id
    const session = await db.userSession.findFirst({
      where: { sessionId: payload.sub },
      select: { userId: true },
      orderBy: { id: "desc" },
    });

    if (!session?.userId) {
      return Response.json({ message: "Session Expired." }, { status: 303 });
    }

    const project = await db.project.create({
      data: {
        ...data,
        creatorId: 1,
        managerId: 1,
      },
    });
    if (!project) {
      return Response.json(
        { message: "Project Create failed" },
        { status: 200 }
      );
    }

    return Response.json(
      { project, message: "Project Create successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "error" }, { status: 200 });
  }
}
