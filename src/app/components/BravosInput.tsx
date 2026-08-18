import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

/**
 * Classes do controle de formulário — compartilhadas por Input, Select e por
 * controles que o consumidor monta em cima de libs próprias (máscara, datepicker).
 * Exportada pra que esses casos não recopiem a string e saiam do tema.
 */
export function bravosControlClassName(error?: boolean | string, className?: string) {
  return clsx(
    'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
    'focus:outline-none focus:border-bravos-cyan focus:ring-2 focus:ring-bravos-cyan/20',
    'disabled:bg-gray-100 disabled:cursor-not-allowed',
    error ? 'border-red-500' : 'border-gray-200 hover:border-gray-300',
    className,
  );
}

export interface BravosInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Rótulo interno. Omita ao compor com `BravosField`, que já rotula. */
  label?: string;
  /** `string` mostra a mensagem abaixo; `true` só pinta a borda (a mensagem fica com quem compõe). */
  error?: boolean | string;
}

export const BravosInput = forwardRef<HTMLInputElement, BravosInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block mb-2 font-medium text-[#1a1a1a]">{label}</label>}
      <input ref={ref} className={bravosControlClassName(error, className)} {...props} />
      {typeof error === 'string' && error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  ),
);
BravosInput.displayName = 'BravosInput';
