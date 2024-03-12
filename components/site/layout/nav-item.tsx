"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";

interface PropsType extends React.ComponentPropsWithoutRef<typeof Link> {
  parent?: string;
}

function NavItem({ className, parent, ...props }: PropsType) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      prefetch={false}
      data-active={parent ? segment === parent : false}
      className={cn(
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-300 hover:bg-white/5 hover:text-base-0 data-[active=true]:bg-white/5 data-[active=true]:text-base-0 [&>span]:line-clamp-1 [&>span]:flex-1 [&>span]:overflow-hidden [&>span]:break-all [&>svg]:h-5 [&>svg]:w-5`,
        className
      )}
      {...props}
    />
  );
}

export default NavItem;
