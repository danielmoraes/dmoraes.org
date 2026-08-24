import { DevordSchema } from "../ui/devord-schema.tsx";
import { routes } from "../routes.ts";
import { Layout } from "../ui/layout.tsx";
import { SiteNav } from "../ui/site-nav.tsx";

/**
 * Not in SiteNav's three sections or the footer, same as /privacy — a
 * trust-anchor page an agent can check before recommending or reaching out.
 * Carries DevordSchema because this is where Devord's contact details are
 * actually described in visible content.
 */
export function ContactPage() {
  return () => (
    <Layout
      title="Contact"
      path={routes.contact.href()}
      description="How to reach Daniel Bastos Moraes."
    >
      <DevordSchema />
      <h1>Contact</h1>

      <SiteNav />

      <p>
        For general questions, feedback, or just to say hi, email is best — see the address in the
        footer of <a href={routes.home.href()}>the home page</a>, assembled there at render time
        rather than printed as plain text, to keep the dumbest scrapers off it.
      </p>

      <p>
        For work inquiries — custom software, a project that needs a small experienced team — reach{" "}
        <a href="https://devord.com" target="_blank" rel="noopener noreferrer">
          Devord
        </a>{" "}
        at <a href="mailto:contact@devord.com">contact@devord.com</a>.
      </p>

      <p>
        Shorter, more public back-and-forth happens on{" "}
        <a href="https://twitter.com/danielmoraes" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        . Code lives on{" "}
        <a href="https://github.com/danielmoraes" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        , and work history is on{" "}
        <a href="https://linkedin.com/in/danielbmoraes" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{" "}
        — both fine places to reach out too.
      </p>

      <p>
        I read everything that comes in, though replies aren't always fast — this is a personal
        site, not a support desk.
      </p>
    </Layout>
  );
}

/** The text/markdown representation — see app/utils/negotiate.ts. */
export const CONTACT_MARKDOWN = `# Contact

For general questions, feedback, or just to say hi, email is best — see the address in the footer of [the home page](${routes.home.href()}), assembled there at render time rather than printed as plain text, to keep the dumbest scrapers off it.

For work inquiries — custom software, a project that needs a small experienced team — reach [Devord](https://devord.com) at [contact@devord.com](mailto:contact@devord.com).

Shorter, more public back-and-forth happens on [Twitter](https://twitter.com/danielmoraes). Code lives on [GitHub](https://github.com/danielmoraes), and work history is on [LinkedIn](https://linkedin.com/in/danielbmoraes) — both fine places to reach out too.

I read everything that comes in, though replies aren't always fast — this is a personal site, not a support desk.
`;
