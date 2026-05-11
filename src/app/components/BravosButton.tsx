import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BravosButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function BravosButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BravosButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[rgb(0,164,213)] text-white hover:bg-[rgb(0,131,170)] shadow-md',
    secondary: 'bg-[rgb(230,230,230)] text-[#1a1a1a] hover:bg-[rgb(200,200,200)]',
    outline: 'border-2 border-[rgb(0,164,213)] text-[rgb(0,164,213)] hover:bg-[rgb(0,164,213)] hover:text-white',
    ghost: 'text-[rgb(0,164,213)] hover:bg-[rgb(0,164,213)]/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
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
