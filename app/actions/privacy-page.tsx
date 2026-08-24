import { routes } from "../routes.ts";
import { Layout } from "../ui/layout.tsx";
import { SiteNav } from "../ui/site-nav.tsx";

/**
 * Not in SiteNav's three sections or the footer on purpose — it's a utility
 * page, and the footer stays contact-only (see AGENTS.md). It does carry
 * SiteNav itself, like every other page, just with no section marked
 * current. Reachable via sitemap.xml, llms.txt, and this direct link.
 */
export function PrivacyPage() {
  return () => (
    <Layout
      title="Privacy"
      path={routes.privacy.href()}
      description="What this site collects, and what it doesn't."
    >
      <h1>Privacy</h1>

      <SiteNav />

      <p>
        This site collects very little. Page views and rough visitor counts are measured with{" "}
        <a href="https://vercel.com/docs/analytics">Vercel Web Analytics</a>, which doesn't use
        cookies and doesn't track visitors across other sites. Nothing here sets a cookie of its
        own.
      </p>

      <p>
        The hosting platform's request logs briefly record things like IP address and request path,
        the way any web server's do, for operational purposes — debugging and abuse prevention. They
        aren't used for anything beyond that, and nothing personally identifiable is collected,
        stored, or sold.
      </p>

      <p>
        The one form on this site is the theme toggle in the footer, which stores your light/dark
        preference in your browser's local storage. It never leaves your browser.
      </p>

      <p>
        Questions about any of this, or want something looked into? Reach out at the email in the
        footer.
      </p>
    </Layout>
  );
}

/** The text/markdown representation — see app/utils/negotiate.ts. */
export const PRIVACY_MARKDOWN = `# Privacy

This site collects very little. Page views and rough visitor counts are measured with [Vercel Web Analytics](https://vercel.com/docs/analytics), which doesn't use cookies and doesn't track visitors across other sites. Nothing here sets a cookie of its own.

The hosting platform's request logs briefly record things like IP address and request path, the way any web server's do, for operational purposes — debugging and abuse prevention. They aren't used for anything beyond that, and nothing personally identifiable is collected, stored, or sold.

The one form on this site is the theme toggle in the footer, which stores your light/dark preference in your browser's local storage. It never leaves your browser.

Questions about any of this, or want something looked into? Reach out at the email in the footer of [the home page](${routes.home.href()}).
`;
