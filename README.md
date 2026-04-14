# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment variables

This project uses Vite env vars for backend/API configuration so you can easily switch between development and production.

Variables used:

- `VITE_API_BASE_URL`: Base URL used by frontend requests in `src/api/client.js` (example: `/api` when using Vite proxy, or full URL in production).
- `VITE_API_PROXY_PREFIX`: Path prefix intercepted by Vite dev server proxy (example: `/api`).
- `VITE_API_PROXY_TARGET`: Backend target URL for Vite dev proxy (example: `http://localhost:3000`).

Define these in your existing env setup (for example, in your current `.env` strategy) without adding extra env files if you prefer a simpler workflow.

Run in development:

```bash
pnpm dev
```

Build for production (uses the same `.env` values at build time):

```bash
pnpm build
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
