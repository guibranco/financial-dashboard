import React from "react";
import { cn } from "../utils/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        spinnerSizes[size],
        className,
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  ),
);

Spinner.displayName = "Spinner";

export default Spinner;
