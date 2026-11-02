# Frontend Starter Kit

A modular React + Vite starter for building frontends that talk to a REST API.
Designed to pair with the **Express Modular Skeleton** backend (access/refresh
token auth and simple roles), but usable with any similar API.

## Features

- **React 18 + Vite** (JavaScript)
- **Tailwind CSS v4** (via the official `@tailwindcss/vite` plugin)
- **React Router** with public, protected, and role-based routes
- **Auth flow**: login/register/logout with JWT access + refresh tokens
- **Centralized axios client** with automatic token attach and auto-refresh on 401
- **TanStack Query** for server state (caching, invalidation)
- **Zustand** for auth client state (persisted to localStorage)
- **React Hook Form + Zod** for forms and validation
- **Sonner** for toast notifications
- Reusable UI primitives (Button, Input, Card, Spinner)
- Error boundary and 404 page
- **ESLint + Prettier** preconfigured
- Path alias `@` -> `src`

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A running backend API (see `VITE_API_URL`)

## Getting Started

```bash
npm install
cp .env.example .env   # then set VITE_API_URL
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

### Environment Variables

| Variable       | Description                     | Example                 |
| -------------- | ------------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the backend API     | `http://localhost:3000` |

Only variables prefixed with `VITE_` are exposed to the client.

## Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the dev server                 |
| `npm run build`  | Production build                     |
| `npm run preview`| Preview the production build         |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Format `src` with Prettier           |

## How Auth Works

1. **Login** (`/users/login`) returns `accessToken` + `refreshToken`, stored in
   the Zustand auth store (persisted to localStorage).
2. The axios request interceptor attaches `Authorization: Bearer <accessToken>`
   to every request.
3. When a request returns **401**, the response interceptor calls
   `/users/refresh` once (queueing other failed requests), stores the new token
   pair, and retries. If refresh fails, the user is logged out and redirected to
   `/login`.
4. **Logout** (`/users/logout`) revokes the refresh token on the server and
   clears local state.

Routes are guarded by:

- `ProtectedRoute` - requires a valid access token.
- `RoleRoute` - requires a specific role (e.g. `admin`), mirroring the backend's
  `authorize(...roles)` middleware.

> Security note: tokens are stored in localStorage for simplicity, which is
> vulnerable to XSS. For stricter security, store the refresh token in an
> httpOnly cookie (requires backend changes).

## Project Structure

```
src/
├── main.jsx                # Entry: providers (Query, Router, Toaster)
├── App.jsx                 # Route definitions + guards + layouts
├── index.css               # Tailwind v4 entry + theme tokens
├── components/
│   ├── ui/                 # Reusable primitives (Button, Input, Card, Spinner)
│   ├── layout/             # AppLayout (app shell), AuthLayout
│   └── ErrorBoundary.jsx
├── features/
│   ├── auth/               # authStore, authService, useAuth, schemas
│   └── posts/              # EXAMPLE feature module (service, hooks, schema)
├── lib/                    # config, httpClient (axios), queryClient, cn
├── pages/                  # Login, Register, Dashboard, Posts, Users, NotFound
└── routes/                 # ProtectedRoute, RoleRoute
```

## Example Module (Posts)

The `posts` feature and the `Posts` page are an **example** showing the full
pattern: service -> React Query hooks -> form (RHF + Zod) -> page. Copy and
rename them to build real features (e.g. products, orders), then remove the
example.

## Notes

This starter is intentionally lean. Add things like dark mode, i18n, or testing
(Vitest + Testing Library) per project as needed.
