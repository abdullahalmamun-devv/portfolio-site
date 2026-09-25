import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        <span className="font-mono text-xs font-semibold tracking-wider uppercase text-blue-400">
          {eyebrow}
        </span>
        {badge && (
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
            {badge}
          </span>
        )}
      </div>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed sm:text-base">{description}</p>
      ) : null}
    </Reveal>
  );
}
