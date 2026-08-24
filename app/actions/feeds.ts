/**
 * Atom feed and sitemap.
 *
 * The resume route is deliberately absent from both — see
 * docs/adr/0001-private-resume-link.md.
 */
import type { Post } from "../data/posts.ts";
import { renderMarkdown } from "../utils/markdown.ts";
import { routes } from "../routes.ts";

const SITE_URL = "https://dmoraes.org";
const SITE_NAME = "Daniel Bastos Moraes";
const AUTHOR = "Daniel Bastos Moraes";

export function renderAtomFeed(posts: Post[]): string {
  let updated = posts[0] ? toIsoInstant(posts[0].date) : toIsoInstant("1970-01-01");

  let entries = posts
    .map((post) => {
      let url = `${SITE_URL}${routes.posts.show.href({ slug: post.slug })}`;
      return [
        "  <entry>",
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link href="${url}"/>`,
        `    <id>${url}</id>`,
        `    <updated>${toIsoInstant(post.date)}</updated>`,
        `    <content type="html">${escapeXml(renderMarkdown(post.body))}</content>`,
        "  </entry>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(SITE_NAME)}</title>`,
    `  <link href="${SITE_URL}/"/>`,
    `  <link rel="self" href="${SITE_URL}/feed.xml"/>`,
    `  <id>${SITE_URL}/</id>`,
    `  <updated>${updated}</updated>`,
    `  <author><name>${escapeXml(AUTHOR)}</name></author>`,
    entries,
    "</feed>",
    "",
  ].join("\n");
}

export function renderSitemap(posts: Post[]): string {
  let paths = [
    routes.home.href(),
    routes.posts.index.href(),
    routes.quotes.href(),
    routes.about.href(),
    routes.contact.href(),
    routes.privacy.href(),
    ...posts.map((post) => routes.posts.show.href({ slug: post.slug })),
  ];

  let urls = paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n");

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

/**
 * Atom requires a full timestamp; posts only carry a date. Midnight UTC keeps
 * it deterministic instead of drifting with the server's timezone.
 */
function toIsoInstant(isoDate: string): string {
  return `${isoDate}T00:00:00Z`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
