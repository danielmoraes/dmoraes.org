import * as path from "node:path";

import type { Router } from "remix/router";
import { renderWith } from "remix/middleware/render";
import { createHtmlResponse } from "remix/response/html";
import type { RemixNode } from "remix/ui";
import { renderToStream } from "remix/ui/server";

export function render() {
  return renderWith(
    ({ request, router }) =>
      function render(node: RemixNode, init?: ResponseInit) {
        let stream = renderToStream(node, {
          frameSrc: request.url,
          signal: request.signal,
          resolveFrame: (src) => resolveFrame(router, request, src),
          // Server rendering turns client entries into browser module URLs and preloads.
          // assetServer is imported lazily, not at module scope: it pulls in
          // lightningcss for CSS minification, which loads a native binary the
          // moment it's imported. Nothing uses clientEntry yet (no app/**/public/
          // entry module exists), so resolveClientEntry never actually runs —
          // no reason to pay that cost on every request to every route.
          async resolveClientEntry(entryId, component) {
            if (!entryId.startsWith("file://")) {
              throw new Error(
                `Expected \`import.meta.url\` for clientEntry ID, received '${entryId}'`,
              );
            }

            let { assetServer } = await import("../assets.ts");
            let [href, preloads] = await Promise.all([
              assetServer.getHref(entryId),
              assetServer.getPreloads(entryId),
            ]);

            return {
              href,
              exportName: entryId.split("#")[1] || component.name || titleCaseFileName(entryId),
              preloads,
            };
          },
        });

        let headers = new Headers(init?.headers);
        // Every page is fully static per URL — nothing here is personalized,
        // the theme toggle is client-side only — so let Vercel's edge serve
        // it and skip invoking this function on a cache hit. `max-age=0`
        // still makes the browser revalidate on every visit, so a content
        // edit shows up on reload. The 404 handler overrides this back to
        // `no-store` — see router.tsx.
        headers.set(
          "Cache-Control",
          "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
        );
        return createHtmlResponse(stream, { ...init, headers });
      },
  );
}

async function resolveFrame(router: Router, request: Request, src: string) {
  let url = new URL(src, request.url);

  let headers = new Headers();
  headers.set("Accept", "text/html");

  let cookie = request.headers.get("Cookie");
  if (cookie) headers.set("Cookie", cookie);

  let response = await router.fetch(
    new Request(url, {
      method: "GET",
      headers,
      signal: request.signal,
    }),
  );

  if (!response.ok) {
    return `<pre>Frame error: ${response.status} ${response.statusText}</pre>`;
  }

  if (response.body) return response.body;
  return await response.text();
}

function titleCaseFileName(fileUrl: string): string {
  let url = new URL(fileUrl);
  let fileName = path.basename(url.pathname, path.extname(url.pathname));
  return fileName
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((segment) => segment[0]!.toUpperCase() + segment.slice(1))
    .join("");
}
