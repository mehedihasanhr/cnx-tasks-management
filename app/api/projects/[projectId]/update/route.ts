import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const body = await req.json();
  const { data } = body;
  const { projectId } = params;

  try {
    const project = await db.project.update({
      where: { id: Number(projectId) },
      data,
    });

    if (!project) {
      return Response.json(
        { project: [], message: "Update failed" },
        { status: 200 }
      );
    }

    return Response.json(
      { project, message: "Tasks successfully update" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
