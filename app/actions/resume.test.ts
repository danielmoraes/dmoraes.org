/**
 * The resume is the one route where a bug leaks a private document, so its
 * behavior is pinned here rather than folded into the general controller test.
 *
 * `RESUME_TOKEN`/`RESUME_PATH` are read fresh per request by the controller
 * (see controller.tsx), so this file sets its own test-only token and a
 * throwaway PDF fixture rather than depending on a real one being configured
 * — otherwise every test here would short-circuit on "no token configured"
 * before ever reaching the comparison it's meant to cover.
 */
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

import * as assert from "remix/assert";
import { describe, it } from "remix/test";

import { router } from "../router.ts";

const ORIGIN = "http://localhost";
const TEST_TOKEN = "test-only-resume-token-0123456789abcdef";

function fetchPath(path: string): Promise<Response> {
  return router.fetch(new Request(ORIGIN + path));
}

/** Sets RESUME_TOKEN/RESUME_PATH for the duration of `fn`, then restores them. */
async function withResumeConfigured<T>(resumePath: string, fn: () => Promise<T>): Promise<T> {
  let previousToken = process.env.RESUME_TOKEN;
  let previousPath = process.env.RESUME_PATH;
  process.env.RESUME_TOKEN = TEST_TOKEN;
  process.env.RESUME_PATH = resumePath;
  try {
    return await fn();
  } finally {
    if (previousToken === undefined) delete process.env.RESUME_TOKEN;
    else process.env.RESUME_TOKEN = previousToken;
    if (previousPath === undefined) delete process.env.RESUME_PATH;
    else process.env.RESUME_PATH = previousPath;
  }
}

describe("resume", () => {
  it("404s on a wrong token", async () => {
    await withResumeConfigured("/nonexistent.pdf", async () => {
      let response = await fetchPath("/r/definitely-not-the-token.pdf");
      assert.equal(response.status, 404);
    });
  });

  it("404s identically whether the token is wrong or the route is off", async () => {
    // Same status and body either way, so a probe can't tell a near-miss from
    // a disabled route.
    let wrong = await withResumeConfigured("/nonexistent.pdf", () =>
      fetchPath("/r/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.pdf"),
    );
    let alsoWrong = await fetchPath("/r/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.pdf");

    assert.equal(wrong.status, alsoWrong.status);
    assert.equal(await wrong.text(), await alsoWrong.text());
  });

  it("serves the PDF on the right token, unindexed and uncached", async () => {
    let fixturePath = path.join(await fs.mkdtemp(path.join(os.tmpdir(), "resume-test-")), "r.pdf");
    await fs.writeFile(fixturePath, "%PDF-1.4 fixture");

    await withResumeConfigured(fixturePath, async () => {
      let response = await fetchPath(`/r/${TEST_TOKEN}.pdf`);

      assert.equal(response.status, 200);
      assert.equal(response.headers.get("Content-Type"), "application/pdf");
      assert.match(response.headers.get("X-Robots-Tag") ?? "", /noindex/);
      assert.match(response.headers.get("Cache-Control") ?? "", /no-store/);
    });

    await fs.rm(path.dirname(fixturePath), { recursive: true });
  });
});
