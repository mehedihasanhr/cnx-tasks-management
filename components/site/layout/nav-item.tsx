"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface PropsType extends React.ComponentPropsWithoutRef<typeof Link> {}

function NavItem({ className, ...props }: PropsType) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(props.href as string);

  return (
    <Link
      prefetch={false}
      className={cn(
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-300 hover:bg-white/5 hover:text-base-0 [&>span]:line-clamp-1 [&>span]:flex-1 [&>span]:overflow-hidden [&>span]:break-all [&>svg]:h-5 [&>svg]:w-5 ${isActive && "bg-white/5 text-base-0"}`,
        className
      )}
      {...props}
    />
  );
}

export default NavItem;
