import type { Handle } from "remix/ui";
import { css } from "remix/ui";

import { routes } from "../routes.ts";

export type NavSection = "home" | "posts" | "quotes";

const SECTIONS: Array<{ id: NavSection; label: string; href: string }> = [
  { id: "home", label: "Home", href: routes.home.href() },
  { id: "posts", label: "Posts", href: routes.posts.index.href() },
  { id: "quotes", label: "Quotes", href: routes.quotes.href() },
];

export interface SiteNavProps {
  /**
   * The section this page belongs to. Omit on pages that aren't one of the
   * three sections (404, privacy) — all three then render as plain links,
   * since none of them is "current."
   */
  current?: NavSection;
}

/**
 * All three links, always, on every page — the same set in the same order,
 * so nothing about the nav itself changes as you move around. The current
 * section renders as plain text, not a link: no point linking a page to
 * itself, and it doubles as the "you are here" marker.
 */
export function SiteNav(handle: Handle<SiteNavProps>) {
  return () => (
    <p mix={navStyle}>
      {SECTIONS.map((section) =>
        section.id === handle.props.current ? (
          <span key={section.id} aria-current="page">
            {section.label}
          </span>
        ) : (
          <a key={section.id} href={section.href}>
            {section.label}
          </a>
        ),
      )}
    </p>
  );
}

// Links rest muted and unadorned — a nav item, not part of the story — but
// hover reveals the same accent underline as the bio's links, so the color
// still reads as one consistent system rather than being scoped to body
// text. Border-bottom, not text-decoration: it's what animates smoothly on
// hover. The current-page span shares the link's rest color, minus the
// border and transition, since it isn't interactive.
const navStyle = css({
  display: "flex",
  gap: "1.25rem",
  margin: "0 0 2rem",
  color: "var(--muted)",
  fontSize: "0.875rem",
  "& a": {
    color: "var(--muted)",
    textDecoration: "none",
    borderBottom: "1px solid transparent",
    paddingBottom: "1px",
    transition: "color 0.2s ease, border-color 0.2s ease",
  },
  "& a:hover": {
    color: "var(--text)",
    borderColor: "var(--accent)",
  },
});
