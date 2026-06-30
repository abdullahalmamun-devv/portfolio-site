import { createFileRoute } from "@tanstack/react-router";
import { Layers, Server, BrainCircuit, CreditCard } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { GlowCard } from "../components/GlowCard";
import { TechChip } from "../components/TechChip";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "The Arsenal — Skills & Stack" },
      {
        name: "description",
        content:
          "Frontend, backend, DevOps, AI automation, and business integration stack. MERN, Next.js, Docker, Redis, Gemini CLI, UddoktaPay and more.",
      },
      { property: "og:title", content: "The Arsenal — Skills & Stack" },
      {
        property: "og:description",
        content: "The full toolkit I architect, deploy, and ship with.",
      },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

const categories = [
  {
    icon: Layers,
    title: "Frontend & Backend",
    blurb: "End-to-end product engineering with type-safe APIs and SSR-grade UIs.",
    items: ["Next.js", "React", "Node.js", "MERN Stack", "TypeScript", "Express"],
    span: "lg:col-span-2",
  },
  {
    icon: Server,
    title: "DevOps & Infrastructure",
    blurb: "VPS-native deployment, caching layers, reverse proxies, process supervision.",
    items: ["Docker", "PM2", "Nginx", "Redis", "MongoDB", "VPS Management"],
    span: "",
  },
  {
    icon: BrainCircuit,
    title: "AI & Automation",
    blurb: "Pipelines that move work from humans to models — reliably.",
    items: ["Gemini CLI", "OpenClaw", "Custom LLM Integrations", "Prompt Engineering"],
    span: "",
  },
  {
    icon: CreditCard,
    title: "Business & Integrations",
    blurb: "Conversion-focused growth, local + international payments, marketing ops.",
    items: ["UddoktaPay", "IT Pay BD", "Digital Marketing", "Facebook Ads Optimization"],
    span: "lg:col-span-2",
  },
];

function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="The Arsenal"
        title="Stack as a system, not a list."
        description="Every layer chosen because it earned its place in production — from the wire protocol up to the conversion funnel."
      />

      <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <StaggerItem key={c.title} className={c.span}>
              <GlowCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">{c.title}</h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.items.map((i) => (
                    <TechChip key={i}>{i}</TechChip>
                  ))}
                </div>
              </GlowCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
