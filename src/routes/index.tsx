import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Server,
  ShieldCheck,
  Zap,
  ExternalLink,
  Terminal,
  Activity,
  Layers,
  Code2,
  Briefcase,
  GraduationCap,
  Bot,
  ShoppingBag,
  Flame,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal";
import { TechChip } from "../components/TechChip";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdullah Al Mamun — Senior Full-Stack Engineer, Systems Architect & Tech Founder" },
      {
        name: "description",
        content:
          "Available for global remote engineering roles & high-ticket contracts. Founder of SubsDrop, Co-Founder of QuickMation, Operator of Pro Trainer IT. Specializing in high-throughput backend, Redis caching, payment rails, and enterprise AI automation.",
      },
      {
        property: "og:title",
        content: "Abdullah Al Mamun — Senior Full-Stack Engineer & Tech Founder",
      },
      {
        property: "og:description",
        content:
          "Available for global remote contracts. Founder of SubsDrop & QuickMation, architecting production systems with zero downtime.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-4 pb-6 sm:pt-10 sm:pb-10 border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(59,130,246,0.14),transparent_70%)]"
          aria-hidden
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            {/* Global Remote Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-blue-300">
                <span className="hidden sm:inline">
                  Open for Global Remote Roles &amp; High-Ticket Contracts (Worldwide)
                </span>
                <span className="sm:hidden">Open for Global Remote Roles &amp; Contracts</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-3 max-w-4xl text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight sm:leading-[1.15]">
              Senior Full-Stack Engineer &amp; Systems Architect.{" "}
              <span className="text-zinc-400 font-normal">Operator of 4 Live Platforms.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-2.5 sm:mt-3 max-w-3xl text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
              I am{" "}
              <strong className="font-pixel text-[13px] sm:text-sm font-normal tracking-wider text-white">
                Abdullah Al Mamun
              </strong>{" "}
              — CEO &amp; Founder of{" "}
              <a
                href="https://subsdrop.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline font-medium"
              >
                SubsDrop
              </a>
              , Co-Founder of{" "}
              <a
                href="https://quickmation.online"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:underline font-medium"
              >
                QuickMation
              </a>
              , and Operator at{" "}
              <a
                href="https://www.protrainerit.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline font-medium"
              >
                Pro Trainer IT
              </a>
              . I architect battle-hardened Next.js/Node.js backend infrastructure, multi-tier Redis
              caching, FinTech payment reconciliation, and custom enterprise AI automation engines.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-2.5">
              <a
                href="https://github.com/abdullahalmamun-devv"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white shadow-sm"
              >
                <Github className="h-4 w-4 text-zinc-300" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-al-mamun-b07295329/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-blue-400 shadow-sm"
              >
                <Linkedin className="h-4 w-4 text-blue-400" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
              </a>
            </div>
          </Reveal>

          {/* Hard Production Numbers */}
          <StaggerGroup className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 pt-4 sm:pt-5 border-t border-white/[0.08]">
            {[
              {
                stat: "4 Live SaaS",
                label: "SubsDrop, QuickMation, PTI, MoneTrix",
                sub: "Architected & actively running",
              },
              {
                stat: "Zero-Day Fix",
                label: "React2Shell (CVE-2025-55182)",
                sub: "100% CPU lock cleared without loss",
              },
              { stat: "< 22ms", label: "P99 Read Latency", sub: "Redis L1/L2 tiered caching" },
              {
                stat: "BDT & USD",
                label: "Dual FinTech Rails",
                sub: "UddoktaPay, bKash, Nagad & Cards",
              },
            ].map((m) => (
              <StaggerItem
                key={m.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 sm:p-4 transition-colors hover:border-white/15"
              >
                <div className="font-display text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {m.stat}
                </div>
                <div className="mt-1 text-[11px] sm:text-xs font-semibold text-zinc-300 line-clamp-1">
                  {m.label}
                </div>
                <div className="mt-0.5 text-[10px] sm:text-[11px] text-zinc-400 leading-tight line-clamp-2">
                  {m.sub}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FEATURED: THE CVE INCIDENT POST-MORTEM BANNER */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex flex-col justify-between gap-3.5 sm:gap-4 rounded-xl border border-amber-500/25 bg-gradient-to-r from-amber-950/20 via-[#14120e] to-[#111318] p-3.5 sm:p-5 shadow-lg md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="rounded border border-amber-500/30 bg-amber-500/20 px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase text-amber-300">
                  REAL PRODUCTION POST-MORTEM
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400">
                  CVE-2025-55182
                </span>
              </div>
              <h3 className="mt-1 text-xs sm:text-base font-semibold text-white">
                How I Recovered a 100% CPU Frozen Production VPS Under Live Customer Traffic
              </h3>
              <p className="mt-1 max-w-2xl text-[11px] sm:text-xs leading-relaxed text-zinc-400">
                When a zero-day React2Shell exploit pinned CPU &amp; RAM to 100% on our co-located
                host (Pro Trainer IT &amp; SubsDrop), I recovered root access via VNC, purged
                persistence cronjobs, patched dependencies, and brought both services back online
                with zero data loss.
              </p>
            </div>
          </div>
          <Link
            to="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-amber-400 md:self-center"
          >
            Read RCA &amp; Fix <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* 4 LIVE PLATFORMS SHOWCASE */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Commercial Proof
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Live Platforms I Architected &amp; Operate
            </h2>
            <p className="mt-1 text-zinc-400 max-w-xl text-xs sm:text-sm">
              Real companies with real domains, live traffic, active users, and integrated revenue
              models.
            </p>
          </div>
          <Link
            to="/ventures"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            Explore all 4 ventures <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* SubsDrop */}
          <div className="rounded-xl border border-white/10 bg-[#111318] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">SubsDrop</h3>
                    <p className="text-xs text-zinc-400">Founder &amp; Chief Executive Officer</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-semibold">
                  LIVE
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                Bangladesh’s #1 digital subscription marketplace offering 25+ premium tools (Canva
                Pro, ChatGPT Plus, Grammarly). Ecosystem includes media.subsdrop.com CDN, Live TV
                streaming (tv.subsdrop.com), and open-source disposable email utility
                (temp.subsdrop.com) with automated credential delivery and multi-rail payments.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <TechChip>Next.js 15</TechChip>
                <TechChip>ioredis</TechChip>
                <TechChip>MongoDB</TechChip>
                <TechChip>WebSockets</TechChip>
                <TechChip>Open Source</TechChip>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">subsdrop.com</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://temp.subsdrop.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-zinc-400 hover:text-white"
                >
                  tempmail
                </a>
                <span className="text-zinc-700">|</span>
                <a
                  href="https://subsdrop.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Visit Platform <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* QuickMation */}
          <div className="rounded-xl border border-white/10 bg-[#111318] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">QuickMation</h3>
                    <p className="text-xs text-zinc-400">Co-Founder &amp; Automation Architect</p>
                  </div>
                </div>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-400 font-semibold">
                  AGENCY
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                Enterprise AI &amp; Automation Agency. Delivering custom AI chatbots (FB Messenger,
                Instagram DM, TikTok, Web), custom messaging systems, and standalone enterprise
                software. Built on custom proprietary automation engines to eliminate high SaaS
                vendor fees like n8n and Zapier.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <TechChip>Next.js 16</TechChip>
                <TechChip>Prisma + PG</TechChip>
                <TechChip>Custom AI Bots</TechChip>
                <TechChip>n8n Custom</TechChip>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">quickmation.online</span>
              <a
                href="https://quickmation.online"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                Visit Agency <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Pro Trainer IT */}
          <div className="rounded-xl border border-white/10 bg-[#111318] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Pro Trainer IT</h3>
                    <p className="text-xs text-zinc-400">Operator &amp; Scaling Strategist</p>
                  </div>
                </div>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-400 font-semibold">
                  ACADEMY
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                National IT Academy headquartered in Maharajpur, Chapainawabganj, scaling across 64
                districts. Offers live cohorts in Full-Stack MERN, Python &amp; Machine Learning,
                and DevOps. Features Next.js 16, S3 presigned video streaming, and student LMS.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <TechChip>Next.js 16</TechChip>
                <TechChip>AWS S3</TechChip>
                <TechChip>Mongoose 9</TechChip>
                <TechChip>Vitest</TechChip>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">protrainerit.com</span>
              <a
                href="https://www.protrainerit.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Visit Academy <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* MoneTrix */}
          <div className="rounded-xl border border-white/10 bg-[#111318] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">MoneTrix</h3>
                    <p className="text-xs text-zinc-400">Architect &amp; Creator</p>
                  </div>
                </div>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-400 font-semibold">
                  SAAS
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                E-commerce &amp; digital product delivery SaaS. Engineered with an isolated private
                MongoDB VPC (strict UFW IP whitelisting, 0.0.0.0 closed), hardened Payment Proxy
                gateway for local MFS, and Server-Side Tracking (sGTM via Stape + Meta CAPI +
                deterministic event_id deduplication) bypassing iOS ad-blockers with GA4 DataLayer
                sync.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <TechChip>Next.js 16.2</TechChip>
                <TechChip>Isolated VPC Mongo</TechChip>
                <TechChip>Payment Proxy</TechChip>
                <TechChip>Meta CAPI (sGTM)</TechChip>
                <TechChip>GA4 DataLayer</TechChip>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">monetrix.shop</span>
              <a
                href="https://www.monetrix.shop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Visit MoneTrix <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ARCHITECTURE SIMULATOR */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 border-b border-white/[0.06]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              Interactive System Topology
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Simulate Real Production Request Flows
          </h2>
          <p className="mt-1.5 text-zinc-400 text-xs sm:text-sm">
            Test the live request topologies used across SubsDrop and my production VPS servers.
            Trace packet flow between Edge, Nginx, Redis L1/L2, and MongoDB.
          </p>
        </div>

        <div className="mt-5">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* FREELANCE / REMOTE CONTRACT BANNER */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#111318] to-[#0a0c10] p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              <Globe className="h-4 w-4" /> Ready for Immediate Engagement
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Hiring for a High-Impact Remote Role or Complex Technical Contract?
            </h2>
            <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
              I collaborate asynchronously and synchronously with engineering teams worldwide. From
              architecting scalable microservices to building custom enterprise AI automation
              engines.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 shadow-sm"
            >
              Initiate Contact <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href="mailto:hello@iamabdullah.dev"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10"
            >
              hello@iamabdullah.dev
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
