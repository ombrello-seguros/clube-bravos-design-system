# Button (`BravosButton`)

## When to use
Any interactive action — form submit, navigation trigger, CTA. One `primary` per section.

## Variants
| Variant | Usage | Visual |
|---|---|---|
| `primary` | main action | filled `bravos-cyan`, white text |
| `secondary` | supporting action | filled `bravos-gray-light` |
| `outline` | alternative action | `bravos-cyan` border + text |
| `ghost` | low-emphasis action | `bravos-cyan` text, no border |

## Props
| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

Also accepts native `button` attributes (`onClick`, `disabled`, `className`, …). Composes children freely (icons, multiple labels).

## Examples
```tsx
<BravosButton variant="primary" size="lg">Quero ser Bravos</BravosButton>
<BravosButton variant="outline">Voltar</BravosButton>
```

## Rules
- Do not hardcode brand colors — the variants already carry them.
- There is no neutral-outline variant; compose `outline` or `ghost` instead of inventing one.
