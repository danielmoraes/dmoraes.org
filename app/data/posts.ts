/**
 * Frontmatter parsing and post loading.
 *
 * Posts are markdown files in `content/posts/`. The filename is the slug, so
 * renaming a file changes its URL — treat published filenames as stable.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";

export interface Post {
  slug: string;
  title: string;
  /** ISO date string, `YYYY-MM-DD`. */
  date: string;
  /** Raw markdown body, frontmatter stripped. */
  body: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** Also used to validate a filename-derived slug never escapes the posts directory. */
const SLUG_PATTERN = /^[a-z0-9-]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseFrontmatter(source: string): { data: Record<string, string>; body: string } {
  let match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, body: source };

  let data: Record<string, string> = {};
  for (let line of match[1]!.split(/\r?\n/)) {
    let separator = line.indexOf(":");
    if (separator === -1) continue;
    let key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (key) data[key] = value.replace(/^["']|["']$/g, "");
  }

  return { data, body: source.slice(match[0].length) };
}

/** Newest first. Posts missing a title or date are a content bug, so fail loudly. */
export async function loadPosts(): Promise<Post[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(POSTS_DIR);
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }

  let posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".md"))
      .map(async (entry) => {
        let source = await fs.readFile(path.join(POSTS_DIR, entry), "utf8");
        let { data, body } = parseFrontmatter(source);
        let slug = entry.replace(/\.md$/, "");

        if (!data.title || !data.date) {
          throw new Error(`Post "${entry}" is missing a title or date in its frontmatter`);
        }
        if (!DATE_PATTERN.test(data.date)) {
          throw new Error(
            `Post "${entry}" has an invalid date "${data.date}" (expected YYYY-MM-DD)`,
          );
        }
        if (!SLUG_PATTERN.test(slug)) {
          throw new Error(
            `Post "${entry}" has an invalid filename (must be lowercase letters, numbers, and hyphens)`,
          );
        }

        return { slug, title: data.title, date: data.date, body };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function loadPost(slug: string): Promise<Post | null> {
  // Reject anything that isn't a bare slug so a crafted URL can't escape the
  // posts directory.
  if (!SLUG_PATTERN.test(slug)) return null;

  let posts = await loadPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

function isNotFound(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
