<p align="center">
  <strong>dmoraes.org</strong>
</p>

<p align="center">
  My personal site.
</p>

---

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev        # http://localhost:44100
pnpm start      # production
```

## Check

```bash
pnpm check      # lint + typecheck + test
```

Individually: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm format`.

## Stack

|               |                                     |
| ------------- | ----------------------------------- |
| Framework     | [Remix 3](https://guides.remix.run) |
| Language      | TypeScript 7                        |
| Lint / format | Oxlint, Oxfmt                       |
| Tests         | `remix/test` + `node --test`        |
| Packages      | pnpm                                |

No bundler. Remix 3 runs TypeScript directly through `node --import remix/node-tsx`.

## Layout

```
app/
├── routes.ts          URL contract — the source of truth for every path
├── router.ts          middleware + controller wiring
├── actions/           route handlers, one directory per nested route map
├── data/              posts (markdown loader) and quotes
├── ui/layout.tsx      the single page shell
└── utils/             markdown rendering, date formatting
content/posts/         posts, one markdown file each
```

## Writing a post

Add a markdown file to `content/posts/`. **The filename becomes the URL**, so
renaming a published post breaks its links.

```markdown
---
title: On something
date: 2026-08-23
---

Body goes here.
```

`title` and `date` are both required — a post missing either fails loudly
instead of rendering half-built.

## Resume

The resume is served at an unguessable URL and is **not** linked from the site.
It needs two things, and both must hold:

```bash
RESUME_TOKEN=<128-bit hex>    # openssl rand -hex 16
RESUME_PATH=private/resume.pdf # gitignored; never commit the PDF
```

Without `RESUME_TOKEN` the route returns 404. The PDF is deliberately absent
from this repository — a secret URL is worthless if the file is in public git
history. See [ADR-0001](./docs/adr/0001-private-resume-link.md).

## Docs

- [CONTEXT.md](./CONTEXT.md) — domain language
- [docs/adr/](./docs/adr/) — architectural decisions
- [AGENTS.md](./AGENTS.md) — conventions for agents

## License

MIT
