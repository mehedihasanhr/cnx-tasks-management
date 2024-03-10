"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface PropTypes extends React.ComponentProps<typeof Button> {
  children: ReactNode;
}

function ProjectCloseButton({ ...props }: PropTypes) {
  const router = useRouter();
  const back = () => router.replace("/projects/list");
  return <Button onClick={back} {...props} />;
}

export default ProjectCloseButton;
