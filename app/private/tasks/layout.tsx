import { revalidatePath } from "next/cache";
import React from "react";

function TaskPageLayout({
  children,
  view,
  task,
}: {
  children: React.ReactNode;
  view: React.ReactNode;
  task: React.ReactNode;
}) {
  revalidatePath("/tasks", "layout");
  return (
    <>
      {children}
      {view}
      {task}
    </>
  );
}

export default TaskPageLayout;
