import { createController } from "remix/router";

import { loadPost, loadPosts } from "../../data/posts.ts";
import { markdownResponse, respondNegotiated } from "../../utils/negotiate.ts";
import { routes } from "../../routes.ts";
import { PostPage, postMarkdown } from "./post-page.tsx";
import { PostsIndexPage, postsIndexMarkdown } from "./posts-index-page.tsx";

export default createController(routes.posts, {
  actions: {
    async index(context) {
      let posts = await loadPosts();
      return respondNegotiated(
        context.request,
        {
          html: () => context.render(<PostsIndexPage posts={posts} />),
          markdown: () => postsIndexMarkdown(posts),
        },
        routes.posts.indexMarkdown.href(),
      );
    },

    /** The standalone .md sibling of `index` — see app/utils/negotiate.ts. */
    async indexMarkdown() {
      let posts = await loadPosts();
      return markdownResponse(postsIndexMarkdown(posts));
    },

    async show(context) {
      let post = await loadPost(context.params.slug);
      if (!post) return new Response("Not Found", { status: 404 });
      return respondNegotiated(
        context.request,
        {
          html: () => context.render(<PostPage post={post} />),
          markdown: () => postMarkdown(post),
        },
        routes.posts.showMarkdown.href({ slug: post.slug }),
      );
    },

    /** The standalone .md sibling of `show` — see app/utils/negotiate.ts. */
    async showMarkdown(context) {
      let post = await loadPost(context.params.slug);
      if (!post) return new Response("Not Found", { status: 404 });
      return markdownResponse(postMarkdown(post));
    },
  },
});
