import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BravosButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export function BravosButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BravosButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-cb-control font-cb-body font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-cb-primary text-cb-surface hover:bg-cb-primary-text',
    secondary: 'bg-cb-seg text-cb-fg hover:bg-cb-border',
    outline: 'border border-cb-border bg-cb-surface text-cb-primary-text hover:bg-cb-primary-tint',
    ghost: 'text-cb-primary-text hover:bg-cb-primary-tint',
    neutral: 'bg-cb-surface text-cb-fg border border-cb-border hover:bg-cb-ground'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-[15px]',
    lg: 'px-6 py-4 text-base'
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
