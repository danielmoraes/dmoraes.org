import { DEFAULT_DESCRIPTION } from "./layout.tsx";

/**
 * JSON-LD identity for the home page. `Person`, not `Organization` — this is
 * a personal site, not a company, and Schema.org's own guidance is to use
 * the type matching the actual entity.
 */
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Bastos Moraes",
  url: "https://dmoraes.org",
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    "https://twitter.com/danielmoraes",
    "https://github.com/danielmoraes",
    "https://linkedin.com/in/danielbmoraes",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Form Factory",
    url: "https://formfactory.dev",
  },
};

export function PersonSchema() {
  return () => <script type="application/ld+json" innerHTML={JSON.stringify(PERSON_SCHEMA)} />;
}
