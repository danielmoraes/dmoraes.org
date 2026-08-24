import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { parseFrontmatter } from "./posts.ts";

describe("parseFrontmatter", () => {
  it("splits frontmatter from the body", () => {
    let { data, body } = parseFrontmatter("---\ntitle: Hello\ndate: 2024-01-02\n---\nBody text.\n");

    assert.equal(data.title, "Hello");
    assert.equal(data.date, "2024-01-02");
    assert.equal(body, "Body text.\n");
  });

  it("keeps colons in a value", () => {
    let { data } = parseFrontmatter("---\ntitle: Refactoring: a memoir\n---\nx");
    assert.equal(data.title, "Refactoring: a memoir");
  });

  it("passes through a body with no frontmatter", () => {
    let { data, body } = parseFrontmatter("Just text.");

    assert.deepEqual(data, {});
    assert.equal(body, "Just text.");
  });
});
