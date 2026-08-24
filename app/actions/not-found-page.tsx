import type { Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { Layout } from "../ui/layout.tsx";
import { SiteNav } from "../ui/site-nav.tsx";

export interface NotFoundPageProps {
  path: string;
}

export function NotFoundPage(handle: Handle<NotFoundPageProps>) {
  return () => (
    <Layout title="Not Found">
      <h1>Not found</h1>

      <SiteNav />

      <p>
        <code>{handle.props.path}</code> doesn't exist on this site. Check the{" "}
        <a href={routes.sitemap.href()}>sitemap</a>, or pick a section above.
      </p>
    </Layout>
  );
}

/** The text/markdown representation — see app/utils/negotiate.ts. */
export function notFoundMarkdown(path: string): string {
  return `# Not found

\`${path}\` doesn't exist on this site.

Try one of:
- [Home](${routes.home.href()})
- [Posts](${routes.posts.index.href()})
- [Quotes](${routes.quotes.href()})
- [Sitemap](${routes.sitemap.href()})
`;
}
