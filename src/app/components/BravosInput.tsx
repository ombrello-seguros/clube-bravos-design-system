import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BravosInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function BravosInput({ label, error, className, ...props }: BravosInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-medium text-[#1a1a1a]">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
          'focus:outline-none focus:border-bravos-cyan focus:ring-2 focus:ring-bravos-cyan/20',
          error
            ? 'border-red-500'
            : 'border-gray-200 hover:border-gray-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
