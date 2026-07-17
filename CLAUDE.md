# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js (App Router) frontend for a smart-housing/society-management system: complaints, voting/elections, surveillance, user management, real-time dashboard, and chat. Originally based on a generic "Next.js Enterprise Starter Kit" boilerplate, now wired to a real backend API.

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build (fails on TS errors — ignoreBuildErrors: false)
npm run start            # Start production server
npm run lint             # next lint
npm run format           # prettier --write .
npm run lint:format      # prettier --check .

npm test                 # jest --passWithNoTests
npm run test:watch
npm run test:unit        # jest __tests__/unit
npm run test:integration # jest __tests__/integration
npm run test:e2e         # jest __tests__/e2e

# Run a single test file
npx jest __tests__/unit/auth-validation.test.ts

npm run storybook        # Storybook dev server on :6006
npm run build-storybook
```

Pre-commit hook (Husky + lint-staged) runs `prettier --write` on staged `.{js,jsx,ts,tsx,json,css,md}` files — don't bypass with `--no-verify`.

There are two separate test runners: **Jest** (`__tests__/{unit,integration,e2e}`, configured in `jest.config.ts`, uses `ts-jest` + `jsdom`) for app logic, and **Vitest** (`vitest.config.ts`) wired specifically to Storybook's addon-vitest for component/story tests.

## Architecture

### Routing & i18n

- App Router with a single dynamic `[locale]` segment: all real routes live under `app/[locale]/`. Supported locales: `en`, `ur`, `ar` (defined in `i18n/routing.ts`), default `en`. `ur`/`ar` are RTL — `app/[locale]/layout.tsx` sets `dir="rtl"` and swaps in RTL-specific fonts.
- `proxy.ts` is the Next.js middleware (note: not named `middleware.ts`, but serves that role per `next.config.mjs`/Next conventions here). It layers custom auth/route-guarding logic _before_ delegating to `next-intl`'s `createMiddleware`:
  - Reads `auth_token` / `user_logged_in` cookies to determine auth state.
  - Redirects `/` to `/{locale}/login` or `/{locale}/` based on auth.
  - Gates `/otp` and `/reset` pages behind an `auth_flow` cookie (JSON: `{ step, resetToken }`) representing where the user is in the login/reset flow.
  - Hardcodes locale matching as `(en|ur)` in several regexes — note `ar` exists in routing config but isn't included in some of these middleware regexes; check both when adding routes.
- Route groups: `app/[locale]/(auth)/{login,signup,forgot,otp,reset}` for the auth flow.
- Feature modules each follow the same shape: `app/[locale]/<feature>/{page.tsx, components/, types/}` (e.g. `dashboard`, `complaints`, `voting`, `users`, `surveillance`, `chat`, `chatbot`, `home`).

### Layout system

Two layout types only — `website` (Header + Footer) and `dashboard` (Header + Sidebar, footer off by default) — defined in `components/layout/types/layout.ts` (`LAYOUT_CONFIGS`). `contexts/layout-context.tsx` provides `LayoutProvider`, persists the chosen type to `localStorage` (`storage` helper from `lib/actions/actions.ts`), and exposes split contexts for actions vs. frequently-changing state (perf optimization — read from the right one). `components/layout/dynamic-layout.tsx` renders the actual chrome (fixed sidebar/header, RTL-aware via logical `start-0`/`end-0` Tailwind classes) based on the active config.

### Auth

Auth state is intentionally duplicated/reconciled across three layers:

1. **Middleware** (`proxy.ts`) — cookie-based, server-side route gating.
2. **`AuthGuard`** (`lib/auth/auth-guard.tsx`) — client component wrapper checking Redux `state.login.isAuthenticated` OR a cookie token; redirects client-side if neither holds.
3. **`useAuth`** hook (`hooks/use-auth.ts`) — merges Redux state with `js-cookie`-read cookies (`user_logged_in`, `auth_token`, `user_email`, `user_id`, etc.), polling every 2s while the tab is visible to stay in sync with cookie changes made outside Redux (e.g. by the axios interceptor).

`lib/axios/axios-instance.ts` attaches the bearer token from `getToken()` (`lib/cookie/cookie.ts`) on every request, and on a `401` response clears the token and force-redirects to `/{locale}/login` — _unless_ the current path matches a public-route allowlist hardcoded there. When adding new public pages, update this allowlist as well as the middleware's `publicRoutes`/`protectedRoutes` lists — they are not shared/derived from one source.

### State management

- Redux Toolkit store in `redux/store.ts`, slices in `redux/slices/*` (one per domain: `login`, `signup`, `users`, `complaints`, `voting`, `dashboard`). Slices follow a consistent pattern: `createAsyncThunk` per API call hitting `axiosInstance`, with manual snake_case ⟷ PascalCase mapping where the backend's enum casing differs from the frontend's (see `complaint-slice.ts` status mapping).
- `redux-persist` persists **only** the `login` slice to `localStorage` (see `whitelist: ["login"]` in `store.ts`); other slices are refetched per-session.
- React Query (`@tanstack/react-query`) is also a dependency for server-state — check call sites before assuming Redux thunks are the only data-fetching pattern in a given feature.

### Forms

A schema-driven form system: `components/form/base-form.tsx` maps a `FormField[]` schema (types: `text/email/password/number/textarea/select/multiselect/radio/checkbox/toggle/file/date/range/color/tags/richtext/dynamicselect/repeatable/section`) to field components in `components/form/fields/`, via the `FieldComponents` registry and `useBaseForm` (`hooks/use-base-form.tsx`, built on `react-hook-form` + `zod`). Validation schemas live in `validations/` (re-exported from `validations/index.ts`). Prefer extending the `FormField` schema/registry over hand-rolling a new form when a feature needs one.

### Real-time

`socket/` abstracts over two transports behind one interface: Socket.IO (`socket.io.ts`) and native WebSocket (`websocket.ts`), selected by `socketConfig.mode` in `socket/config.ts`. `socket/index.ts` is the single entry point (`initializeSocket`, `getActiveSocket`, `closeSocketConnection`, `isSocketConnected`) — don't import the transport-specific modules directly from feature code. There's a local Express test server referenced for Socket.IO testing (see `app/[locale]/socket-test`) and a `socket.integration.test.ts`.

### UI components

shadcn/ui (`new-york` style, configured in `components.json`) under `components/ui/`, one subdirectory per primitive, built on Radix UI primitives + `class-variance-authority` + Tailwind. Path aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks` (see `components.json` aliases and `tsconfig.json`'s `@/*` → repo root mapping). Tailwind v4 (CSS-based config, no `tailwind.config.js`) with logical properties used throughout for RTL support (`start-`/`end-` instead of `left-`/`right-`).

### Logging

`logger/logger.ts` wraps Pino for structured logging; used client-side and guarded by `typeof window !== "undefined"` checks in hooks to avoid double-logging during SSR.

### Other integrations

- Firebase (`lib/firebase/firebase.ts`) — push notifications (`providers/firebase-notification-provider.tsx`).
- Google OAuth via `@react-oauth/google` — note the COOP/COEP headers explicitly added in `next.config.mjs` to keep the OAuth popup working.
- `NEXT_PUBLIC_BASE_URL` env var sets the API base URL (defaults to a hardcoded Vercel-hosted backend if unset — don't rely on that default in new code, expect it to be reconfigured).
