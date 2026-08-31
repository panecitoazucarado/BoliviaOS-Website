import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 md:py-28 md:px-8 perf-section ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <Reveal>
      <div className={`flex max-w-2xl flex-col gap-3.5 sm:gap-4 ${alignment}`}>
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">{title}</h2>
        {intro ? (
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">{intro}</p>
        ) : null}
        <div className="brand-rule mt-1" />
      </div>
    </Reveal>
  );
}
