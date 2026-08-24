import { get, route } from "remix/routes";

export const routes = route({
  assets: get("/assets/*path"),
  home: "/",
  posts: {
    index: "/posts",
    indexMarkdown: get("/posts.md"),
    show: "/posts/:slug",
    showMarkdown: get("/posts/:slug.md"),
  },
  quotes: "/quotes",
  quotesMarkdown: get("/quotes.md"),
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  feed: get("/feed.xml"),
  sitemap: get("/sitemap.xml"),
  // Unguessable path segment, checked against RESUME_TOKEN in the controller.
  // Never link to this route from the site's own markup, the sitemap, or
  // robots.txt — see docs/adr/0001-private-resume-link.md.
  resume: get("/r/:token.pdf"),
});
