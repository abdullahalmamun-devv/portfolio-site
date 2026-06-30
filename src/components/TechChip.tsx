export function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}
