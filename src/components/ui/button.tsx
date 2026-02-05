import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
          variant === "default" &&
            "bg-[var(--accent)] text-[#04101b] hover:bg-[var(--accent-strong)]",
          variant === "outline" &&
            "border border-white/10 text-white/80 hover:border-white/30 hover:text-white",
          variant === "ghost" && "text-[var(--muted)] hover:text-white",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
