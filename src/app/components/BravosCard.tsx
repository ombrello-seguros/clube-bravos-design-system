import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BravosCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}

export function BravosCard({ children, className, variant = 'default' }: BravosCardProps) {
  const variants = {
    default: 'bg-cb-surface text-cb-fg border border-cb-border',
    highlight: 'bg-cb-primary text-cb-surface'
  };

  return (
    <div className={clsx(
      'rounded-cb-card p-6 font-cb-body shadow-cb-card',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}
