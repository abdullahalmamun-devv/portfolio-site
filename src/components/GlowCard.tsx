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
        "group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#111318]/90 p-4 sm:p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] " +
        className
      }
    >
      {/* Subtle top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
