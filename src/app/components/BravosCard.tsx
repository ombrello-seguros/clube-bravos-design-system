import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BravosCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}

export function BravosCard({ children, className, variant = 'default' }: BravosCardProps) {
  const variants = {
    default: 'bg-white border border-gray-200',
    highlight: 'bg-gradient-to-br from-[rgb(0,164,213)] to-[rgb(0,131,170)] text-white'
  };

  return (
    <div className={clsx(
      'rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}
