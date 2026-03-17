import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-xl border bg-white px-3 text-sm text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-matcha-300",
          hasError
            ? "border-red-500 focus-visible:ring-red-400"
            : "border-ink/15 hover:border-ink/30",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
