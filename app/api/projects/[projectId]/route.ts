import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const project = await db.project.findFirst({
      where: { id: Number(params.projectId) },
      include: {
        status: true,
        tasks: { select: { id: true } },
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

    if (!project) {
      return Response.json(
        { project: [], message: "Project not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { project, message: "Project successfully fetch" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
