/**
 * The only page shell. Every route renders through this so type, measure, and
 * theme stay identical across the site.
 */
import type { Handle, RemixNode } from "remix/ui";
import { css } from "remix/ui";
import { Moon, Sun } from "lucide-static";

export interface LayoutProps {
  children?: RemixNode;
  /** Appended to the site name in <title>. Omit on the home page. */
  title?: string;
  description?: string;
  /** Absolute path of the current page, used for the canonical URL. */
  path?: string;
}

const SITE_NAME = "Daniel Bastos Moraes";
const SITE_URL = "https://dmoraes.org";
/** Also used by PersonSchema's JSON-LD `description` — one accurate sentence, not two. */
export const DEFAULT_DESCRIPTION =
  "Daniel Bastos Moraes works at Form Factory, leading the engineering team building headless commerce for enterprise brands. Previously computer vision at Samsung Research, and a Master of Computer Science at Unicamp.";

// IBM Plex Sans for body, Newsreader for the headline — loaded below via
// Google Fonts. Deliberately not Jarred Sumner's pairing (DM Sans / Crimson
// Pro): same idea — serif headline over a clean sans body — different fonts.
const SANS = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const SERIF = '"Newsreader", Georgia, "Times New Roman", serif';
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap";

// Single source of truth for --bg in both themes, so the theme-color meta
// (colors the mobile browser chrome) can't drift from the page background —
// see THEME_TOKENS_CSS and the two theme scripts below.
const THEME_COLOR_LIGHT = "#fdfdfc";
const THEME_COLOR_DARK = "#161615";

export function Layout(handle: Handle<LayoutProps>) {
  return () => {
    let { children, title, description = DEFAULT_DESCRIPTION, path = "/" } = handle.props;
    let fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          {/* Default is light, matching THEME_TOKENS_CSS's root. The init
              script below corrects it (to the OS preference or a stored
              override) before first paint — must stay before that script in
              document order so the script can find it. */}
          <meta name="theme-color" id="theme-color-meta" content={THEME_COLOR_LIGHT} />
          {/* Blocking, before any paint: reads the stored theme choice and
              stamps it on <html>, and syncs the theme-color meta above, so
              there is no flash of the wrong theme or browser chrome color.
              Silent no-op if a visitor never touched the toggle — the OS
              media query still drives it. */}
          <script innerHTML={THEME_INIT_SCRIPT} />
          <style innerHTML={THEME_TOKENS_CSS} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href={FONTS_HREF} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light dark" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          {/* iOS ignores rel="icon" for home-screen bookmarks — needs its own
              PNG. Not theme-mirrored either, same reasoning as the favicon:
              square (iOS applies its own corner mask), regenerate by
              rendering the mark at 512px+ and downsizing, see AGENTS.md. */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <title>{fullTitle}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={`${SITE_URL}${path}`} />
          <meta property="og:title" content={fullTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={`${SITE_URL}${path}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
          <link rel="alternate" type="application/atom+xml" title={SITE_NAME} href="/feed.xml" />
          {/* Vercel Web Analytics' plain-script integration, not the
              @vercel/analytics React package — this site has no client
              hydration to hang a component on. Vercel serves this path
              automatically once Web Analytics is enabled on the project. */}
          <script defer src="/_vercel/insights/script.js" />
        </head>
        <body mix={bodyStyle}>
          <main mix={mainStyle}>{children}</main>
          <Footer />
          {/* Runs after the footer above it exists in the DOM. Not a Remix
              clientEntry on purpose — this is the only interactive thing on
              the site, and hydrating the whole UI runtime for one button
              would cost far more than it's worth. */}
          <script innerHTML={THEME_TOGGLE_SCRIPT} />
        </body>
      </html>
    );
  };
}

/** Contact only — Posts and Quotes live in the home page's nav instead. */
function Footer() {
  return () => (
    <footer mix={footerStyle}>
      <a href="https://twitter.com/danielmoraes" target="_blank" rel="noopener noreferrer">
        @danielmoraes
      </a>
      <MailLink />
      <a href="https://github.com/danielmoraes" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a href="https://linkedin.com/in/danielbmoraes" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <button id="theme-toggle" type="button" aria-label="Toggle theme" mix={themeToggleStyle}>
        <span class="icon-sun" innerHTML={resizeIcon(Sun)} />
        <span class="icon-moon" innerHTML={resizeIcon(Moon)} />
      </button>
    </footer>
  );
}

/**
 * Assembled at render time so the address is not a literal in the HTML source.
 * Stops the dumbest scrapers; anyone determined still gets it.
 */
function MailLink() {
  return () => {
    let user = "daniel";
    let host = "dmoraes.org";
    return <a href={`mailto:${user}@${host}`}>Email</a>;
  };
}

/** Lucide icons ship at 24x24; this button wants them small and unlabeled. */
function resizeIcon(svg: string): string {
  return svg.replace('width="24"', 'width="16"').replace('height="24"', 'height="16"');
}

/**
 * Theme tokens, defined on <html> rather than through the `css` mixin so a
 * plain attribute selector can override them — the mixin scopes styles to a
 * generated class on <body>, which a `<head>`-run script can't reach before
 * <body> exists.
 *
 * Three layers, in order: system preference by default, `data-theme="dark"`
 * or `="light"` overrides it either direction once a visitor picks one.
 */
const THEME_TOKENS_CSS = `
html {
  --text: #1a1a1a;
  --muted: #6b6b6b;
  --accent: #b3654a;
  --bg: ${THEME_COLOR_LIGHT};
  --rule: #e4e4e1;
}
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]) {
    --text: #e8e8e6;
    --muted: #9a9a96;
    --accent: #cf8c6b;
    --bg: ${THEME_COLOR_DARK};
    --rule: #2c2c2a;
  }
}
html[data-theme="dark"] {
  --text: #e8e8e6;
  --muted: #9a9a96;
  --accent: #cf8c6b;
  --bg: ${THEME_COLOR_DARK};
  --rule: #2c2c2a;
}

/* Icon swap follows the same three layers — CSS-only, so it resolves before
   paint with no script needed beyond the attribute set above. */
#theme-toggle .icon-moon { display: none; }
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]) #theme-toggle .icon-sun { display: none; }
  html:not([data-theme="light"]) #theme-toggle .icon-moon { display: block; }
}
html[data-theme="dark"] #theme-toggle .icon-sun { display: none; }
html[data-theme="dark"] #theme-toggle .icon-moon { display: block; }
html[data-theme="light"] #theme-toggle .icon-sun { display: block; }
html[data-theme="light"] #theme-toggle .icon-moon { display: none; }
`.trim();

// Both scripts below render via `innerHTML`, not `<script>{code}</script>` —
// JSX text children get HTML-escaped (`&&` -> `&amp;&amp;`), which corrupts
// real JavaScript. `innerHTML` renders the string verbatim.
const THEME_INIT_SCRIPT = `
(function () {
  var stored = null
  try {
    stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored)
    }
  } catch (e) {}

  // Keeps mobile browser chrome (the theme-color meta) matching the page,
  // including the case a stored choice overrides the OS preference — a
  // plain \`media\` attribute on the meta tag can't express that override.
  var media = window.matchMedia('(prefers-color-scheme: dark)')
  function syncThemeColor() {
    var meta = document.getElementById('theme-color-meta')
    if (!meta) return
    var dark = stored === 'dark' || (stored !== 'light' && media.matches)
    meta.setAttribute('content', dark ? '${THEME_COLOR_DARK}' : '${THEME_COLOR_LIGHT}')
  }
  syncThemeColor()
  // Only OS-driven when there's no stored override, same cascade as the CSS.
  media.addEventListener('change', function () {
    if (stored !== 'light' && stored !== 'dark') syncThemeColor()
  })
})()
`.trim();

const THEME_TOGGLE_SCRIPT = `
(function () {
  var button = document.getElementById('theme-toggle')
  if (!button) return

  // The icon itself is CSS-only (see THEME_TOKENS_CSS) — this only needs to
  // flip the attribute, persist it, and keep the accessible label honest.
  function current() {
    var attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function updateLabel() {
    var target = current() === 'dark' ? 'light' : 'dark'
    button.setAttribute('aria-label', 'Switch to ' + target + ' theme')
    button.title = button.getAttribute('aria-label')
  }

  function syncThemeColor() {
    var meta = document.getElementById('theme-color-meta')
    if (meta) meta.setAttribute('content', current() === 'dark' ? '${THEME_COLOR_DARK}' : '${THEME_COLOR_LIGHT}')
  }

  button.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch (e) {}
    updateLabel()
    syncThemeColor()
  })

  updateLabel()
})()
`.trim();

const bodyStyle = css({
  margin: 0,
  padding: "0 24px",
  background: "var(--bg)",
  color: "var(--text)",
  font: `16px/1.6 ${SANS}`,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
});

const mainStyle = css({
  maxWidth: "34rem",
  margin: "0 auto",
  paddingTop: "5.5rem",
  "@media (max-width: 480px)": { paddingTop: "3.5rem" },

  "& h1": {
    fontFamily: SERIF,
    margin: "0 0 1.75rem",
    fontSize: "2.25rem",
    lineHeight: 1.15,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: "var(--text)",
    "@media (max-width: 480px)": { fontSize: "1.875rem" },
  },
  "& h2": {
    margin: "2.5rem 0 0.75rem",
    fontSize: "1rem",
    fontWeight: 600,
  },
  "& p": { margin: "0 0 1.15rem" },
  "& a": {
    color: "var(--text)",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    textDecorationThickness: "1px",
    textDecorationColor: "var(--accent)",
    transition: "text-decoration-color 0.2s ease",
  },
  "& a:hover": { textDecorationColor: "currentColor" },
  "& blockquote": {
    margin: "0 0 1.15rem",
    paddingLeft: "1rem",
    borderLeft: "2px solid var(--rule)",
    color: "var(--muted)",
  },
  "& code": {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    fontSize: "0.875em",
  },
  "& pre": {
    overflowX: "auto",
    padding: "0.85rem 1rem",
    borderRadius: "4px",
    background: "color-mix(in srgb, var(--text) 5%, transparent)",
  },
  "& pre code": { fontSize: "0.8125rem" },
  "& hr": { margin: "2.5rem 0", border: 0, borderTop: "1px solid var(--rule)" },
  "& img": { maxWidth: "100%", height: "auto" },
});

const footerStyle = css({
  maxWidth: "34rem",
  margin: "0 auto",
  padding: "4rem 0 3rem",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1.25rem",
  fontSize: "0.8125rem",
  // No text-decoration at rest, on purpose — the border-bottom (present but
  // transparent) is what animates on hover. text-decoration-color barely
  // transitions across browsers; border-color does it smoothly.
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

const themeToggleStyle = css({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  border: 0,
  padding: 0,
  marginLeft: "auto",
  background: "transparent",
  color: "var(--muted)",
  cursor: "pointer",
  "&:hover": { color: "var(--text)" },
  "& svg": { display: "block" },
});
