import * as crypto from "node:crypto";
import * as path from "node:path";

import { createController } from "remix/router";
import { openLazyFile } from "remix/fs";
import { createFileResponse } from "remix/response/file";

import { loadPosts } from "../data/posts.ts";
import { routes } from "../routes.ts";
import { renderAtomFeed, renderSitemap } from "./feeds.ts";
import { HomePage } from "./home-page.tsx";
import { QuotesPage } from "./quotes-page.tsx";

export default createController(routes, {
  actions: {
    // Imported lazily, not at module scope: remix/assets pulls in lightningcss
    // for CSS minification, which loads a native binary the moment the module
    // is imported. Nothing links to /assets/* yet (no clientEntry exists), so
    // there's no reason to pay that cost — or hit Vercel's file-tracer gap
    // around that binary — on every request to every route.
    async assets(context) {
      let { assetServer } = await import("../assets.ts");
      return (
        (await assetServer.fetch(context.request)) ?? new Response("Not Found", { status: 404 })
      );
    },

    home(context) {
      return context.render(<HomePage />);
    },

    quotes(context) {
      return context.render(<QuotesPage />);
    },

    async feed() {
      let posts = await loadPosts();
      return new Response(renderAtomFeed(posts), {
        headers: {
          "Content-Type": "application/atom+xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    },

    async sitemap() {
      let posts = await loadPosts();
      return new Response(renderSitemap(posts), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    },

    /**
     * The resume is private-by-unguessable-URL. Two things keep it that way:
     * the token below, and the PDF being gitignored so it never lands in the
     * public repo. See docs/adr/0001-private-resume-link.md.
     */
    async resume(context) {
      // Read fresh per request (not cached at module load) so tests can set
      // these without needing to reimport the controller.
      let resumeToken = process.env.RESUME_TOKEN;
      let resumePath = process.env.RESUME_PATH ?? "private/resume.pdf";

      // No token configured means the route is off, not open.
      if (!resumeToken) return notFound();
      if (!timingSafeEqual(context.params.token, resumeToken)) return notFound();

      let file;
      try {
        file = openLazyFile(path.resolve(process.cwd(), resumePath));
        // Touch the file so a missing PDF is a 404, not a stream that fails
        // halfway through with headers already sent.
        await file.slice(0, 1).bytes();
      } catch {
        return notFound();
      }

      let response = await createFileResponse(file, context.request, {
        // Never let a proxy or CDN hold a copy of this.
        cacheControl: "private, no-store, max-age=0, must-revalidate",
      });
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      response.headers.set("Content-Disposition", 'inline; filename="daniel-moraes-resume.pdf"');
      return response;
    },
  },
});

/** Identical to any other unmatched URL, so a wrong token reveals nothing. */
function notFound(): Response {
  return new Response("Not Found", { status: 404 });
}

/** Constant-time compare so response timing can't be used to guess the token. */
function timingSafeEqual(a: string, b: string): boolean {
  let bufferA = Buffer.from(a);
  let bufferB = Buffer.from(b);
  // crypto.timingSafeEqual throws on mismatched lengths rather than
  // returning false, and the length check itself is not required to be
  // constant-time — it's not secret, only the token's contents are.
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}
