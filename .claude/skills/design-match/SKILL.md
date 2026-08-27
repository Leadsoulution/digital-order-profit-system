---
name: design-match
description: Use this skill on EVERY UI task in this project — building components, pages, or styling. It enforces the exact design tokens (colors, fonts, spacing, radius, shadows) extracted from reference screenshots so every screen stays visually consistent with the target design. Trigger whenever creating or editing any React/Next.js component, page, or CSS.
---

# Design Match — Reproduce the reference design exactly

## Rule 0 — When the user sends a screenshot
Before writing ANY code, extract and confirm these from the image:
- **Fonts**: family name, weights used (400/500/600/700), letter-spacing
- **Colors**: every color as a HEX code (background, text, primary, secondary, borders, hover states)
- **Spacing**: padding/margins scale (4, 8, 12, 16, 24, 32...)
- **Radius**: border-radius on buttons, cards, inputs
- **Shadows**: box-shadow style (soft/hard, blur, color)
- **Typography scale**: h1, h2, body, small — sizes in px/rem

If a font can't be identified from the screenshot, ASK the user or suggest the closest Google Font match — never guess silently.

## Rule 1 — Always use the tokens file
All styling MUST reference the tokens below. Never hardcode a color or size inline that isn't in this system. If the design needs a new value, add it to the tokens file first, then use it.

Create/maintain `styles/design-tokens.css`:

```css
:root {
  /* COLORS — replace with values extracted from the screenshot */
  --color-bg: #FFFFFF;
  --color-surface: #F7F7F8;
  --color-text: #111111;
  --color-text-muted: #6B7280;
  --color-primary: #000000;
  --color-primary-hover: #1A1A1A;
  --color-border: #E5E7EB;

  /* RADIUS */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* SPACING */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* SHADOWS */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);

  /* TYPOGRAPHY */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-h1: 2rem;
  --text-h2: 1.5rem;
  --text-body: 1rem;
  --text-sm: 0.875rem;
}
```

## Rule 2 — Google Fonts setup (Next.js)
Use `next/font/google` — it's faster and avoids layout shift. In `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

Replace `Inter` with the actual font identified from the screenshot. To find it: use WhatFontIs.com or Fontjoy, then confirm it exists on Google Fonts.

## Rule 3 — If using Tailwind
Map the tokens into `tailwind.config.js` so utility classes use the design system:

```js
theme: {
  extend: {
    colors: {
      bg: 'var(--color-bg)',
      surface: 'var(--color-surface)',
      primary: 'var(--color-primary)',
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
    },
    fontFamily: {
      sans: 'var(--font-sans)',
    },
  },
}
```

## Rule 4 — Self-check before finishing
Before ending any UI task, verify:
- [ ] No hardcoded hex colors outside the tokens file
- [ ] Font matches the reference (family + weights)
- [ ] Radius, spacing, shadows come from tokens
- [ ] Component visually matches the screenshot (compare side by side)

If anything drifts from the reference, fix it before delivering.
