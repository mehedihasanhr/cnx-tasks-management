"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface PropTypes extends React.ComponentProps<typeof Button> {
  children: ReactNode;
}

function TaskCloseButton({ ...props }: PropTypes) {
  const router = useRouter();

  const back = () => {
    const timer = setTimeout(() => {
      router.back();
      clearTimeout(timer);
    }, 400);
  };

  return <Button onClick={back} {...props} />;
}

export default TaskCloseButton;
