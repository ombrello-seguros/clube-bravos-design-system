import { type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface BravosRadioCardOption<T extends string> {
  value: T;
  label: string;
  description?: string;
  meta?: ReactNode;
}

export interface BravosRadioCardsProps<T extends string> {
  name: string;
  value: T | undefined;
  onChange: (value: T) => void;
  options: readonly BravosRadioCardOption<T>[];
  columns?: 1 | 2 | 3;
}

const COLUNAS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
} as const;

export function BravosRadioCards<T extends string>({
  name,
  value,
  onChange,
  options,
  columns = 1,
}: BravosRadioCardsProps<T>) {
  return (
    <div className={clsx('grid gap-3', COLUNAS[columns])}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={clsx(
              'flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
              checked
                ? 'border-bravos-cyan bg-bravos-cyan/5'
                : 'border-gray-200 hover:border-gray-300',
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="mt-1 h-4 w-4 accent-bravos-cyan"
            />
            <div className="flex-1">
              <div className="font-medium text-[#1a1a1a]">{opt.label}</div>
              {opt.description && (
                <div className="text-sm text-gray-600 mt-0.5">{opt.description}</div>
              )}
              {opt.meta && <div className="mt-1">{opt.meta}</div>}
            </div>
          </label>
        );
      })}
    </div>
  );
}
