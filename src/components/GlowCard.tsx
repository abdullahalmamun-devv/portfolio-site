import type { ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-glow " +
        className
      }
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,0%), color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
