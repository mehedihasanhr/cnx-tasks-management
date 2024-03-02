import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { verifyJwtToken } from "@/lib/session";

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      include: {
        members: {
          select: { id: true, userId: true, name: true, avatar: true },
        },
        assignee: {
          select: { id: true, userId: true, name: true, avatar: true },
        },
        taskCreator: {
          select: { id: true, userId: true, name: true, avatar: true },
        },
        project: { select: { id: true, title: true } },
      },
    });

    if (!tasks) {
      return Response.json(
        { tasks: [], message: "Tasks successfully fetch" },
        { status: 200 }
      );
    }

    return Response.json(
      { tasks, message: "Tasks successfully fetch" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

// create tasks
export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { token, data } = body;

    const { payload } = await verifyJwtToken(token);

    if (!payload) {
      return Response.json({ message: "Session Expired." }, { status: 303 });
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

    const task = await db.task.create({
      data: {
        ...data,
        taskCreatorId: session.userId,
      },
    });
    if (!task) {
      return Response.json({ message: "Task Create failed" }, { status: 200 });
    }

    return Response.json(
      { task, message: "Task Create successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "error" }, { status: 200 });
  }
}
