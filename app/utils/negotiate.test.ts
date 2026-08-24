import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { negotiate, notAcceptable } from "./negotiate.ts";

const PRODUCES = ["text/html", "text/markdown"];

describe("negotiate", () => {
  // Test vectors from https://acceptmarkdown.com/guides/accept-parsing —
  // this table is the spec's own definition of correct behavior.
  let cases: Array<[string | null, string | null]> = [
    ["text/markdown", "text/markdown"],
    ["text/markdown, text/html;q=0.8", "text/markdown"],
    ["text/html", "text/html"],
    ["text/markdown;q=0, text/html", "text/html"],
    ["text/markdown;q=0", "text/html"],
    [null, "text/html"],
    ["*/*", "text/html"],
  ];

  for (let [accept, expected] of cases) {
    it(`Accept: ${accept ?? "(none)"} -> ${expected}`, () => {
      assert.equal(negotiate(accept, PRODUCES), expected);
    });
  }

  it("406s when the only representation is explicitly rejected", () => {
    assert.equal(negotiate("text/markdown;q=0", ["text/markdown"]), null);
  });

  it("is not fooled by a real Chrome Accept header into matching text/html", () => {
    let chrome =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
    assert.equal(negotiate(chrome, PRODUCES), "text/html");
  });

  it("ranks an exact match over a wildcard even when the wildcard comes first", () => {
    assert.equal(negotiate("*/*, text/markdown", PRODUCES), "text/markdown");
  });
});

describe("notAcceptable", () => {
  it("lists the representations that were available", () => {
    let response = notAcceptable(["text/html", "text/markdown"]);
    assert.equal(response.status, 406);
  });
});
