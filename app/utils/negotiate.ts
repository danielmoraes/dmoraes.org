/**
 * RFC 9110 `Accept` negotiation, following the acceptmarkdown.com guides:
 * parse into type+q entries, rank by q then by specificity (an exact type
 * beats a subtype wildcard, which beats the catch-all wildcard), and only
 * 406 when every representation we can produce scored zero — not merely
 * absent from the header, since an absent type is "no constraint" rather
 * than "rejected."
 *
 * Deliberately not a substring match (`accept.includes("text/markdown")`) —
 * that misreads real browser headers like Chrome's, which contain the
 * substring "text/html" but are not, in fact, asking for HTML over anything
 * else present with a higher q-value.
 */

interface AcceptEntry {
  type: string;
  q: number;
}

/**
 * `produces` order matters: it's the tie-break when q and specificity match
 * (e.g. a catch-all Accept header). List the default representation first.
 */
export function negotiate(acceptHeader: string | null, produces: readonly string[]): string | null {
  if (!acceptHeader || acceptHeader.trim() === "") return produces[0] ?? null;

  let entries = parseAccept(acceptHeader);
  let bestType: string | null = null;
  let bestScore = -1;
  let bestSpecificity = -1;

  for (let produced of produces) {
    let entry = bestMatch(produced, entries);
    let score = entry ? entry.q : 0;
    let specificity = entry ? typeSpecificity(entry.type) : -1;

    if (score > bestScore || (score === bestScore && specificity > bestSpecificity)) {
      bestType = produced;
      bestScore = score;
      bestSpecificity = specificity;
    }
  }

  return bestScore > 0 ? bestType : null;
}

/**
 * Dispatches to an HTML or Markdown representation based on `Accept`, and
 * sets `Vary: Accept` on whichever one is returned — required on both, not
 * just the negotiated one, or a cache that saw one representation first will
 * serve it to every subsequent request regardless of that request's Accept.
 *
 * `markdownHref`, if given, is the URL of a standalone `.md` sibling for
 * this same content (e.g. `/posts/foo.md` alongside `/posts/foo`) — set on
 * the HTML response as a `Link: rel="alternate"` header, per
 * acceptmarkdown.com's discovery guidance. The matching `<link>` element in
 * the page's `<head>` is separate — see LayoutProps.markdownHref.
 */
export async function respondNegotiated(
  request: Request,
  handlers: { html: () => Response | Promise<Response>; markdown: () => string },
  markdownHref?: string,
): Promise<Response> {
  let produces = ["text/html", "text/markdown"];
  let type = negotiate(request.headers.get("Accept"), produces);
  if (type === null) return notAcceptable(produces);

  if (type === "text/markdown") {
    let response = markdownResponse(handlers.markdown());
    addVary(response, "Accept");
    return response;
  }

  let response = await handlers.html();
  addVary(response, "Accept");
  if (markdownHref)
    response.headers.append("Link", `<${markdownHref}>; rel="alternate"; type="text/markdown"`);
  return response;
}

/** The text/markdown representation, unconditionally — for `.md` sibling routes that don't negotiate. */
export function markdownResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}

function addVary(response: Response, value: string): void {
  let values = new Set(
    (response.headers.get("Vary") ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
  values.add(value);
  response.headers.set("Vary", [...values].join(", "));
}

/** RFC 9110 §15.5.7 response for when nothing in `produces` satisfies the request. */
export function notAcceptable(produces: readonly string[]): Response {
  let body = `This resource is available in:\n${produces.map((type) => `- ${type}`).join("\n")}\n`;
  return new Response(body, {
    status: 406,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // The Accept header is request-specific, not resource-specific — a
      // different client's request to the same URL can well succeed.
      "Cache-Control": "no-store",
    },
  });
}

function bestMatch(produced: string, entries: AcceptEntry[]): AcceptEntry | null {
  let best: AcceptEntry | null = null;
  let bestSpecificity = -1;
  for (let entry of entries) {
    if (!typeMatches(produced, entry.type)) continue;
    let specificity = typeSpecificity(entry.type);
    if (specificity > bestSpecificity) {
      best = entry;
      bestSpecificity = specificity;
    }
  }
  return best;
}

function typeMatches(produced: string, accepted: string): boolean {
  if (accepted === "*/*" || accepted === produced) return true;
  if (!accepted.endsWith("/*")) return false;
  return accepted.slice(0, -2) === produced.split("/")[0];
}

function typeSpecificity(type: string): number {
  if (type === "*/*") return 0;
  if (type.endsWith("/*")) return 1;
  return 2;
}

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      let [type, ...params] = part.split(";").map((segment) => segment.trim());
      let q = 1;
      for (let param of params) {
        let [key, value] = param.split("=").map((segment) => segment.trim());
        if (key === "q" && value) {
          let parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { type: (type ?? "").toLowerCase(), q };
    });
}
