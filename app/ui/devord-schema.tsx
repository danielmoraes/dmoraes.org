/**
 * JSON-LD for Devord, Daniel's software development company — a separate entity from
 * Form Factory (his employer, already named via PersonSchema's `worksFor`).
 * Only rendered on pages that actually mention Devord in visible content
 * (the home page bio, /contact) — Schema.org's own guidance is against
 * markup describing something the page doesn't actually say.
 */
const DEVORD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Devord",
  url: "https://devord.com",
  description: "Custom software development company.",
  founder: {
    "@type": "Person",
    name: "Daniel Bastos Moraes",
    url: "https://dmoraes.org",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@devord.com",
    contactType: "sales",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Paulista, 171, andar 4 - Bela Vista",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01311-000",
    addressCountry: "BR",
  },
};

export function DevordSchema() {
  return () => <script type="application/ld+json" innerHTML={JSON.stringify(DEVORD_SCHEMA)} />;
}
