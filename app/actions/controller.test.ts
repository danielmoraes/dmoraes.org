import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { router } from "../router.ts";
import { routes } from "../routes.ts";

const ORIGIN = "http://localhost";

function fetchPath(path: string): Promise<Response> {
  return router.fetch(new Request(ORIGIN + path));
}

describe("home", () => {
  it("renders the bio and the link row", async () => {
    let response = await fetchPath(routes.home.href());
    let body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, /I work at/);
    assert.match(body, /Form Factory/);
    assert.match(body, /two kids/);
  });

  it("never links to the resume", async () => {
    let body = await fetchPath(routes.home.href()).then((response) => response.text());
    assert.equal(body.includes("/r/"), false);
  });
});

describe("quotes", () => {
  it("is reachable and carries the quotes", async () => {
    let response = await fetchPath(routes.quotes.href());
    let body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, /Linus Torvalds/);
  });

  it("is linked next to Posts on the home page, not from the footer", async () => {
    let body = await fetchPath(routes.home.href()).then((response) => response.text());
    let footer = /<footer[^>]*>.*?<\/footer>/s.exec(body)?.[0] ?? "";

    assert.match(body, /href="\/quotes"/);
    assert.equal(footer.includes("/quotes"), false);
  });
});

describe("site nav", () => {
  it("shows all three sections everywhere, current one not a link", async () => {
    let home = await fetchPath(routes.home.href()).then((response) => response.text());
    let posts = await fetchPath(routes.posts.index.href()).then((response) => response.text());
    let quotes = await fetchPath(routes.quotes.href()).then((response) => response.text());

    // Every page names all three sections by label...
    for (let body of [home, posts, quotes]) {
      assert.match(body, />Home</);
      assert.match(body, />Posts</);
      assert.match(body, />Quotes</);
    }

    // ...but the current one is marked, not linked.
    assert.match(home, /aria-current="page">Home</);
    assert.equal(home.includes('href="/"'), false);
    assert.match(home, /href="\/posts"/);
    assert.match(home, /href="\/quotes"/);

    assert.match(posts, /aria-current="page">Posts</);
    assert.equal(posts.includes('href="/posts"'), false);
    assert.match(posts, /href="\/"/);
    assert.match(posts, /href="\/quotes"/);

    assert.match(quotes, /aria-current="page">Quotes</);
    assert.equal(quotes.includes('href="/quotes"'), false);
    assert.match(quotes, /href="\/"/);
    assert.match(quotes, /href="\/posts"/);
  });

  it("appears once per page — no separate 'back' link", async () => {
    let body = await fetchPath(routes.quotes.href()).then((response) => response.text());
    assert.equal(/←/.test(body), false);
  });
});

describe("theme toggle", () => {
  it("sets the theme attribute before any styling, to avoid a flash of the wrong theme", async () => {
    let body = await fetchPath(routes.home.href()).then((response) => response.text());

    let scriptIndex = body.indexOf("data-theme");
    let styleIndex = body.indexOf("<style");

    assert.equal(scriptIndex > -1, true);
    assert.equal(styleIndex > -1, true);
    assert.equal(scriptIndex < styleIndex, true);
  });

  it("renders the toggle button on every page", async () => {
    let body = await fetchPath(routes.quotes.href()).then((response) => response.text());
    assert.match(body, /id="theme-toggle"/);
  });
});

describe("feed and sitemap", () => {
  it("serves an Atom feed", async () => {
    let response = await fetchPath(routes.feed.href());
    let body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get("Content-Type") ?? "", /atom\+xml/);
    assert.match(body, /<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom">/);
  });

  it("keeps the resume out of the sitemap", async () => {
    let body = await fetchPath(routes.sitemap.href()).then((response) => response.text());

    assert.match(body, /<loc>https:\/\/dmoraes\.org\/posts<\/loc>/);
    assert.equal(body.includes("/r/"), false);
  });
});
