import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const body = await req.json();
  const { data } = body;
  const { taskId } = params;

  try {
    const tasks = await db.task.update({
      where: { id: Number(taskId) },
      data,
    });

    if (!tasks) {
      return Response.json(
        { tasks: [], message: "Update failed" },
        { status: 200 }
      );
    }

    return Response.json(
      { tasks, message: "Tasks successfully update" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
