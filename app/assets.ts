/**
 * Asset pipeline.
 *
 * The site ships no client JavaScript — every page is server-rendered HTML and
 * nothing hydrates. This server exists only so the `/assets/*` route has
 * something to answer with; if a component ever needs `clientEntry`, add an
 * `app/**\/public/` entry module and preload it from the layout.
 */
import { createAssetServer } from "remix/assets";

const rootDir = process.cwd();
const nodeEnv = process.env.NODE_ENV ?? "development";
const isDevelopment = nodeEnv === "development";
// Watching keeps a handle open, which would hang the test runner forever.
const isTest = nodeEnv === "test";

export const assetServer = createAssetServer({
  basePath: "/assets",
  rootDir,
  fileMap: {
    "app/*path": "app/*path",
    "node_modules/*path": "node_modules/*path",
  },
  allowFiles: ["app/**/public/**"],
  allowPackages: ["remix"],
  denyFiles: ["app/**/*.test.*"],
  sourceMaps: isDevelopment ? "external" : undefined,
  minify: !isDevelopment,
  watch: isDevelopment && !isTest,
});
