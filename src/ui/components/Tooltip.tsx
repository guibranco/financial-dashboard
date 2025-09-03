import React, { useState } from "react";
import { cn } from "../utils/cn";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const tooltipPositions = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap",
            "dark:bg-gray-700 dark:text-gray-200",
            tooltipPositions[position],
            className,
          )}
        >
          {content}
          <div
            className={cn(
              "absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45",
              position === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1",
              position === "bottom" &&
                "bottom-full left-1/2 -translate-x-1/2 -mb-1",
              position === "left" && "left-full top-1/2 -translate-y-1/2 -ml-1",
              position === "right" &&
                "right-full top-1/2 -translate-y-1/2 -mr-1",
            )}
          />
        </div>
      )}
    </div>
  );
};
