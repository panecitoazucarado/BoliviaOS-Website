import { Section } from "../Section";
import { Reveal } from "../Reveal";
import { DownloadButton } from "../DownloadButton";

export function Beta() {
  return (
    <Section id="beta">
      <Reveal>
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Descargar <span className="text-brand-gradient">BoliviaOS</span>
          </h2>
          <DownloadButton label="Descargar BoliviaOS" className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base" />
        </div>
      </Reveal>
    </Section>
  );
}
