import React from 'react';
import { cn } from '../utils/cn';
import { User } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const avatarSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        avatarSizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt || 'Avatar'}
        />
      ) : fallback ? (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {fallback}
          </span>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <User className={cn('text-gray-600 dark:text-gray-300', iconSizes[size])} />
        </div>
      )}
    </div>
  )
);

Avatar.displayName = 'Avatar';