# Wizard Footer (`BravosWizardFooter`)

## When to use
Bottom navigation bar of a multi-step form/wizard: progress summary on the left, actions on the right.
For a marketing-page footer use `BravosFooter` instead.

## Props
| Prop | Type | Notes |
|---|---|---|
| `summary` | `string` | left text, e.g. `"v4 · 5 seções · 18 campos"` |
| `children` | `ReactNode` | right-aligned action buttons — compose with `BravosButton` |

It is a layout shell. Back/next labels, icons, disabled and click state all live on the buttons you
pass as children — the footer does not parameterize them.

## Examples
```tsx
import { ArrowRight } from 'lucide-react';

<BravosWizardFooter summary="v4 · 5 seções · 18 campos">
  <BravosButton variant="outline" onClick={back}>Voltar</BravosButton>
  <BravosButton variant="primary" onClick={next}>
    Próximo step <ArrowRight className="w-3.5 h-3.5" /> Revisão
  </BravosButton>
</BravosWizardFooter>
```

First step → omit the back button. Last step → use a plain `Concluir` primary button.

## Rules
- Compose actions as children; do not request new props for labels/variants.
