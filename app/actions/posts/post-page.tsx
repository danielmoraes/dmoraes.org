import type { Handle } from "remix/ui";
import { css } from "remix/ui";

import type { Post } from "../../data/posts.ts";
import { formatDate, renderMarkdown } from "../../utils/markdown.ts";
import { routes } from "../../routes.ts";
import { Layout } from "../../ui/layout.tsx";
import { SiteNav } from "../../ui/site-nav.tsx";

export interface PostPageProps {
  post: Post;
}

/**
 * The text/markdown representation — see app/utils/negotiate.ts. The post's
 * own markdown source is already the content; no separate copy to keep in
 * sync.
 */
export function postMarkdown(post: Post): string {
  return `# ${post.title}\n\n${formatDate(post.date)}\n\n${post.body}`;
}

export function PostPage(handle: Handle<PostPageProps>) {
  return () => {
    let { post } = handle.props;

    return (
      <Layout
        title={post.title}
        path={routes.posts.show.href({ slug: post.slug })}
        description={`${post.title} — a post by Daniel Bastos Moraes.`}
        markdownHref={routes.posts.showMarkdown.href({ slug: post.slug })}
      >
        <article>
          <h1>{post.title}</h1>

          <SiteNav current="posts" />

          <p mix={dateStyle}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          {/* Trusted content: post bodies are repo files, not user input. */}
          <div innerHTML={renderMarkdown(post.body)} />
        </article>
      </Layout>
    );
  };
}

const dateStyle = css({
  marginBottom: "2rem",
  color: "var(--muted)",
  fontSize: "0.8125rem",
});
