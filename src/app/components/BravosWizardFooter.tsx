import { ReactNode } from 'react';

interface BravosWizardFooterProps {
  /** Left-aligned progress summary, e.g. "v4 · 5 seções · 18 campos". */
  summary: string;
  /** Action buttons, right-aligned — compose with BravosButton (e.g. back + next). */
  children: ReactNode;
}

/** Bottom navigation bar for multi-step forms — progress summary on the left, composed actions on the right. */
export function BravosWizardFooter({ summary, children }: BravosWizardFooterProps) {
  return (
    <div className="bg-cb-surface border-t border-cb-border flex flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-4 font-cb-body">
      <p className="text-cb-fg-3 text-[13px] font-cb-caption font-medium whitespace-nowrap">{summary}</p>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
