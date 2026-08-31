import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

export function Philosophy() {
  return (
    <Section id="philosophy">
      <SectionHeading
        eyebrow="Avance del proyecto"
        title="BoliviaOS en acción"
        align="center"
      />

      <Reveal delay={100}>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/1wism1m6zjI?start=24&rel=0"
              title="BoliviaOS — Avance del proyecto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
