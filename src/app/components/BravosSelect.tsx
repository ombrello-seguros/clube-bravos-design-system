import { forwardRef, type SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { bravosControlClassName } from './BravosInput';

export interface BravosSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string;
}

export const BravosSelect = forwardRef<HTMLSelectElement, BravosSelectProps>(
  ({ error, className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(bravosControlClassName(error), 'bg-white appearance-none pr-10', className)}
      {...props}
    >
      {children}
    </select>
  ),
);
BravosSelect.displayName = 'BravosSelect';
