# dmoraes.org Agent Guide

Personal site. Server-rendered HTML with **no Remix component hydration** —
that stays deliberate. The one exception is a plain `<script>` pair in
`app/ui/layout.tsx` for the theme toggle; it talks to the DOM directly and
isn't a `clientEntry`. Before adding `clientEntry(...)` anywhere, or a second
inline script, be sure the interactivity genuinely can't be done with plain
HTML or extending the existing script.

Every navigation is a real, full page load — there's no client-side router.
The `@view-transition { navigation: auto; }` rule in `THEME_TOKENS_CSS`
(`app/ui/layout.tsx`) gets a light cross-fade between pages anyway, via the
browser's native Cross-Document View Transitions — pure CSS, no JS, and
unsupported browsers just navigate normally. This was chosen deliberately
over adopting client-side routing (which sites like kentcdodds.com and
kody.codes use, and is a real, non-trivial architecture change) to get
transition polish without giving up the no-hydration invariant above.

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
- `app/router.tsx` — middleware order, controller wiring, and the agent-friendly 404 (`defaultHandler`)
- `app/actions/controller.tsx` — top-level routes (home, quotes, about, contact, privacy, feed, sitemap, resume)
- `app/actions/posts/` — the posts route map and its pages
- `app/data/` — post loading and quote data
- `app/ui/layout.tsx` — the one page shell; every route renders through it
- `app/utils/` — pure helpers (markdown, dates, `Accept` content negotiation), testable without a router
- `content/posts/` — posts as markdown; **filename is the slug**
- `public/llms.txt` — what this site is and when an agent should reach for it

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
its own `<h1>` — no exceptions, including utility pages like the 404,
`/privacy`, `/about`, and `/contact` that aren't one of the three sections
themselves. All three sections, always, same order — the current one renders
as plain text (not a link), the other two as live links; `current` is
optional, and on a page that isn't one of the three sections, all three
render as plain links since none of them is current. Don't go back to
omitting the current section from the set: that was tried first and read as
broken rather than as a location marker. It replaced one-off "← Home" /
"← Posts" links at the bottom of a page — don't reintroduce those either.
The footer stays contact-only (Twitter, email, GitHub, LinkedIn, theme
toggle); don't add section links there. `/privacy`, `/about`, and `/contact`
aren't SiteNav's three sections or in the footer — each is reachable via the
sitemap, `llms.txt`, and direct links, but still carries SiteNav on the page.
A new utility/trust-anchor page follows this same shape: real content, own
route, outside SiteNav's three sections and the footer, linked from the
sitemap and `llms.txt`.

**`NODE_ENV=test` disables the asset watcher.** Without it the watcher holds
the process open and the test runner hangs instead of exiting.

**Inline scripts render via `innerHTML`, never `<script>{code}</script>`.**
JSX text children get HTML-escaped, which silently corrupts JavaScript
containing `&`, `<`, or `>`.

**Regenerating `public/apple-touch-icon.png`:** it's a rendered PNG, not
hand-drawn — there's no source file checked in. To rebuild after a palette
change, render a square (no `rx`, unlike `favicon.svg` — iOS applies its own
corner mask) version of the mark at 512px+ and downsize to exactly 180×180.
`public/og-image.png` (1200×630) is the same kind of asset — rendered, no
source file, regenerate at the same size if the palette or copy changes.

**Pages that have real prose content negotiate `Accept: text/markdown`**
(home, quotes, posts, about, contact, privacy, the 404) via
`app/utils/negotiate.ts` — an agent asking for Markdown gets Markdown from
the same URL a browser gets HTML from, per the acceptmarkdown.com
convention. Every negotiated response carries `Vary: Accept`, on both
representations, not just the negotiated one. A route that gets real content
added later (new prose page) should negotiate too; a route that's already
structured data (feed, sitemap) has no reason to.

**Posts and Quotes also ship standalone `.md` sibling routes**
(`/posts.md`, `/posts/:slug.md`, `/quotes.md` — see `routes.ts`) alongside
content negotiation, not instead of it: some agents follow links rather
than set an `Accept` header, kentcdodds.com and kody.codes both do the same
pairing. Every HTML page with a sibling advertises it via
`LayoutProps.markdownHref` (a `<link rel="alternate">` tag) and
`respondNegotiated`'s third argument (a matching `Link` response header).
Home, `/privacy`, `/about`, and `/contact` deliberately don't have `.md`
siblings — content negotiation already covers them, and there's no natural
filename for the root path.

**Structured data (JSON-LD) only goes on a page that actually says what the
markup claims**, in visible content — not just anywhere it'd be convenient.
`PersonSchema` (`app/ui/person-schema.tsx`) is home-page-only; `DevordSchema`
(`app/ui/devord-schema.tsx`) — Devord is Daniel's software development
company, a separate entity from Form Factory (his employer, named via
`PersonSchema`'s `worksFor`) — only renders where Devord is actually
mentioned in prose (home, `/contact`). Adding either to a page that doesn't
mention the entity is schema spam and undermines the exact legitimacy check
this markup exists for.

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
