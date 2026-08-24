import { createController } from "remix/router";

import { loadPost, loadPosts } from "../../data/posts.ts";
import { formatDate } from "../../utils/markdown.ts";
import { respondNegotiated } from "../../utils/negotiate.ts";
import { routes } from "../../routes.ts";
import { PostPage } from "./post-page.tsx";
import { PostsIndexPage, postsIndexMarkdown } from "./posts-index-page.tsx";

export default createController(routes.posts, {
  actions: {
    async index(context) {
      let posts = await loadPosts();
      return respondNegotiated(context.request, {
        html: () => context.render(<PostsIndexPage posts={posts} />),
        markdown: () => postsIndexMarkdown(posts),
      });
    },

    async show(context) {
      let post = await loadPost(context.params.slug);
      if (!post) return new Response("Not Found", { status: 404 });
      // The post's own markdown source is already the text/markdown
      // representation — no separate copy to keep in sync (see
      // app/utils/negotiate.ts).
      return respondNegotiated(context.request, {
        html: () => context.render(<PostPage post={post} />),
        markdown: () => `# ${post.title}\n\n${formatDate(post.date)}\n\n${post.body}`,
      });
    },
  },
});
