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
    <div className="bg-white border-t border-border flex items-center justify-between px-8 py-4">
      <p className="text-muted-foreground text-[13px] font-medium whitespace-nowrap">{summary}</p>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
