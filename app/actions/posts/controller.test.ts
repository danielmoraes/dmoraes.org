import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { router } from "../../router.ts";
import { routes } from "../../routes.ts";

const ORIGIN = "http://localhost";

function fetchPath(path: string): Promise<Response> {
  return router.fetch(new Request(ORIGIN + path));
}

describe("posts index", () => {
  it("groups posts under a year heading", async () => {
    let response = await fetchPath(routes.posts.index.href());
    let body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, />2013</);
    assert.match(body, /Stop putting off your decisions/);
  });
});

describe("post", () => {
  it("renders the markdown body as HTML", async () => {
    let response = await fetchPath(
      routes.posts.show.href({ slug: "stop-putting-off-your-decisions" }),
    );
    let body = await response.text();

    assert.equal(response.status, 200);
    // Markdown emphasis became real markup rather than literal asterisks.
    assert.match(body, /<strong>/);
    assert.match(body, /<blockquote>/);
    assert.equal(body.includes("**decision"), false);
  });

  it("carries the site nav, Posts marked current, not a 'back' link", async () => {
    let body = await fetchPath(
      routes.posts.show.href({ slug: "stop-putting-off-your-decisions" }),
    ).then((response) => response.text());

    assert.match(body, /href="\/"/);
    assert.match(body, /href="\/quotes"/);
    assert.match(body, /aria-current="page">Posts</);
    assert.equal(body.includes('href="/posts"'), false);
    assert.equal(/←/.test(body), false);
  });

  it("404s an unknown slug", async () => {
    let response = await fetchPath(routes.posts.show.href({ slug: "no-such-post" }));
    assert.equal(response.status, 404);
  });

  it("404s a slug that tries to escape the content directory", async () => {
    let response = await fetchPath("/posts/..%2F..%2Fpackage");
    assert.equal(response.status, 404);
  });
});
