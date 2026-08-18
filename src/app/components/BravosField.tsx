import { type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface BravosFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Rótulo + obrigatoriedade + dica + mensagem de erro em volta de um controle.
 * O controle vai como `children` (BravosInput sem `label`, BravosSelect,
 * BravosRadioCards, ou um controle do próprio consumidor).
 */
export function BravosField({
  label,
  htmlFor,
  error,
  required,
  hint,
  className,
  children,
}: BravosFieldProps) {
  return (
    <div className={clsx('w-full', className)}>
      <label htmlFor={htmlFor} className="block mb-2 font-medium text-[#1a1a1a] text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
