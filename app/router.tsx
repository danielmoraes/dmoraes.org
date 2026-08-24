import { createRouter, type MiddlewareContext } from "remix/router";
import { compression } from "remix/middleware/compression";
import { staticFiles } from "remix/middleware/static";

import controller from "./actions/controller.tsx";
import { NotFoundPage, notFoundMarkdown } from "./actions/not-found-page.tsx";
import postsController from "./actions/posts/controller.tsx";
import { render } from "./middleware/render.tsx";
import { routes } from "./routes.ts";
import { respondNegotiated } from "./utils/negotiate.ts";

type AppContext = MiddlewareContext<[ReturnType<typeof render>]>;

declare module "remix/router" {
  interface RouterTypes {
    context: AppContext;
  }
}

export const router = createRouter<AppContext>({
  middleware: [compression(), staticFiles("./public", { index: false }), render()],
  // Agent-friendly: a real 404, with a body an agent can actually use to
  // recover, rather than the framework's bare "Not Found: /path" text. Not
  // used by the resume route's own 404 — that one stays a plain, identical
  // response by design, see docs/adr/0001-private-resume-link.md.
  defaultHandler: async (context) => {
    let path = new URL(context.request.url).pathname;
    let response = await respondNegotiated(context.request, {
      html: () => context.render(<NotFoundPage path={path} />),
      markdown: () => notFoundMarkdown(path),
    });

    let headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex");
    return new Response(response.body, { status: 404, headers });
  },
});

router.map(routes, controller);
router.map(routes.posts, postsController);
