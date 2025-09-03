import React, { useState, useRef, useEffect } from "react";
import { cn } from "../utils/cn";
import { ChevronDown } from "lucide-react";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export interface DropdownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  destructive?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = "left",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} onKeyDown={handleKeyDown}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            align === "right" ? "right-0" : "left-0",
            className,
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    onClick: (e: React.MouseEvent) => {
                      child.props.onClick?.(e);
                      setIsOpen(false);
                    },
                  })
                : child,
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ className, icon, destructive, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center px-4 py-2 text-sm text-left",
      "hover:bg-gray-100 dark:hover:bg-gray-700",
      "focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none",
      destructive
        ? "text-red-600 dark:text-red-400"
        : "text-gray-700 dark:text-gray-200",
      className,
    )}
    role="menuitem"
    {...props}
  >
    {icon && <span className="mr-3 shrink-0">{icon}</span>}
    {children}
  </button>
));

DropdownItem.displayName = "DropdownItem";

export const DropdownSeparator: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn("my-1 h-px bg-gray-200 dark:bg-gray-600", className)}
    role="separator"
  />
);

DropdownSeparator.displayName = "DropdownSeparator";
