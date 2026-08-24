import type { Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { Layout } from "../ui/layout.tsx";

export interface NotFoundPageProps {
  path: string;
}

export function NotFoundPage(handle: Handle<NotFoundPageProps>) {
  return () => (
    <Layout title="Not Found">
      <h1>Not found</h1>
      <p>
        <code>{handle.props.path}</code> doesn't exist on this site. Try{" "}
        <a href={routes.home.href()}>Home</a>, <a href={routes.posts.index.href()}>Posts</a>, or{" "}
        <a href={routes.quotes.href()}>Quotes</a>, or check the{" "}
        <a href={routes.sitemap.href()}>sitemap</a>.
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
