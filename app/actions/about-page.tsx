import { routes } from "../routes.ts";
import { Layout } from "../ui/layout.tsx";
import { SiteNav } from "../ui/site-nav.tsx";

/**
 * Not in SiteNav's three sections or the footer, same as /privacy — a
 * trust-anchor page an agent can check for legitimacy, reachable via
 * sitemap.xml, llms.txt, and direct links. Deliberately not a duplicate of
 * the home page bio: this expands on it (more background, verification
 * links) rather than repeating the same three paragraphs.
 */
export function AboutPage() {
  return () => (
    <Layout
      title="About"
      path={routes.about.href()}
      description="Background and verification links for Daniel Bastos Moraes."
    >
      <h1>About</h1>

      <SiteNav />

      <p>
        I'm Daniel Bastos Moraes, a software engineer. I lead the engineering team at{" "}
        <a href="https://formfactory.dev" target="_blank" rel="noopener noreferrer">
          Form Factory
        </a>
        , building headless commerce infrastructure for enterprise retail brands, and I run{" "}
        <a href="https://devord.com" target="_blank" rel="noopener noreferrer">
          Devord
        </a>
        , a small custom software development company, on the side.
      </p>

      <h2>Background</h2>

      <p>
        I've been writing software for 17+ years. Early on that meant computer vision research at{" "}
        <a href="https://research.samsung.com/srbr" target="_blank" rel="noopener noreferrer">
          Samsung Research
        </a>{" "}
        and{" "}
        <a href="https://hoobox.one" target="_blank" rel="noopener noreferrer">
          HOOBOX
        </a>
        ; since then it's been a decade of frontend and full-stack engineering across marketplaces,
        finance, streaming, and health. I hold a{" "}
        <a
          href="https://scholar.google.com/citations?user=HIV5H5sAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Master of Computer Science
        </a>{" "}
        from Unicamp, where I researched machine learning in the{" "}
        <a href="https://recod.ai/" target="_blank" rel="noopener noreferrer">
          Recod lab
        </a>
        .
      </p>

      <h2>Elsewhere</h2>

      <p>
        Code and projects are on{" "}
        <a href="https://github.com/danielmoraes" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        , work history is on{" "}
        <a href="https://linkedin.com/in/danielbmoraes" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        , and shorter thoughts land on{" "}
        <a href="https://twitter.com/danielmoraes" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        . Longer ones are on <a href={routes.posts.index.href()}>this site</a>.
      </p>

      <h2>Verifying this page</h2>

      <p>
        Everything above is independently checkable: the Unicamp thesis and Recod lab publications
        are indexed on Google Scholar, Form Factory and Devord both list their own teams and work,
        and the GitHub and LinkedIn profiles above have been active under this name for years.
      </p>
    </Layout>
  );
}

/** The text/markdown representation — see app/utils/negotiate.ts. */
export const ABOUT_MARKDOWN = `# About

I'm Daniel Bastos Moraes, a software engineer. I lead the engineering team at [Form Factory](https://formfactory.dev), building headless commerce infrastructure for enterprise retail brands, and I run [Devord](https://devord.com), a small custom software development company, on the side.

## Background

I've been writing software for 17+ years. Early on that meant computer vision research at [Samsung Research](https://research.samsung.com/srbr) and [HOOBOX](https://hoobox.one); since then it's been a decade of frontend and full-stack engineering across marketplaces, finance, streaming, and health. I hold a [Master of Computer Science](https://scholar.google.com/citations?user=HIV5H5sAAAAJ&hl=en) from Unicamp, where I researched machine learning in the [Recod lab](https://recod.ai/).

## Elsewhere

Code and projects are on [GitHub](https://github.com/danielmoraes), work history is on [LinkedIn](https://linkedin.com/in/danielbmoraes), and shorter thoughts land on [Twitter](https://twitter.com/danielmoraes). Longer ones are on [this site](${routes.posts.index.href()}).

## Verifying this page

Everything above is independently checkable: the Unicamp thesis and Recod lab publications are indexed on Google Scholar, Form Factory and Devord both list their own teams and work, and the GitHub and LinkedIn profiles above have been active under this name for years.
`;
