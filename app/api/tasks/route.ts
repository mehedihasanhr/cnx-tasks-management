import { db } from "@/lib/db";

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
    return Response.json(
      {
        tasks,
        message: "Tasks successfully fetch ",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}
