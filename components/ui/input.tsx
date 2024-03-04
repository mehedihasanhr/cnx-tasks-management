import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-base-0/10 bg-white/5 px-3 py-2 text-sm ring-offset-white/10 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {icon ? (
          <i className="absolute right-3 top-1/2 -translate-y-1/2 text-base-300 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {icon}
          </i>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
