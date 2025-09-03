import React from "react";
import { cn } from "../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const cardVariants = {
  default:
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
  outlined:
    "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700",
  elevated:
    "bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700",
};

const cardPadding = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg",
        cardVariants[variant],
        cardPadding[padding],
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-6", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-6", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
