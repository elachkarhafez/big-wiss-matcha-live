"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  ripple?: boolean;
}

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-matcha-500 text-ink hover:bg-matcha-300 focus-visible:ring-matcha-300 shadow-premium-md",
  secondary:
    "bg-ink text-cream hover:bg-matcha-700 focus-visible:ring-matcha-500 shadow-premium-md",
  ghost:
    "bg-transparent text-ink ring-1 ring-ink/25 hover:bg-ink/5 focus-visible:ring-matcha-500"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-12 px-6 text-base"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      ripple = true,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !props.disabled) {
        const rect = event.currentTarget.getBoundingClientRect();
        const largestDimension = Math.max(rect.width, rect.height);
        const nextRipple: Ripple = {
          id: Date.now() + Math.random(),
          x: event.clientX - rect.left - largestDimension / 2,
          y: event.clientY - rect.top - largestDimension / 2,
          size: largestDimension
        };

        setRipples((previous) => [...previous, nextRipple]);
        window.setTimeout(() => {
          setRipples((previous) =>
            previous.filter((rippleItem) => rippleItem.id !== nextRipple.id)
          );
        }, 620);
      }

      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>
        {ripple ? (
          <span className="pointer-events-none absolute inset-0 z-[1]">
            {ripples.map((rippleItem) => (
              <span
                key={rippleItem.id}
                className="button-ripple absolute rounded-full bg-white/50"
                style={{
                  left: rippleItem.x,
                  top: rippleItem.y,
                  width: rippleItem.size,
                  height: rippleItem.size
                }}
              />
            ))}
          </span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
