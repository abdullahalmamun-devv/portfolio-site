import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
