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
      {children}
      {views}
      {project}
    </>
  );
}

export default ProjectsLayout;
