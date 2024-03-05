import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
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
        createdBy: {
          select: { userId: true, id: true, avatar: true, name: true },
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
