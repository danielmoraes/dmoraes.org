import { css } from "remix/ui";

import { quotes } from "../data/quotes.ts";
import { routes } from "../routes.ts";
import { Layout } from "../ui/layout.tsx";
import { SiteNav } from "../ui/site-nav.tsx";

/** The text/markdown representation — see app/utils/negotiate.ts. */
export function quotesMarkdown(): string {
  let body = quotes.map((quote) => `> ${quote.text}\n> — ${quote.author}`).join("\n\n");
  return `# Quotes\n\n${body}\n`;
}

/** Quotes are unattributed-to-source favorites, kept as plain text. */
export function QuotesPage() {
  return () => (
    <Layout
      title="Quotes"
      path={routes.quotes.href()}
      description="Quotations Daniel Bastos Moraes keeps coming back to."
      markdownHref={routes.quotesMarkdown.href()}
    >
      <h1>Quotes</h1>

      <SiteNav current="quotes" />

      <div>
        {quotes.map((quote) => (
          <figure key={quote.text} mix={figureStyle}>
            <blockquote mix={quoteStyle}>{quote.text}</blockquote>
            <figcaption mix={authorStyle}>{quote.author}</figcaption>
          </figure>
        ))}
      </div>
    </Layout>
  );
}

const figureStyle = css({
  margin: "0 0 2rem",
});

// Overrides the layout's global blockquote rule: no left border here, since the
// page is nothing but quotes and 25 vertical rules would be noise.
const quoteStyle = css({
  margin: "0 0 0.4rem",
  padding: 0,
  border: 0,
  color: "var(--text)",
});

const authorStyle = css({
  color: "var(--muted)",
  fontSize: "0.8125rem",
});
