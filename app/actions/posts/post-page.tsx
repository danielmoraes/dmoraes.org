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

export function PostPage(handle: Handle<PostPageProps>) {
  return () => {
    let { post } = handle.props;

    return (
      <Layout
        title={post.title}
        path={routes.posts.show.href({ slug: post.slug })}
        description={`${post.title} — a post by Daniel Bastos Moraes.`}
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
