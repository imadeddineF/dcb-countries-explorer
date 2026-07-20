# Countries Explorer

My submission for the DCB Software frontend & mobile technical test: a cross-platform
"Countries Explorer" built as an Expo mobile app (the main focus) plus a small Next.js
web companion, both consuming the REST Countries API through a single shared
TypeScript layer.

## Stack & versions

| | |
|---|---|
| Node | 22.x (built on 22.23.1) |
| Package manager | pnpm 10 (workspaces monorepo, `node-linker=hoisted` for Metro) |
| Mobile | Expo SDK 57 (React Native 0.86), Expo Router, `@expo/ui`, TanStack Query v5, i18n-js |
| Web | Next.js 16.2 (App Router + Turbopack), React 19, Tailwind CSS v4, next-intl, next-themes, TanStack Query v5 |
| Shared | Plain TypeScript package (`@dcb/shared`), tested with Vitest |

## Project structure

```
mobile/   Expo app — screens, navigation, theme, i18n (per-route JSON files)
web/      Next.js companion — [locale] routes, i18n, dark mode, countries pages
shared/   @dcb/shared — types, constants, services, mappers, utils, hooks + unit tests
```

## Heads-up: the API needs a (free) key now

The test brief links restcountries.com, but the public v3.1 API was shut down in 2026 —
every endpoint now returns a deprecation error. I migrated the whole data layer to the
new **v5 API**, which works on a free plan but requires a key:

1. Sign up at https://restcountries.com/sign-up and grab your `rc_live_...` key.
2. In the dashboard (API keys → CORS allowed origins) add `localhost` — browser
   requests are origin-checked, native requests are not.
3. Create the env files (examples are committed):

```bash
# mobile/.env
EXPO_PUBLIC_RESTCOUNTRIES_KEY=rc_live_your_key

# web/.env
NEXT_PUBLIC_RESTCOUNTRIES_KEY=rc_live_your_key
```

## Running the mobile app

```bash
pnpm install          # once, at the repo root
pnpm --filter mobile start
```

Then press `i` (iOS simulator), `a` (Android emulator), or scan the QR code.
If you change `.env`, restart with `npx expo start -c` — Expo inlines env vars at
bundle time.

## Running the web app

```bash
pnpm install          # if you haven't already
pnpm --filter web dev
```

Open http://localhost:3000 — you'll be redirected to `/en` (or your browser language).

## Running the tests

```bash
pnpm --filter @dcb/shared test
```

11 unit tests across 4 files: the country mapper (v5 shape → domain model, primary
capital selection, missing-field tolerance, sorting), the population formatter, the
search filter, and the `useDebounce` hook (rendered with Testing Library and fake
timers).

## What's shared between mobile and web

Everything that isn't UI lives in `@dcb/shared`:

- **Types** — the raw v5 API shape and the normalized `Country` domain model.
- **HTTP client** — a small `fetch` wrapper with timeout, Bearer auth, abort-signal
  forwarding and typed `ApiError`s (it surfaces the API's own error messages).
- **Services** — `getCountries` (with pagination) and `getCountryByCode`.
- **Mapper** — normalizes v5's nested objects and drops non-ISO entities.
- **React Query hooks** — `useCountries` / `useCountry` with centralized query keys,
  plus `useDebounce`.
- **Utils** — `formatPopulation` (Intl-based) and `filterCountries` (the search logic).

UI components are deliberately *not* shared — React Native and web render differently
enough that forcing it costs more than it saves. Both apps are thin: screens call the
same hooks and render platform-native UI around the same data.

## Technical decisions

- **TanStack Query for server state.** One fetch of the full list is cached for an
  hour (countries don't change often); the detail screen gets its own cached query.
  Loading/error/empty states come straight from query status, and the retry buttons
  just call `refetch()`.
- **Search is client-side.** The full dataset (~250 rows) is already in the cache, so
  filtering locally is instant and spends zero extra API requests from the free-tier
  quota. The 300ms debounce still gates the filtering. I extended matching beyond
  names to region and capital because those fields are visible in the list — typing
  "africa" should match African countries, not just two name substrings.
- **Pagination against the free-plan cap.** v5 caps free requests at 100 objects, so
  `getCountries` pages through with `limit`/`offset` following `meta.more` until done.
- **FlashList instead of FlatList.** Same API surface including `keyExtractor` (the
  ISO alpha-3 code), better recycling performance on long lists. Swapping back is a
  one-line change if strict FlatList is preferred.
- **i18n with per-route JSON files.** Each route folder owns its translations
  (`i18n/en.json` etc.); a small merge script combines them into the locale bundles.
  Mobile uses i18n-js with device-language detection (expo-localization) and
  AsyncStorage persistence; web uses next-intl with `[locale]` routing — web i18n was
  optional in the brief, so that one's a bonus. English, Spanish and French.
- **Theming.** Mobile has a centralized theme (light/dark, persisted with
  AsyncStorage) consumed by all screens; web uses next-themes with a class-based
  Tailwind dark mode.
- **React pinned to 19.2.3 in shared's dev deps** — the hoisted workspace layout
  (required by Metro) otherwise resolves two React copies and breaks renderHook.

## Trade-offs & simplifications

- **PNG flags** from the API rather than an SVG library — the brief explicitly accepts
  this; SVG rendering was the bonus I cut for time.
- **The API key ships in the client bundles.** For a public read-only API on a free
  plan, guarded by the dashboard's origin allowlist, that's acceptable here. In
  production I'd proxy through a Next.js Route Handler so the key stays server-side.
- **Substring search, not fuzzy.** v5 has a fuzzy `?q=` endpoint, but using it would
  trade cached instant results for per-query network calls.
- **No E2E tests** — unit tests cover the shared domain layer, which is where the
  logic lives; the screens are thin by design.
- **Non-ISO territories are filtered out** of the list (they come back from v5 with no
  alpha-3 code and no flag, which would break stable list keys and detail navigation).
