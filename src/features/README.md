# Features

One folder per domain. A feature owns everything about itself and exports the
pieces other layers are allowed to touch:

```
<feature>/
  <feature>Slice.ts     Redux state, registered in src/store/index.ts
  <feature>Api.ts       api.injectEndpoints(...) — never a second createApi
  selectors.ts          Derived reads, so components don't reach into state shape
  schemas/              Zod schemas shared by forms and API parsing
  hooks/                Feature-specific hooks composed from the above
  components/           UI that only this feature uses
  types.ts              Domain types
```

Anything two features both need moves up: shared UI to `src/components/shared`,
plumbing to `src/lib`. `src/app` holds routes only — a page should be a thin
composition of feature components.
