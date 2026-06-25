# Color

Values live once in `src/styles/theme.css`. These docs name tokens, they don't redefine values.
Reference colors by their Tailwind utility (`bg-bravos-cyan`), never by literal `rgb()`/`#hex`.

## Brand authority: manual → site → lib

The brand manual (`src/imports/manual_da_marca_clube_bravos.pdf`) is the top authority and defines
**only two colors**. The site is the authority for off-manual colors. The lib follows both.

| Role | Token / class | Value | Authority |
|---|---|---|---|
| Primary (cyan) | `bravos-cyan` | `rgb(0,164,213)` · Pantone 312C | manual |
| Neutral (gray) | `bravos-gray` | `rgb(157,157,156)` | manual |
| Dark sections / titles (purple) | `bravos-purple` | `#2C2879` | off-manual — site (prices) |
| Rating / accent (yellow) | `bravos-yellow` | — | off-manual |
| WhatsApp only (green) | `bravos-green` | — | off-manual — external brand |
| Cyan tints (hover) | `bravos-cyan-light` / `bravos-cyan-dark` | — | derived from official cyan |
| Gray tints | `bravos-gray-light` / `bravos-gray-dark` | — | derived from official gray |

Semantic aliases map to the palette: `bg-primary`, `bg-secondary`, `bg-muted`, `text-foreground`,
`border-border`, `ring-ring`.

## Rules

- **Never invent a new brand color.** If a value is near an official one, snap to the token.
- Cyan is the primary action color. Purple is for dark/title surfaces. Green is WhatsApp-only.
- Off-manual colors (purple/yellow/green) are kept deliberately — do not add more without a brand decision.
