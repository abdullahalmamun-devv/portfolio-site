import type { ReactNode } from "react";

export function TechChip({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "success";
}) {
  const variantStyles = {
    default: "border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:border-white/15",
    accent: "border-blue-500/20 bg-blue-500/10 text-blue-300 hover:border-blue-500/30",
    success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/30",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium transition-colors ${variantStyles}`}
    >
      {children}
    </span>
  );
}
