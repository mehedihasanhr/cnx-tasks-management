"use server";

import { config } from "@/config";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { db } from "../lib/db";

// fetch tasks
export const fetchTask = async (id: string) => {
  const task = await fetch(`${config.API}/tasks/${id}`, {
    next: { tags: ["TASK"] },
  }).then((res) => res.json());

  return task;
};

// fetch tasks
export const fetchTasks = async () => {
  const tasks = await fetch(`${config.API}/tasks`, {
    next: { tags: ["TASK_COLLECTION"] },
  }).then((res) => res.json());

  return tasks;
};

type UpdateTaskDataType = Prisma.Args<typeof db.task, "update">["data"];

// update task
export async function updateTask(taskId: number, data: UpdateTaskDataType) {
  try {
    const res = await fetch(`${config.API}/tasks/${taskId}/update`, {
      method: "PUT",
      body: JSON.stringify({ data, tag: "TASK_COLLECTION" }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      revalidateTag("TASK");
      revalidateTag("TASK_COLLECTION");
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

    revalidateTag("TASK_COLLECTION");
    const response = await res.json();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
