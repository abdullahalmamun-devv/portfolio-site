import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://iamabdullah.dev/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Technical Stack & Capabilities — Abdullah Al Mamun" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Technical Stack & Capabilities — Abdullah Al Mamun" },
      {
        name: "twitter:description",
        content:
          "A disciplined, battle-tested technology stack with automated testing, Linux hardening, and observability.",
      },
      { name: "twitter:image", content: "https://iamabdullah.dev/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://iamabdullah.dev/skills" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://iamabdullah.dev/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Skills",
              item: "https://iamabdullah.dev/skills",
            },
          ],
        }),
      },
    ],
  }),
  component: SkillsPage,
});

const skillGroups = [
  {
    category: "Backend & Systems Engineering",
    description: "Resilient microservices, idempotent transaction handlers, and background workers.",
    skills: [
      {
        name: "Node.js, TypeScript & Python",
        role: "Primary runtimes for asynchronous microservices, task daemons, type-safe domain models & contract interfaces",
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
        name: "DNS MX Routing & Domains",
        role: "Multi-domain email routing (smtp.catchmail.io MX) and programmatic DNS configuration",
      },
      {
        name: "Vanilla JS / Zero Bloat",
        role: "High-performance <30KB web utilities (Vite 8) delivering instant cold loads without runtime weight",
      },
    ],
    caseStudy: { to: "/case-studies", hash: "tempmail-open-source", label: "28KB Ingress Platform" },
    fieldNote: {
      slug: "architecting-ultra-lightweight-disposable-email-platform-28kb",
      label: "28KB Email Engine",
    },
  },
  {
    category: "VPC Security, Firewalls & Payment Proxy",
    description: "Air-gapped database environments, strict firewall rules, and hardened payment proxies.",
    skills: [
      {
        name: "Private VPC DB Isolation",
        role: "MongoDB bound exclusively to non-public subnets with zero 0.0.0.0 exposure",
      },
      {
        name: "UFW Static IP Whitelisting",
        role: "Packet filtering allowing port 27017 ingress exclusively from app server static IP",
      },
      {
        name: "Payment Gateways & Dual Rails",
        role: "Production integrations for Stripe (Elements & Webhooks), SSLCommerz, EPS, UddoktaPay, bKash & Nagad",
      },
      {
        name: "Hardened Payment Proxy",
        role: "Reverse proxy validating checkout requests & webhooks before internal database commits",
      },
      {
        name: "CVE Incident Remediation",
        role: "Zero-day RCE remediation (React2Shell CVE-2025-55182) without database loss or downtime",
      },
      {
        name: "Docker Resource Capping",
        role: "Strict CPU/RAM container limits preventing rogue processes from freezing host servers",
      },
    ],
    caseStudy: { to: "/case-studies", hash: "cve-react2shell-postmortem", label: "React2Shell Incident" },
    fieldNote: {
      slug: "air-gapping-mongodb-production-ufw-payment-proxy",
      label: "Air-Gapping MongoDB",
    },
  },
  {
    category: "Marketing Engineering & Server-Side Tracking",
    description: "Bypassing browser ad-blockers and iOS ATT restrictions for 100% conversion attribution.",
    skills: [
      {
        name: "Server-Side GTM (sGTM)",
        role: "Dedicated server container architecture hosted on Stape for server-to-server tracking",
      },
      {
        name: "Meta Conversions API (CAPI)",
        role: "Direct server event dispatch bypassing Safari ITP and browser privacy extensions",
      },
      {
        name: "Deterministic Event Dedup",
        role: "Unique event_id generation matching browser pixel & server CAPI with 0 double-counts",
      },
      {
        name: "E-Commerce DataLayer",
        role: "Capturing view_item, add_to_cart, begin_checkout, and purchase events into GA4",
      },
      {
        name: "PII Cryptographic Hashing",
        role: "Client-side normalization and SHA-256 cryptographic hashing of customer data",
      },
    ],
    caseStudy: { to: "/case-studies", hash: "server-side-meta-capi", label: "sGTM & Meta CAPI" },
    fieldNote: {
      slug: "engineering-server-side-meta-capi-sgtm-tracking",
      label: "CAPI Deduplication Guide",
    },
  },
  {
    category: "AI, Python & Enterprise Automation",
    description: "Python automation daemons, Telegram bots, browser scraping, and self-hosted microservices.",
    skills: [
      {
        name: "Python Automation & Telegram Bots",
        role: "Asynchronous Python engines (aiogram, Telethon), multi-account task bots & background daemons",
      },
      {
        name: "Headless Browser Automation",
        role: "Playwright, Selenium & anti-bot bypass pipelines for dynamic DOM extraction and automated workflows",
      },
      {
        name: "Universal API Automation",
        role: "Reverse-engineering private endpoints, OAuth/HMAC signing, and high-throughput async request workers",
      },
      {
        name: "Proprietary Workflow Engines",
        role: "Custom Python & Node.js/Prisma microservices eliminating recurring SaaS vendor tax (Zapier/n8n)",
      },
      {
        name: "Omnichannel Social Bots",
        role: "Meta Graph API (FB Messenger, Instagram DM), Telegram, and TikTok automated conversational agents",
      },
      {
        name: "Self-Hosted n8n & Docker",
        role: "Dedicated webhook pipelines, queue runners, and private enterprise task automation",
      },
      {
        name: "Structured LLM Orchestration",
        role: "Deterministic JSON schema generation enforced via strict Zod & Pydantic validation",
      },
    ],
    caseStudy: {
      to: "/case-studies",
      hash: "quickmation-automation-engine",
      label: "QuickMation Engine",
    },
    fieldNote: {
      slug: "building-proprietary-ai-automation-engines-vs-saas-tax",
      label: "Proprietary AI vs SaaS Tax",
    },
  },
  {
    category: "Databases, Multi-Tier Caching & Cloud",
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
        role: "Presigned URL generation, anti-leech token vaults & global media distribution",
      },
      {
        name: "Singleflight Coalescing",
        role: "Eliminating cache stampedes and thundering herd problems during peak spikes",
      },
    ],
    caseStudy: { to: "/case-studies", hash: "caching-fabric", label: "Redis Caching Fabric" },
    fieldNote: {
      slug: "singleflight-redis-cache-stampede-prevention-nodejs",
      label: "Singleflight 22ms P99",
    },
  },
  {
    category: "Automated Testing & Reliability Harness",
    description: "Financial ledger correctness, continuous integration gates, and zero-regression deployments.",
    skills: [
      {
        name: "Vitest & Jest",
        role: "Automated unit test suites for pricing algorithms, auth guards & domain logic",
      },
      {
        name: "Supertest Integration Tests",
        role: "End-to-end HTTP integration tests for webhook ingestion & checkout APIs",
      },
      {
        name: "GitHub Actions CI/CD",
        role: "Automated CI pipelines: linting, type-checking & test runners on every Pull Request",
      },
      {
        name: "Docker Test Containers",
        role: "Spinning isolated Redis and Mongo instances in CI runners for deterministic tests",
      },
      {
        name: "Branch Protection & PR Gates",
        role: "Strict status checks enforcing test passes before production deployment",
      },
    ],
    caseStudy: {
      to: "/case-studies",
      hash: "monetrix-vpc-proxy",
      label: "Idempotent Payment Testing",
    },
  },
];

function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-16">
      <SectionHeader
        eyebrow="Technical Stack & Architecture"
        title="Battle-Tested Engineering Capabilities"
        description="Every tool and methodology in this matrix was selected for verified uptime, security, and measurable performance. Backed by automated test harnesses and live production experience."
      />

      {/* Grid of Skill Categories */}
      <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal key={group.category}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/70 p-6 sm:p-7 flex flex-col justify-between hover:border-white/15 transition-all shadow-xl h-full">
              <div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-white">{group.category}</h2>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{group.description}</p>
                </div>

                <div className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 group"
                    >
                      <span className="font-mono text-xs font-semibold text-white shrink-0 group-hover:text-blue-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs text-zinc-400 sm:text-right leading-relaxed sm:max-w-[280px]">
                        {skill.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Case Study & Field Note Links */}
              {(group.caseStudy || group.fieldNote) && (
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                  {group.caseStudy && (
                    <Link
                      to={group.caseStudy.to}
                      hash={group.caseStudy.hash}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
                    >
                      <span>Case Study: {group.caseStudy.label}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  )}
                  {group.fieldNote && (
                    <Link
                      to="/blogs/$slug"
                      params={{ slug: group.fieldNote.slug }}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Field Note: {group.fieldNote.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* PRODUCTION ENGINEERING DISCIPLINE STANDARDS */}
      <Reveal className="mt-12 sm:mt-16">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/70 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Standard Operating Procedure
            </span>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white">
            Production Quality Standards on Every Deployment
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            Before any service is labeled operational, it must pass these non-negotiable architectural gates:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                title: "Server-Side Tracking (CAPI)",
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
            ].map((check, index) => (
              <div
                key={check.title}
                className="rounded-xl border border-white/[0.05] bg-black/40 p-4 transition-colors hover:border-white/10"
              >
                <div className="font-mono text-[11px] text-zinc-500">0{index + 1}</div>
                <div className="mt-1 text-sm font-semibold text-white">{check.title}</div>
                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
