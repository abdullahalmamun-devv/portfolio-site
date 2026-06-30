import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal";
import { GlowCard } from "../components/GlowCard";
import { TechChip } from "../components/TechChip";

export const Route = createFileRoute("/ventures")({
  head: () => ({
    meta: [
      { title: "Ventures — SubsDrop & Pro Trainer IT" },
      {
        name: "description",
        content:
          "The companies I founded and operate: SubsDrop, a digital services business, and Pro Trainer IT, scaling tech training across Bangladesh.",
      },
      { property: "og:title", content: "Ventures — SubsDrop & Pro Trainer IT" },
      {
        property: "og:description",
        content: "SubsDrop and Pro Trainer IT — the businesses I'm building and scaling.",
      },
      { property: "og:url", content: "/ventures" },
    ],
    links: [{ rel: "canonical", href: "/ventures" }],
  }),
  component: VenturesPage,
});

const ventures = [
  {
    icon: Briefcase,
    name: "SubsDrop",
    role: "CEO & Founder",
    tagline: "Digital subscriptions, delivered.",
    body:
      "A digital-services business I founded and lead end-to-end — product strategy, infrastructure, payment integrations, and growth. SubsDrop is the operating system behind a fast-moving subscription marketplace serving Bangladeshi and international customers.",
    pillars: ["Product strategy", "Payment infrastructure", "Customer ops", "Growth"],
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "UddoktaPay", "IT Pay BD"],
  },
  {
    icon: GraduationCap,
    name: "Pro Trainer IT",
    role: "Operator & Scaler",
    tagline: "From regional classroom to national platform.",
    body:
      "Pro Trainer IT trains the next generation of engineers and digital professionals in Bangladesh. I run operations and lead the transition from a physical training center into a massive online learning platform with live cohorts, on-demand courses, and AI-assisted coaching.",
    pillars: ["Curriculum & ops", "Online platform build-out", "Marketing & ads", "Community"],
    stack: ["Next.js", "Node.js", "AI tooling", "Facebook Ads", "Video pipeline"],
  },
];

function VenturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Ventures"
        title="Two companies. One operator."
        description="I build the business and the system underneath it — strategy, code, and infrastructure under a single roof."
      />

      <StaggerGroup className="mt-16 grid gap-8 lg:grid-cols-2">
        {ventures.map((v) => {
          const Icon = v.icon;
          return (
            <StaggerItem key={v.name}>
              <GlowCard className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {v.role}
                  </span>
                </div>

                <h2 className="mt-6 text-3xl font-bold">{v.name}</h2>
                <p className="mt-1 text-sm text-primary">{v.tagline}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{v.body}</p>

                <div className="mt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Pillars
                  </div>
                  <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {v.pillars.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-foreground/90">
                        <ArrowUpRight className="h-3 w-3 text-secondary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 pt-6 border-t border-border/60">
                  {v.stack.map((t) => (
                    <TechChip key={t}>{t}</TechChip>
                  ))}
                </div>
              </GlowCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <Reveal className="mt-20">
        <div className="rounded-2xl border border-border bg-card/40 p-8 sm:p-12">
          <h3 className="text-2xl font-bold">Why both at once?</h3>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Operating a business teaches you what to build. Writing the system teaches you
            what's actually possible. I keep both inputs live — product reality and
            engineering reality — so the roadmap never drifts from what ships.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
