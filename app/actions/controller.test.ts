import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { router } from "../router.tsx";
import { routes } from "../routes.ts";

const ORIGIN = "http://localhost";

function fetchPath(path: string, headers?: HeadersInit): Promise<Response> {
  return router.fetch(new Request(ORIGIN + path, { headers }));
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
    assert.match(body, /<loc>https:\/\/dmoraes\.org\/privacy<\/loc>/);
    assert.equal(body.includes("/r/"), false);
  });
});

describe("markdown content negotiation", () => {
  it("serves markdown instead of HTML when asked, with Vary: Accept on both", async () => {
    let markdown = await fetchPath(routes.home.href(), { Accept: "text/markdown" });
    let html = await fetchPath(routes.home.href());

    assert.match(markdown.headers.get("Content-Type") ?? "", /text\/markdown/);
    assert.match(await markdown.text(), /^# Daniel Bastos Moraes/);
    assert.match(markdown.headers.get("Vary") ?? "", /Accept/);

    assert.match(html.headers.get("Content-Type") ?? "", /text\/html/);
    assert.match(html.headers.get("Vary") ?? "", /Accept/);
  });

  it("responds on quotes and posts too, not just home", async () => {
    let quotes = await fetchPath(routes.quotes.href(), { Accept: "text/markdown" });
    let posts = await fetchPath(routes.posts.index.href(), { Accept: "text/markdown" });

    assert.match(await quotes.text(), /^# Quotes/);
    assert.match(await posts.text(), /^# Posts/);
  });

  it("406s when markdown is explicitly the only acceptable type it can't produce", async () => {
    let response = await fetchPath(routes.home.href(), { Accept: "application/pdf" });
    assert.equal(response.status, 406);
  });

  it("is not fooled by a real browser Accept header into serving markdown", async () => {
    let chrome =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
    let response = await fetchPath(routes.home.href(), { Accept: chrome });
    assert.match(response.headers.get("Content-Type") ?? "", /text\/html/);
  });
});

describe("not found", () => {
  it("gives agents a real 404 with a recoverable markdown body", async () => {
    let response = await fetchPath("/this-page-does-not-exist", { Accept: "text/markdown" });
    let body = await response.text();

    assert.equal(response.status, 404);
    assert.match(response.headers.get("Content-Type") ?? "", /text\/markdown/);
    assert.match(body, /\/this-page-does-not-exist/);
    assert.match(body, /\[Home\]\(\/\)/);
    assert.match(body, /\[Posts\]\(\/posts\)/);
  });

  it("styles the HTML 404 like the rest of the site", async () => {
    let response = await fetchPath("/this-page-does-not-exist");
    let body = await response.text();

    assert.equal(response.status, 404);
    assert.match(body, /id="theme-toggle"/);
    assert.match(body, /href="\/posts"/);
  });

  it("leaves the resume route's 404 untouched — still bare and identical either way", async () => {
    let response = await fetchPath("/r/wrong-token.pdf");
    assert.equal(response.status, 404);
    assert.equal(await response.text(), "Not Found");
  });
});

describe("privacy page", () => {
  it("is reachable with real content, not part of SiteNav or the footer", async () => {
    let response = await fetchPath(routes.privacy.href());
    let body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(body.length > 500, true);
    assert.match(body, /Vercel Web Analytics/);

    let footer = /<footer[^>]*>.*?<\/footer>/s.exec(body)?.[0] ?? "";
    assert.equal(footer.includes("/privacy"), false);
  });
});

describe("structured data and metadata", () => {
  it("carries Person JSON-LD on the home page, not Organization", async () => {
    let body = await fetchPath(routes.home.href()).then((response) => response.text());

    assert.match(body, /"@type":"Person"/);
    assert.match(body, /"name":"Daniel Bastos Moraes"/);
  });

  it("has an og:image", async () => {
    let body = await fetchPath(routes.home.href()).then((response) => response.text());
    assert.match(body, /property="og:image" content="https:\/\/dmoraes\.org\/og-image\.png"/);
  });
});

describe("llms.txt", () => {
  it("is reachable and names when to use the site", async () => {
    let response = await fetchPath("/llms.txt");
    let body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, /When to use this site/);
  });
});
