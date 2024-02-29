import React from "react";
import { cn } from "@/lib/utils";

function TabsNavigation({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>{children}</div>
  );
}

export default TabsNavigation;
