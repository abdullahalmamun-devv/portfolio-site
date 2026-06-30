import { createFileRoute } from "@tanstack/react-router";
import { Database, CreditCard, Film } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { StaggerGroup, StaggerItem } from "../components/Reveal";
import { GlowCard } from "../components/GlowCard";
import { TechChip } from "../components/TechChip";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Featured Projects — Technical Case Studies" },
      {
        name: "description",
        content:
          "Multi-layered caching with Redis & MongoDB, payment gateway integrations (UddoktaPay / IT Pay BD), and AI-assisted high-conversion creative campaigns.",
      },
      { property: "og:title", content: "Featured Projects — Technical Case Studies" },
      {
        property: "og:description",
        content: "Architecture, integrations, and conversion — three production case studies.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    icon: Database,
    n: "01",
    title: "Multi-layered caching & health-check fabric",
    problem:
      "A production service was buckling under read load and cold-start latency spikes; downstream dependencies failed silently.",
    architecture:
      "Designed a tiered Redis cache in front of MongoDB with write-through invalidation, request coalescing, and per-key TTL policies. Layered high-availability health-check APIs that gossip status across nodes and trip circuit breakers automatically.",
    outcome:
      "p99 latency cut by ~70%, zero-downtime deploys, and self-reported failures before customers notice.",
    stack: ["Node.js", "Redis", "MongoDB", "Docker", "PM2"],
  },
  {
    icon: CreditCard,
    n: "02",
    title: "Cross-border payments for a service platform",
    problem:
      "An e-commerce / service platform needed to accept both local Bangladeshi payments and international cards without rebuilding checkout twice.",
    architecture:
      "Built a unified payment abstraction over UddoktaPay and IT Pay BD for local rails, plus international card processors, with idempotent webhooks, signed callbacks, and a reconciliation worker that closes the loop between gateway and ledger.",
    outcome:
      "Single checkout for every customer, automated reconciliation, and a clean audit trail for finance.",
    stack: ["Next.js", "Node.js", "UddoktaPay", "IT Pay BD", "MongoDB"],
  },
  {
    icon: Film,
    n: "03",
    title: "AI-assisted high-conversion creative engine",
    problem:
      "Paid acquisition needed a steady stream of video + audio ads, fast, without ballooning creative budget.",
    architecture:
      "Composed a pipeline of LLM scripting, automated voice synthesis, and template-driven video assembly — driven by Gemini CLI and custom LLM integrations — with Facebook Ads feedback loops scoring creatives for retention and CTR.",
    outcome:
      "Weekly creative output multiplied, with measurably higher conversion on top performers.",
    stack: ["Gemini CLI", "Custom LLM", "Node.js", "Facebook Ads API"],
  },
];

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Featured Projects"
        title="Three systems that earned their keep."
        description="Case studies in caching, payments, and AI-driven creative — written as architecture, not slideware."
      />

      <StaggerGroup className="mt-16 space-y-6">
        {projects.map((p) => {
          const Icon = p.icon;
          return (
            <StaggerItem key={p.title}>
              <GlowCard>
                <div className="grid gap-8 md:grid-cols-[auto_1fr]">
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6">
                    <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {p.n}
                    </div>
                    <div className="rounded-xl border border-primary/30 bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold sm:text-3xl">{p.title}</h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                          Problem
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{p.problem}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                          Architecture
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{p.architecture}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                          Outcome
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{p.outcome}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-1.5 pt-6 border-t border-border/60">
                      {p.stack.map((t) => (
                        <TechChip key={t}>{t}</TechChip>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
