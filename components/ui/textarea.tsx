import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full rounded-xl border bg-white px-3 py-3 text-sm text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-matcha-300",
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

Textarea.displayName = "Textarea";
