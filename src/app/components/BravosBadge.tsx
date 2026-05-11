import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BravosBadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gray';
  className?: string;
}

export function BravosBadge({ children, variant = 'primary', className }: BravosBadgeProps) {
  const variants = {
    primary: 'bg-[rgb(0,164,213)] text-white',
    secondary: 'bg-[rgb(51,188,229)] text-white',
    gray: 'bg-[rgb(230,230,230)] text-[#1a1a1a]'
  };

  return (
    <span className={clsx(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
