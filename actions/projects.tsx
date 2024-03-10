"use server";

import { config } from "@/config";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// fetch project;
export async function fetchProject(id: number) {
  try {
    const project = await fetch(`${config.API}/projects/${id}`, {
      next: { tags: ["PROJECT"] },
    }).then((res) => res.json());

    return project;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw Error(error.message);
  }
}

// fetch projects
export async function fetchProjects() {
  try {
    const projects = await fetch(`${config.API}/projects`, {
      next: { tags: ["PROJECT_COLLECTION"] },
    }).then((res) => res.json());

    return projects;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw Error(error.message);
  }
}

// update project
//
type UpdateProjectDataType = Prisma.Args<typeof db.project, "update">["data"];

// update task
export async function updateProject(
  projectId: number,
  data: UpdateProjectDataType
) {
  try {
    const res = await fetch(`${config.API}/projects/${projectId}/update`, {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      revalidateTag("PROJECT");
      revalidateTag("PROJECT_COLLECTION");
    }

    const resData = await res.json();
    return resData;
  } catch (err) {
    throw Error("has error");
  }
}

// create Project
type CreateProjectDataType = Prisma.Args<typeof db.project, "create">["data"];
type CreateProjectArgs<T> = Pick<T, Exclude<keyof T, "creatorId">>;

export const createProject = async ({
  data,
}: {
  data: CreateProjectArgs<CreateProjectDataType>;
}) => {
  const token = cookies().get("sessionToken")?.value;
  try {
    const res = await fetch(`${config.API}/projects`, {
      method: "POST",
      body: JSON.stringify({
        data,
        token,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authentication: `Bearer${token}`,
      },
    });

    revalidateTag("PROJECT_COLLECTION");
    const response = await res.json();
    console.log(response);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
