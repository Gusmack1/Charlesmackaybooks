## Cursor Cloud specific instructions

### Overview

Single Next.js 16 e-commerce app (no monorepo, no database, no Docker). Aviation history bookstore by Charles E. MacKay. Book catalogue is hardcoded in `src/data/books.ts`; orders stored in `data/orders.json` (file-based).

### Development

See `README.md` for standard commands. Key scripts in `package.json`.

- **Dev server**: `npx next dev -H 0.0.0.0 --webpack` (port 3000)
- **Build**: `npm run build` (uses webpack; runs `docs:books` via prebuild hook)
- **Lint**: `npx eslint src/` (the `npm run lint` / `next lint` subcommand is removed in Next.js 16; use ESLint directly)

### Gotchas

- **Turbopack CSS parse error**: The default `npm run dev` uses `--turbopack`, which fails with a CSS parsing error in compiled Tailwind output (`globals.css` line ~3463, `:hoverbutton` pseudo-class). Use `--webpack` flag for dev mode until this is resolved: `npx next dev -H 0.0.0.0 --webpack`.
- **`critters` module**: The `optimizeCss` experimental feature requires `critters`. It is not listed in `package.json` but is needed at runtime. Run `npm install critters` if you see `Cannot find module 'critters'`.
- **Node.js version**: `.nvmrc` specifies Node 20. Use `nvm use 20` or ensure Node 20 is active.
- External services (Stripe, PayPal, OpenAI, Serper) are optional; the app runs and renders fully without them.
