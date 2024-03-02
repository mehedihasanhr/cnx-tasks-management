"use server";

import { revalidatePath } from "next/cache";
import { config } from "@/config";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { db } from "../lib/db";

// fetch tasks
export const fetchTasks = async () => {
  const tasks = await fetch(`${config.API}/tasks`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return tasks;
};

type UpdateTaskDataType = Prisma.Args<typeof db.task, "update">["data"];

// update task
export async function updateTask(taskId: number, data: UpdateTaskDataType) {
  try {
    const res = await fetch(`${config.API}/tasks/${taskId}/update`, {
      method: "PUT",
      body: JSON.stringify({ data, tag: "tasks_collection" }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      revalidatePath("/tasks/list", "page");
    }

    const resData = await res.json();
    return resData;
  } catch (err) {
    throw Error("has error");
  }
}

// create task
type CreateTaskDataType = Prisma.Args<typeof db.task, "create">["data"];
type CreateTaskArgs<T> = Pick<T, Exclude<keyof T, "taskCreatorId">>;

export const createTask = async ({
  data,
}: {
  data: CreateTaskArgs<CreateTaskDataType>;
}) => {
  const token = cookies().get("sessionToken")?.value;
  try {
    const res = await fetch(`${config.API}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        data,
        token,
      }),
    });
    revalidatePath("/tasks/list");
    const response = await res.json();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
