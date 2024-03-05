import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const task = await db.task.findFirst({
      where: { id: Number(params.taskId) },
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
        status: true,
      },
    });

    if (!task) {
      return Response.json(
        { task: [], message: "Task not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { task, message: "Task successfully fetch" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
