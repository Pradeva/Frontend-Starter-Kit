# Frontend Starter Kit

A modular **Next.js (App Router)** starter for building frontends that talk to a
REST API. Designed to pair with the **Express Modular Skeleton** backend
(access/refresh token auth and simple roles), but usable with any similar API.

## Features

- **Next.js 15 (App Router) + React 18** (JavaScript)
- **Tailwind CSS v3**
- **Route groups** for auth and app shells, with client-side route guards
- **Auth flow**: login/register/logout with JWT access + refresh tokens
- **Centralized axios client** with automatic token attach and auto-refresh on 401
- **TanStack Query** for server state (caching, invalidation)
- **Zustand** for auth client state (persisted to localStorage)
- **React Hook Form + Zod** for forms and validation
- **Sonner** for toast notifications
- Reusable UI primitives (Button, Input, Card, Spinner)
- `error.jsx` + `not-found.jsx` for error handling
- Path alias `@` -> `src`

## Why Next.js (not Vite)

Vite relies on running the `esbuild.exe` binary, which is blocked by group
policy on the target dev machine. Next.js uses a native addon (`@next/swc`,
a `.node` file loaded into Node rather than a spawned `.exe`), so it installs
and runs where Vite could not. The app is still a client-rendered SPA-style UI
that consumes the REST backend.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.18 or later)
- A running backend API (see `NEXT_PUBLIC_API_URL`)

## Getting Started

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_API_URL
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000) by default.
Note: if your backend also runs on port 3000, run one of them on a different
port (e.g. start Next with `next dev -p 3001`, or change the backend port).

### Environment Variables

| Variable              | Description                 | Example                 |
| --------------------- | --------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:3000` |

Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Scripts

| Script           | Description                  |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start the dev server         |
| `npm run build`  | Production build             |
| `npm start`      | Run the production build     |
| `npm run lint`   | Run ESLint (next lint)       |
| `npm run format` | Format `src` with Prettier   |

## How Auth Works

1. **Login** (`/users/login`) returns `accessToken` + `refreshToken`, stored in
   the Zustand auth store (persisted to localStorage).
2. The axios request interceptor attaches `Authorization: Bearer <accessToken>`
   to every request.
3. On **401**, the response interceptor calls `/users/refresh` once (queueing
   other failed requests), stores the new token pair, and retries. If refresh
   fails, the user is logged out and redirected to `/login`.
4. **Logout** (`/users/logout`) revokes the refresh token and clears state.

Route protection:

- `AuthGuard` - wraps the `(app)` group; requires a valid access token.
- `RoleGuard` - wraps admin-only pages (e.g. `/users`), mirroring the backend's
  `authorize(...roles)` middleware.

> Security note: tokens are stored in localStorage for simplicity, which is
> vulnerable to XSS. For stricter security, store the refresh token in an
> httpOnly cookie (requires backend changes).

## Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── providers.jsx       # Client providers (Query, Toaster)
│   ├── page.jsx            # "/" -> redirect to /dashboard
│   ├── error.jsx           # Error boundary (App Router convention)
│   ├── not-found.jsx       # 404 page
│   ├── (auth)/             # Auth route group (login, register)
│   └── (app)/              # Protected route group (dashboard, posts, users)
├── components/
│   ├── ui/                 # Button, Input, Card, Spinner
│   └── guards/             # AuthGuard, RoleGuard
├── features/
│   ├── auth/               # authStore, authService, useAuth, schemas
│   └── posts/              # EXAMPLE feature module (service, hooks, schema)
└── lib/                    # config, httpClient (axios), queryClient, cn
```

## Example Module (Posts)

The `posts` feature and the `/posts` page are an **example** showing the full
pattern: service -> React Query hooks -> form (RHF + Zod) -> page. Copy and
rename them to build real features, then remove the example.

## Notes

This starter is intentionally lean. Add dark mode, i18n, or tests
(Vitest/Jest + Testing Library) per project as needed.
