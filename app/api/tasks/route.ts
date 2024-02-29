import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      include: {
        members: {
          select: {
            id: true,
            userId: true,
            name: true,
            avatar: true,
          },
        },
        assignee: {
          select: {
            id: true,
            userId: true,
            name: true,
            avatar: true,
          },
        },
        taskCreator: {
          select: {
            id: true,
            userId: true,
            name: true,
            avatar: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        tasks,
        message: "Tasks successfully fetch ",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}
