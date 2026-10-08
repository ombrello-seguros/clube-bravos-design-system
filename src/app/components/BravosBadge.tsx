import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BravosBadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gray';
  className?: string;
}

export function BravosBadge({ children, variant = 'primary', className }: BravosBadgeProps) {
  const variants = {
    primary: 'bg-cb-primary-tint text-cb-primary-text',
    secondary: 'bg-cb-purple-2/30 text-cb-purple',
    gray: 'bg-cb-off-bg text-cb-fg-2'
  };

  return (
    <span className={clsx(
      'cb-status-dot inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-cb-body text-xs font-semibold',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
