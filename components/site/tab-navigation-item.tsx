"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";

interface PropTypes extends React.ComponentPropsWithoutRef<typeof Link> {
  basePath: string;
}

function TabNavigationItem({ className, basePath, href, ...props }: PropTypes) {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === href;

  return (
    <Link
      href={`${basePath}/${href}`}
      data-active={isActive.toString()}
      className={cn(
        "border-b-2 border-white/0 pb-1.5 text-sm text-base-100 data-[active=true]:border-red-500 data-[active=true]:text-white",
        className
      )}
      {...props}
    />
  );
}

export default TabNavigationItem;
