# dmoraes.org Agent Guide

Personal site. Server-rendered HTML with **no Remix component hydration** —
that stays deliberate. The one exception is a plain `<script>` pair in
`app/ui/layout.tsx` for the theme toggle; it talks to the DOM directly and
isn't a `clientEntry`. Before adding `clientEntry(...)` anywhere, or a second
inline script, be sure the interactivity genuinely can't be done with plain
HTML or extending the existing script.

Domain terms — Post, Quote, Resume, Layout — are defined in
[`CONTEXT.md`](./CONTEXT.md). Use those words; don't drift to synonyms.

## Commands

```sh
pnpm install
pnpm dev
pnpm check      # lint + typecheck + test
```

## Building features

Refer to [`.agents/skills/remix/SKILL.md`](./.agents/skills/remix/SKILL.md).
Start from `app/routes.ts` — it is the source of truth for every URL, and
`routes.<name>.href(...)` is how links are built everywhere else.

## Layout

- `app/routes.ts` — the URL contract, shared by server and (if ever) browser
- `app/router.ts` — middleware order and controller wiring
- `app/actions/controller.tsx` — top-level routes (home, quotes, feed, sitemap, resume)
- `app/actions/posts/` — the posts route map and its pages
- `app/data/` — post loading and quote data
- `app/ui/layout.tsx` — the one page shell; every route renders through it
- `app/utils/` — pure helpers (markdown, dates), testable without a router
- `content/posts/` — posts as markdown; **filename is the slug**

## Invariants

**The resume must stay private.** Two rules, both load-bearing:

1. Nothing in the site's markup, sitemap, or `robots.txt` may reference the
   resume path. A `Disallow` line would publish the secret.
2. The PDF is never committed. `private/` is gitignored and must stay that way.

A test asserts the first. See
[ADR-0001](./docs/adr/0001-private-resume-link.md) before touching that route.

**Posts group by year** so a sparse year still reads as an archive. Don't
replace that with a flat reverse-chronological list.

**Every page carries the same `SiteNav`** (`app/ui/site-nav.tsx`), right after
its own `<h1>`: all three sections, always, same order — the current one
renders as plain text (not a link), the other two as live links. Don't go
back to omitting the current section from the set: that was tried first and
read as broken rather than as a location marker. It replaced one-off
"← Home" / "← Posts" links at the bottom of a page — don't reintroduce those
either. The footer stays contact-only (email, GitHub, LinkedIn, theme
toggle); don't add section links there.

**`NODE_ENV=test` disables the asset watcher.** Without it the watcher holds
the process open and the test runner hangs instead of exiting.

**Inline scripts render via `innerHTML`, never `<script>{code}</script>`.**
JSX text children get HTML-escaped, which silently corrupts JavaScript
containing `&`, `<`, or `>`.

**Regenerating `public/apple-touch-icon.png`:** it's a rendered PNG, not
hand-drawn — there's no source file checked in. To rebuild after a palette
change, render a square (no `rx`, unlike `favicon.svg` — iOS applies its own
corner mask) version of the mark at 512px+ and downsize to exactly 180×180.

## Testing

Router tests drive `router.fetch(new Request(...))` and assert on the
`Response`; pure helpers are tested beside their module. Prefer one
representative test over many variants of the same assertion.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues, via the `gh` CLI. See
`docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label named after itself. See
`docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See
`docs/agents/domain.md`.
