import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — Coming Soon — Abdullah Al Mamun" },
      { name: "description", content: "Tools page coming soon." },
    ],
    links: [{ rel: "canonical", href: "https://iamabdullah.dev/tools" }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-400 mb-4">
        <span className="flex h-2 w-2 rounded-full bg-blue-500" />
        <span>TOOLS</span>
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
        Coming Soon
      </h1>
      <p className="mt-4 max-w-md text-sm sm:text-base text-zinc-400">
        This section is currently under development.
      </p>
    </div>
  );
}
