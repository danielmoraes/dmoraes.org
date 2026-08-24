# Context

The domain language for this site. Terms here are the ones the code uses; if a
name in the code drifts from a name here, one of the two is wrong.

## Post

A piece of writing, authored as a markdown file in `content/posts/`. The
filename **is** the slug, so renaming a published file changes its URL and
breaks inbound links — treat published filenames as immutable.

Every Post carries a `title` and a `date` in its frontmatter. Both are
required: a Post missing either is a content bug and fails loudly at load
rather than rendering half-built.

Deliberately **not** called a "blog post" — see [Posts](#posts) below.

## Posts

The section at `/posts`, never called a blog. Posts are grouped under year
headings so a year holding a single entry reads as an archive rather than as a
neglected blog. This is the whole reason the section exists in this shape: the
site must look deliberate when it gets one post a year.

## Quote

A quotation kept for its own sake, with an `author`. Quotes live in
`app/data/quotes.ts` as plain data, not markdown — they have no body, no date,
and no page of their own.

The Quotes page is linked from `SiteNav` on every page — see [Layout](#layout)
below. It is deliberately **not** in the footer; the footer is contact only.

## Resume

The PDF at an unguessable URL. Two properties define it, and both must hold or
it is not private:

1. The URL contains a random token that appears nowhere in the site's markup,
   its sitemap, or its `robots.txt`.
2. The PDF file itself is never committed to this repository.

Losing either one makes the other pointless. See
[ADR-0001](./docs/adr/0001-private-resume-link.md).

The Resume is **not** a page — there is no HTML view of it, and nothing links
to it. The only way to reach it is to be given the URL.

## Layout

The single page shell in `app/ui/layout.tsx`. Every route renders through it,
which is what keeps measure, type scale, and theme identical site-wide. There
is no second shell and no per-page chrome.

`SiteNav` (`app/ui/site-nav.tsx`) is the one exception to "no per-page
chrome," and it's still site-wide, not per-page: every page renders the same
three items — Home, Posts, Quotes — right after its own heading, in the same
order every time. The current section is plain text, not a link (no point
linking a page to itself, and it doubles as the "you are here" marker) — the
other two are always live links. It replaced one-off "← Home" / "← Posts"
links that used to sit at the bottom of a page: those had already tried
omitting the current section from the set shown, which meant the nav's
_contents_ silently changed page to page, reading as broken rather than
communicating location.
