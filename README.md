# Surf House Imsouane — Retreat

Marketing and booking site for the surf house in Imsouane, Morocco.

Built with the same stack and conventions as `waveclubs_booking`: Next.js 16
(App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 with shadcn
(`base-nova`) on Base UI, and Redux Toolkit + RTK Query for state.

## Getting started

```bash
nvm use            # Node 22, per .nvmrc
npm install
cp .env.example .env.local
npm run dev
```

The dev server runs on http://localhost:3000.

## Layout

| Path              | Holds                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `src/app`         | Routes only — route groups, layouts, pages, parallel slots        |
| `src/features`    | One folder per domain: slice, api, schemas, hooks, components     |
| `src/components`  | Cross-feature UI — `layout`, `shared`, and shadcn `ui` primitives |
| `src/lib`         | Framework-agnostic plumbing — `api`, `constants`, `data`, `utils` |
| `src/store`       | Store composition and typed hooks                                |
| `src/styles`      | `globals.css` — Tailwind entry, theme tokens, brand palette       |
| `docs/plans`      | Implementation plans written before the code they describe        |

## State

`src/store/index.ts` builds a fresh store per request. Features own their
slices and inject their endpoints into the single RTK Query api slice in
`src/lib/api/api.ts` — never call `createApi` a second time, or the cache and
cross-feature invalidation split in two.

There is no backend yet. Content lives as typed data in `src/lib/data`, so
swapping a page over to a real endpoint later is a change of hook, not of
architecture.
