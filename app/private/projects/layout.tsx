import * as React from "react";

function ProjectsLayout({
  children,
  views,
  project,
}: {
  children: React.ReactNode;
  views: React.ReactNode;
  project: React.ReactNode;
}) {
  return (
    <>
      <React.Suspense fallback={<>Loading...</>}> {children}</React.Suspense>
      <React.Suspense fallback={<>Loading...</>}>{views}</React.Suspense>
      <React.Suspense fallback={<>Loading...</>}>{project}</React.Suspense>
    </>
  );
}

export default ProjectsLayout;
