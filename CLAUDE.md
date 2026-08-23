# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a Next.js project scaffolded with `create-next-app` and not yet customized — `src/app/page.tsx` and `layout.tsx` are still the default starter content. The repo is named "dops" (Digital Order Profit System per the working directory name), but no domain-specific code has been written yet. There is no database, API layer, or state management in place. Treat early work here as greenfield: architectural decisions are still open.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`)

There is no test runner configured yet.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict mode), Tailwind CSS v4
- Path alias `@/*` maps to `src/*` ([tsconfig.json](tsconfig.json))
- Tailwind is configured via the `@tailwindcss/postcss` plugin and CSS `@theme` tokens in [src/app/globals.css](src/app/globals.css) — no `tailwind.config` file (Tailwind v4 style)
- ESLint uses `eslint-config-next`'s flat configs (`core-web-vitals` + `typescript`)

## Design fidelity rules

The user is providing a reference video of a platform whose design DOPS must replicate as faithfully as possible: same structure, layout, sidebar, colors, spacing, sizes, button styles, cards, tables, icons (or visually equivalent ones), typography (or closest match), borders/radii/shadows, interactions/animations visible in the video, and responsive behavior.

- **Do not** change the existing design or invent a new design on your own initiative. The reference video is the primary source of truth for design.
- Feature requests will come one at a time (e.g. "Add Products to the sidebar"). For each request:
  - Analyze the existing code first; identify components and styles already in use.
  - Reuse existing components, colors, spacing, buttons, tables, and styles as much as possible.
  - Make only the requested change — nothing more.
  - Do not rebuild or redesign the whole app.
  - Do not change colors or theme.
  - Do not change existing structure unless necessary for the request.
  - Do not remove any existing functionality.
  - Do not add unrequested features.
- Priority order: fidelity to the reference design > preserving existing code/functionality > minimal modification > adding only what was asked.
- Before any significant change, verify the implementation still matches the reference design.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
