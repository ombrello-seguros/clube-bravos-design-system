# Typography

## Fonts

The brand manual specifies **Geometos** for titles and **Arial** for body text. The lib substitutes
**Poppins** for Geometos (Geometos is a commercial font, hard to serve as a webfont).

- **Headings** — apply Poppins explicitly: `style={{ fontFamily: 'var(--font-heading)' }}`.
- **Body** — Arial, the default. No style needed.
- Do not introduce other heading fonts.

Poppins is loaded by the consuming app via `<link>` (the shipped `fonts.css` only declares the vars).

## Type scale

Tokens in `:root` (`theme.css`): `--text-xs` (12px) … `--text-6xl` (60px). Prefer Tailwind's own
text utilities (`text-sm`, `text-4xl`); reach for the vars only when you need an exact step.

Base font-size is 16px. `h1`–`h4`, `label`, `button`, `input` have default sizes in `@layer base`,
overridable by Tailwind text utilities.
