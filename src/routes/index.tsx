import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Code2, Boxes } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal";
import { GlowCard } from "../components/GlowCard";
import { TechChip } from "../components/TechChip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdullah — Founder, Developer, Server Architect" },
      {
        name: "description",
        content:
          "Building scalable digital ecosystems. CEO of SubsDrop, operator of Pro Trainer IT, full-stack engineer specializing in MERN, Next.js, and AI automation.",
      },
      { property: "og:title", content: "Abdullah — Founder, Developer, Server Architect" },
      {
        property: "og:description",
        content: "Scalable digital ecosystems, AI automation, and DevOps from Dhaka.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-80" aria-hidden />
        <motion.div
          aria-hidden
          className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-40 right-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-3xl"
          animate={{ y: [0, -40, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 sm:pt-28 sm:pb-36">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Available for new ventures
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] sm:text-7xl">
              Building <span className="text-gradient">scalable digital ecosystems</span> &
              empowering tech growth.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              I'm <span className="text-foreground">Abdullah</span> — CEO & Founder of{" "}
              <span className="text-foreground">SubsDrop</span>, operator of{" "}
              <span className="text-foreground">Pro Trainer IT</span>, and the engineer
              architecting the infrastructure behind both. Business leader and technical
              architect, working as one.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Let's collaborate
              </Link>
            </div>
          </Reveal>

          {/* Stats strip */}
          <StaggerGroup className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {[
              { k: "2", v: "Active ventures" },
              { k: "5+", v: "Years shipping" },
              { k: "10+", v: "Production systems" },
              { k: "∞", v: "Pipelines automated" },
            ].map((s) => (
              <StaggerItem key={s.v} className="bg-card/80 px-6 py-6">
                <div className="font-display text-3xl font-bold text-gradient">{s.k}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.v}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              About
            </div>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Operator's mindset.<br />Architect's discipline.
            </h2>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Dhaka & Chapainawabganj, Bangladesh
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-base text-muted-foreground leading-relaxed sm:text-lg">
              <p>
                I run two ventures from Bangladesh while writing the code that powers them.
                <span className="text-foreground"> SubsDrop</span> is my digital-services
                business; <span className="text-foreground">Pro Trainer IT</span> is the
                training company I'm scaling from a regional classroom into a massive online
                platform reaching every district.
              </p>
              <p>
                My obsession is automating workflows with AI — Gemini CLI pipelines, custom
                LLM integrations, OpenClaw — so small teams ship like large ones. I architect
                multi-layered caching, fault-tolerant gateways, and self-healing health-check
                APIs that stay up while we sleep.
              </p>
              <p>
                The same analytical eye I bring to system design I bring to complex cinematic
                narratives — mapping franchises like graphs, tracing causality across decades.
                Pattern recognition, just rendered differently.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <Link to="/ventures" className="block h-full">
              <GlowCard className="h-full">
                <Boxes className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Ventures</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  SubsDrop and Pro Trainer IT — the businesses I'm building and scaling.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlowCard>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link to="/skills" className="block h-full">
              <GlowCard className="h-full">
                <Code2 className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">The Arsenal</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  MERN, Next.js, Docker, Redis, AI tooling, payment gateways.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <TechChip>Next.js</TechChip>
                  <TechChip>Docker</TechChip>
                  <TechChip>Redis</TechChip>
                </div>
              </GlowCard>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link to="/projects" className="block h-full">
              <GlowCard className="h-full">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Case studies</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Multi-layer caching, payment integrations, AI-assisted creative campaigns.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlowCard>
            </Link>
          </StaggerItem>
        </StaggerGroup>
      </section>
    </div>
  );
}
