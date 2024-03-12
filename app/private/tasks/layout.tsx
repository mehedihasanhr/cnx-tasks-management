import React, { Suspense } from "react";

function TaskPageLayout({
  children,
  view,
  task,
}: {
  children: React.ReactNode;
  view: React.ReactNode;
  task: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<>Loading...</>}> {children}</Suspense>
      <Suspense fallback={<>Loading...</>}>{view}</Suspense>
      <Suspense fallback={<>Loading...</>}>{task}</Suspense>
    </>
  );
}

export default TaskPageLayout;
