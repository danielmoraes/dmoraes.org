import { marked } from "marked";

/**
 * Markdown → HTML for post bodies.
 *
 * Post content is trusted: it comes from files in this repo, not from users.
 * If that ever changes, this output needs sanitizing before it reaches
 * `innerHTML`.
 */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true });
}

/** `2013-06-24` → `June 24, 2013`. Parsed as UTC so the date can't shift a day. */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatYear(isoDate: string): string {
  return isoDate.slice(0, 4);
}
