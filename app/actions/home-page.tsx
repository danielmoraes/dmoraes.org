import { Layout } from "../ui/layout.tsx";
import { SiteNav } from "../ui/site-nav.tsx";

export function HomePage() {
  return () => (
    <Layout>
      <h1>Daniel Bastos Moraes</h1>

      <SiteNav current="home" />

      <p>
        I work at{" "}
        <a href="https://formfactory.dev" target="_blank" rel="noopener noreferrer">
          Form Factory
        </a>
        , where I lead the engineering team building headless commerce for enterprise brands.
      </p>

      <p>
        On the side, I like working on personal open source projects, reading, and spending time
        with my wife and two kids.
      </p>

      <p>
        I've spent 17+ years writing software: computer vision at{" "}
        <a href="https://research.samsung.com/srbr" target="_blank" rel="noopener noreferrer">
          Samsung Research
        </a>{" "}
        and{" "}
        <a href="https://hoobox.one" target="_blank" rel="noopener noreferrer">
          HOOBOX
        </a>
        , then a decade of frontend and full-stack work across marketplaces, finance, streaming, and
        health. Along the way I did a{" "}
        <a
          href="https://scholar.google.com/citations?user=HIV5H5sAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Master of Computer Science
        </a>{" "}
        at Unicamp on machine learning, in the{" "}
        <a href="https://recod.ai/" target="_blank" rel="noopener noreferrer">
          Recod lab
        </a>
        . Long before that, I built games and websites nobody remembers.
      </p>
    </Layout>
  );
}
