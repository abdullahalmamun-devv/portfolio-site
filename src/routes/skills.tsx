import { createFileRoute } from "@tanstack/react-router";
import {
  Server,
  Database,
  Terminal,
  CreditCard,
  Layers,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Zap,
  FlaskConical,
  Activity,
  Bot,
  Lock,
  LineChart,
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Technical Stack & Capabilities — Abdullah Al Mamun" },
      {
        name: "description",
        content:
          "Production technical capabilities across backend engineering, private VPC database isolation, server-side tracking (Meta CAPI & sGTM), automated testing (Vitest), and enterprise AI automation.",
      },
      { property: "og:title", content: "Technical Stack & Capabilities — Abdullah Al Mamun" },
      {
        property: "og:description",
        content:
          "A disciplined, battle-tested technology stack with automated testing, Linux hardening, and observability.",
      },
      { property: "og:url", content: "https://iamabdullah.dev/skills" },
    ],
    links: [{ rel: "canonical", href: "https://iamabdullah.dev/skills" }],
  }),
  component: SkillsPage,
});

const skillGroups = [
  {
    category: "Backend & Systems Engineering",
    icon: Server,
    description: "Building resilient microservices, idempotent handlers, and background workers.",
    skills: [
      {
        name: "Node.js & TypeScript",
        role: "Primary runtime for asynchronous microservices, type-safe domain models & contract interfaces",
      },
      {
        name: "Next.js 15 & 16 (App Router)",
        role: "SSR, React Server Components, streaming, and edge route handlers",
      },
      {
        name: "Express.js & WebSockets",
        role: "High-performance routing, custom middleware pipelines & real-time WS servers (ws 8.20)",
      },
      {
        name: "Idempotency Patterns",
        role: "Distributed lock keys (SETNX) preventing duplicate webhook execution & race conditions",
      },
      {
        name: "Zero-Loss Webhooks",
        role: "Cryptographic HMAC-SHA256 signature verification and background ledger reconciliation",
      },
      {
        name: "DNS MX Routing & Custom Domains",
        role: "Multi-domain email routing (smtp.catchmail.io MX) and programmatic DNS configuration",
      },
      {
        name: "Vanilla JS / Zero-Runtime Bloat",
        role: "High-performance <30KB web utilities (Vite 8) delivering instant cold loads without framework weight",
      },
    ],
  },
  {
    category: "VPC Security, Firewalls & Payment Proxy",
    icon: Lock,
    description: "Air-gapped database environments, firewall rules, and hardened payment proxies.",
    skills: [
      {
        name: "Private VPC Database Isolation",
        role: "MongoDB bound to non-public subnets with zero 0.0.0.0 exposure",
      },
      {
        name: "UFW App IP Whitelisting",
        role: "Firewall packet filtering allowing port 27017 access exclusively from app server static IP",
      },
      {
        name: "Hardened Payment Proxy",
        role: "Reverse proxy validating checkout requests & webhooks before internal database updates",
      },
      {
        name: "CVE Remediation & Recovery",
        role: "Zero-day RCE remediation (React2Shell CVE-2025-55182) without database loss",
      },
      {
        name: "Docker Resource Capping",
        role: "Strict CPU/RAM container limits preventing rogue processes from freezing host servers",
      },
    ],
  },
  {
    category: "Marketing Engineering & Server-Side Tracking",
    icon: LineChart,
    description:
      "Bypassing ad-blockers & iOS restrictions for 100% accurate conversion attribution.",
    skills: [
      {
        name: "Server-Side GTM (sGTM)",
        role: "Dedicated server container architecture hosted on Stape for server-to-server tracking",
      },
      {
        name: "Meta Conversions API (CAPI)",
        role: "Direct server event dispatch bypassing Safari ITP and browser ad-blockers",
      },
      {
        name: "Event Deduplication",
        role: "Deterministic unique event_id generation matching browser pixel & server CAPI with 0 double-counts",
      },
      {
        name: "Custom E-Commerce DataLayer",
        role: "Capturing view_item, add_to_cart, begin_checkout, and purchase events into GA4",
      },
      {
        name: "Data Privacy & SHA-256 Hashing",
        role: "Client-side normalization and SHA-256 cryptographic hashing of customer PII",
      },
    ],
  },
  {
    category: "AI & Enterprise Automation",
    icon: Bot,
    description: "Omnichannel bots, custom workflow microservices, and LLM integrations.",
    skills: [
      {
        name: "Proprietary Automation Engines",
        role: "Custom Node.js/Prisma microservices bypassing high SaaS costs of Zapier/n8n cloud",
      },
      {
        name: "Omnichannel Social Bots",
        role: "Meta Graph API (FB Messenger, Instagram DM) and TikTok conversational assistants",
      },
      {
        name: "Self-Hosted n8n & Docker",
        role: "Custom webhook pipelines, queue runners, and enterprise task automation",
      },
      {
        name: "Gemini CLI & Structured LLMs",
        role: "Deterministic JSON schema generation enforced via strict Zod validation",
      },
      {
        name: "Custom Web Chatbots",
        role: "Context-aware embedded assistants connected directly to client databases & CRMs",
      },
    ],
  },
  {
    category: "Databases, Caching & Cloud Storage",
    icon: Database,
    description: "Sub-millisecond read paths, structured schema design, and secure asset vaults.",
    skills: [
      {
        name: "Redis (ioredis 5.8 & 5.10)",
        role: "Multi-tiered caching (L1/L2), distributed locks, session vaults & rate limiters",
      },
      {
        name: "PostgreSQL & Prisma 7.8",
        role: "Relational data modeling, ACID transactions, and connection pool management",
      },
      {
        name: "MongoDB & Mongoose 8/9",
        role: "Document schema design, aggregation pipelines, and atomic conditional updates",
      },
      {
        name: "AWS S3 & Cloudflare R2",
        role: "Presigned URL generation (S3 presigner 3.10), asset anti-leech vaults & media CDNs",
      },
      {
        name: "Singleflight Request Coalescing",
        role: "Eliminating cache stampedes during concurrent traffic bursts",
      },
    ],
  },
  {
    category: "Automated Testing & CI/CD",
    icon: FlaskConical,
    description: "Ensuring zero regression, financial ledger correctness, and deployment safety.",
    skills: [
      {
        name: "Vitest & Jest",
        role: "Automated unit test suites for pricing math, authentication & domain business logic",
      },
      {
        name: "Supertest Integration Tests",
        role: "End-to-end HTTP integration tests for webhook ingestion & checkout APIs",
      },
      {
        name: "GitHub Actions Pipelines",
        role: "Automated CI workflows: linting, type-checking & test runners on every Pull Request",
      },
      {
        name: "Docker Compose Test Runners",
        role: "Spinning isolated Redis and Mongo instances in CI runners for realistic tests",
      },
      {
        name: "Branch Protection & PR Gates",
        role: "Enforcing test passes and peer review before production deployment",
      },
    ],
  },
];

function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-12">
      <SectionHeader
        eyebrow="The Arsenal"
        title="Battle-Tested Technology Stack &amp; Capabilities"
        description="Every tool in this list was selected because it delivers uptime, security, and measurable commercial speed. Backed by automated test suites and incident experience."
      />

      {/* Grid of Skill Categories */}
      <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 lg:grid-cols-2">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 pb-3.5 border-b border-white/[0.08]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">{group.category}</h2>
                    <p className="text-xs text-zinc-400">{group.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5 transition-colors hover:border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white">
                          {skill.name}
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <p className="mt-1 text-xs text-zinc-400 leading-normal">{skill.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PRODUCTION ENGINEERING DISCIPLINE CHECKLIST */}
      <Reveal className="mt-8 sm:mt-10">
        <div className="rounded-xl border border-white/10 bg-[#0e1015] p-5 sm:p-7 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Standard Operating Procedure
            </span>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
            Production Quality Standards on Every Deployment
          </h3>
          <p className="mt-1.5 text-sm text-zinc-400">
            Before any service is labeled operational, it must pass these non-negotiable checks:
          </p>

          <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Air-Gapped Private DB",
                desc: "MongoDB bound to private subnet; UFW whitelists only app server static IP on port 27017.",
              },
              {
                title: "Hardened Payment Proxy",
                desc: "Client-side never communicates secrets; reverse proxy cryptographically signs and validates webhooks.",
              },
              {
                title: "Server-Side Tracking (Meta CAPI)",
                desc: "sGTM + Stape container dispatching server-to-server conversions with unique event_id deduplication.",
              },
              {
                title: "Automated Test Gate",
                desc: "Vitest unit & Supertest integration suites must pass on CI before merging PRs.",
              },
              {
                title: "Container Resource Capping",
                desc: "Docker CPU/memory constraints preventing runaway processes from freezing the VPS host.",
              },
              {
                title: "Process Auto-Healing",
                desc: "PM2 / systemd watchers restarting hung or memory-leaking processes in <1s.",
              },
            ].map((check) => (
              <div
                key={check.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  {check.title}
                </div>
                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
