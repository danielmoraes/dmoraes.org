import type { Handle } from "remix/ui";
import { css } from "remix/ui";

import type { Post } from "../../data/posts.ts";
import { formatYear } from "../../utils/markdown.ts";
import { routes } from "../../routes.ts";
import { Layout } from "../../ui/layout.tsx";
import { SiteNav } from "../../ui/site-nav.tsx";

export interface PostsIndexPageProps {
  posts: Post[];
}

/** The text/markdown representation — see app/utils/negotiate.ts. */
export function postsIndexMarkdown(posts: Post[]): string {
  if (posts.length === 0) return "# Posts\n\nNothing here yet.\n";

  let years = groupByYear(posts);
  let body = years
    .map(([year, yearPosts]) => {
      let links = yearPosts
        .map((post) => `- [${post.title}](${routes.posts.show.href({ slug: post.slug })})`)
        .join("\n");
      return `## ${year}\n\n${links}`;
    })
    .join("\n\n");

  return `# Posts\n\n${body}\n`;
}

/**
 * Grouped by year. A year heading makes a short list read as an archive rather
 * than an underfed blog — which matters when a year only has one entry.
 */
export function PostsIndexPage(handle: Handle<PostsIndexPageProps>) {
  return () => {
    let { posts } = handle.props;
    let years = groupByYear(posts);

    return (
      <Layout
        title="Posts"
        path={routes.posts.index.href()}
        description="Writing by Daniel Bastos Moraes."
        markdownHref={routes.posts.indexMarkdown.href()}
      >
        <h1>Posts</h1>

        <SiteNav current="posts" />

        {years.length === 0 ? (
          <p mix={emptyStyle}>Nothing here yet.</p>
        ) : (
          years.map(([year, yearPosts]) => (
            <section key={year}>
              <h2 mix={yearStyle}>{year}</h2>
              <ul mix={listStyle}>
                {yearPosts.map((post) => (
                  <li key={post.slug}>
                    <a href={routes.posts.show.href({ slug: post.slug })}>{post.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </Layout>
    );
  };
}

function groupByYear(posts: Post[]): Array<[string, Post[]]> {
  let byYear = new Map<string, Post[]>();
  for (let post of posts) {
    let year = formatYear(post.date);
    let bucket = byYear.get(year);
    if (bucket) bucket.push(post);
    else byYear.set(year, [post]);
  }
  return [...byYear.entries()];
}

const yearStyle = css({
  color: "var(--muted)",
  fontSize: "0.8125rem",
  fontWeight: 400,
  fontVariantNumeric: "tabular-nums",
  margin: "2rem 0 0.6rem",
});

const listStyle = css({
  listStyle: "none",
  margin: 0,
  padding: 0,
  "& li": { margin: "0 0 0.4rem" },
});

const emptyStyle = css({ color: "var(--muted)" });
