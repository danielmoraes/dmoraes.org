import { createController } from "remix/router";

import { loadPost, loadPosts } from "../../data/posts.ts";
import { routes } from "../../routes.ts";
import { PostPage } from "./post-page.tsx";
import { PostsIndexPage } from "./posts-index-page.tsx";

export default createController(routes.posts, {
  actions: {
    async index(context) {
      let posts = await loadPosts();
      return context.render(<PostsIndexPage posts={posts} />);
    },

    async show(context) {
      let post = await loadPost(context.params.slug);
      if (!post) return new Response("Not Found", { status: 404 });
      return context.render(<PostPage post={post} />);
    },
  },
});
