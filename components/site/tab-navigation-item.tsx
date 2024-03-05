"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../../lib/utils";

interface PropTypes extends React.ComponentPropsWithoutRef<typeof Link> {}

function TabNavigationItem({ className, ...props }: PropTypes) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(props.href as string);

  return (
    <Link
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
