import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

/**
 * Classes do controle de formulário — compartilhadas por Input, Select e por
 * controles que o consumidor monta em cima de libs próprias (máscara, datepicker).
 * Exportada pra que esses casos não recopiem a string e saiam do tema.
 */
export function bravosControlClassName(error?: boolean | string, className?: string) {
  return clsx(
    'w-full px-4 py-3 rounded-cb-control border bg-cb-surface text-[15px] text-cb-fg placeholder:text-cb-fg-3 transition-colors duration-200 disabled:bg-cb-off-bg disabled:text-cb-fg-3',
    'focus:outline-none focus:border-cb-primary focus:ring-2 focus:ring-cb-primary/20',
    error ? 'border-cb-bad-dot' : 'border-cb-border hover:border-cb-fg-3',
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
    <div className="w-full font-cb-body">
      {label && <label className="block mb-2 text-sm font-medium text-cb-fg">{label}</label>}
      <input ref={ref} className={bravosControlClassName(error, className)} {...props} />
      {typeof error === 'string' && error && <p className="mt-1 text-sm text-cb-bad-fg">{error}</p>}
    </div>
  ),
);
BravosInput.displayName = 'BravosInput';
