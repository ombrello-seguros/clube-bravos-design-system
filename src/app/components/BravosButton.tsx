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
    primary: 'bg-bravos-cyan text-white hover:bg-bravos-cyan-dark shadow-md',
    secondary: 'bg-bravos-gray-light text-foreground hover:bg-[rgb(200,200,200)]',
    outline: 'border-2 border-bravos-cyan text-bravos-cyan hover:bg-bravos-cyan hover:text-white',
    ghost: 'text-bravos-cyan hover:bg-bravos-cyan/10'
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
