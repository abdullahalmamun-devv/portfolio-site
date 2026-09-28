import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/ventures")({
  head: () => ({
    meta: [
      { title: "Ventures & Live Platforms — SubsDrop, QuickMation, Pro Trainer IT, MoneTrix" },
      {
        name: "description",
        content:
          "Four active platforms architected and operated by Abdullah Al Mamun: SubsDrop, QuickMation, Pro Trainer IT, and MoneTrix.",
      },
      { property: "og:title", content: "Ventures & Live Platforms — Abdullah Al Mamun" },
      {
        property: "og:description",
        content:
          "Operating leadership, product strategy, and technical architecture across 4 live platforms.",
      },
      { property: "og:url", content: "https://iamabdullah.dev/ventures" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://iamabdullah.dev/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ventures & Live Platforms — Abdullah Al Mamun" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ventures & Live Platforms — Abdullah Al Mamun" },
      {
        name: "twitter:description",
        content:
          "Operating leadership, product strategy, and technical architecture across 4 live platforms.",
      },
      { name: "twitter:image", content: "https://iamabdullah.dev/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://iamabdullah.dev/ventures" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://iamabdullah.dev/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Ventures",
                item: "https://iamabdullah.dev/ventures",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Ventures founded or operated by Abdullah Al Mamun",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Organization",
                  name: "SubsDrop",
                  url: "https://subsdrop.com",
                  description:
                    "Digital subscription marketplace offering 25+ premium tools with automated credential delivery and multi-rail payments in Bangladesh.",
                  founder: {
                    "@type": "Person",
                    name: "Abdullah Al Mamun",
                    url: "https://iamabdullah.dev",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Organization",
                  name: "QuickMation",
                  url: "https://quickmation.online",
                  description:
                    "Enterprise AI & automation agency building custom chatbots, messaging systems, and proprietary automation infrastructure.",
                  founder: {
                    "@type": "Person",
                    name: "Abdullah Al Mamun",
                    url: "https://iamabdullah.dev",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Organization",
                  name: "Pro Trainer IT",
                  url: "https://protrainerit.com",
                  description:
                    "National IT academy headquartered in Chapainawabganj, Bangladesh offering live cohorts in MERN, Python & Machine Learning, and DevOps.",
                  employee: {
                    "@type": "Person",
                    name: "Abdullah Al Mamun",
                    url: "https://iamabdullah.dev",
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Organization",
                  name: "MoneTrix",
                  url: "https://www.monetrix.shop",
                  description:
                    "E-commerce and digital product delivery SaaS with hardened payment proxy architecture and server-side tracking.",
                  creator: {
                    "@type": "Person",
                    name: "Abdullah Al Mamun",
                    url: "https://iamabdullah.dev",
                  },
                },
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: VenturesPage,
});

function VenturesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-16">
      <SectionHeader
        title="Four Operating Platforms. Built from Ground Up."
        description="I combine product strategy, operational management, and hands-on system engineering. Every platform listed below is live, generating real commercial value, and backed by production code."
      />

      <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
        {/* VENTURE 1: SUBSDROP */}
        <Reveal>
          <article className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/80 p-5 sm:p-8 lg:p-9 transition-colors hover:border-white/15 shadow-xl">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">SubsDrop</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="text-zinc-200">Founder &amp; Chief Executive Officer</span>
                  <span>•</span>
                  <span>Digital Subscription Hub &amp; Media CDN</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <a
                  href="https://subsdrop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 shadow-sm"
                >
                  Visit subsdrop.com <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </header>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
              <span>Ecosystem utilities:</span>
              <a
                href="https://tv.subsdrop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                tv.subsdrop.com ↗
              </a>
              <span>•</span>
              <a
                href="https://temp.subsdrop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white underline underline-offset-4"
              >
                temp.subsdrop.com ↗
              </a>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Overview &amp; Architecture
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Navigating digital subscriptions in Bangladesh has historically been broken due to
                  dual-currency card limits, high foreign exchange fees, and manual delays. SubsDrop is
                  engineered as Bangladesh’s #1 digital subscription hub, allowing thousands of
                  professionals and teams to access 25+ essential tools (Canva Pro, ChatGPT Plus,
                  Grammarly, Envato Elements) with instant automated delivery.
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  As CEO and Lead Architect, I engineered the platform on Next.js 15, Node.js, and
                  ioredis, deploying our automated credential vault, WebSocket live updates,
                  Cloudflare R2 media CDN, high-speed temporary email service, and multi-rail payment
                  reconciliation over bKash, Nagad, and global cards.
                </p>

                <div className="pt-2">
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: "singleflight-redis-cache-stampede-prevention-nodejs" }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Read Post-Mortem: Slashing SubsDrop P99 Latency to 22ms <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 rounded-xl border border-white/[0.06] bg-black/40 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold pb-3 border-b border-white/[0.06]">
                    Technical Specifications
                  </h4>
                  <dl className="mt-4 space-y-3 text-xs font-mono">
                    <div>
                      <dt className="text-zinc-500">Frontend &amp; App</dt>
                      <dd className="text-zinc-200 mt-0.5">Next.js 15, TypeScript, Tailwind</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Cache &amp; Real-time</dt>
                      <dd className="text-zinc-200 mt-0.5">ioredis, WebSockets (ws 8.20)</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Database &amp; Media CDN</dt>
                      <dd className="text-zinc-200 mt-0.5">MongoDB, Cloudflare R2</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Payment Gateways</dt>
                      <dd className="text-zinc-200 mt-0.5">Stripe, SSLCommerz, EPS, UddoktaPay, bKash &amp; Nagad</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                  Status: Active Production • Zero Downtime
                </div>
              </aside>
            </div>
          </article>
        </Reveal>

        {/* VENTURE 2: QUICKMATION */}
        <Reveal>
          <article className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/80 p-5 sm:p-8 lg:p-9 transition-colors hover:border-white/15 shadow-xl">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">QuickMation</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="text-zinc-200">Co-Founder &amp; Automation Architect</span>
                  <span>•</span>
                  <span>Enterprise AI &amp; Workflow Microservices</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <a
                  href="https://quickmation.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Visit quickmation.online <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </header>

            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Overview &amp; Architecture
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Most automation agencies cobble together generic Zapier or n8n cloud connectors and bill
                  clients exorbitant recurring subscription fees. At QuickMation, we architect custom
                  enterprise automation engines alongside dedicated, self-hosted n8n instances so clients own
                  their data, eliminate SaaS task markups, and achieve sub-100ms response latencies.
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  We engineer context-aware omnichannel AI assistants across Telegram, Facebook Messenger,
                  Instagram DM, TikTok, and web chat, alongside bespoke Python scraping and headless browser
                  automation pipelines (Playwright/Selenium) for business workflows, education, and e-commerce.
                </p>

                <div className="pt-2">
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: "building-proprietary-ai-automation-engines-vs-saas-tax" }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Read Field Note: Eliminating the SaaS Tax in Automation <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 rounded-xl border border-white/[0.06] bg-black/40 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold pb-3 border-b border-white/[0.06]">
                    Technical Specifications
                  </h4>
                  <dl className="mt-4 space-y-3 text-xs font-mono">
                    <div>
                      <dt className="text-zinc-500">App Framework</dt>
                      <dd className="text-zinc-200 mt-0.5">Next.js 16.2, TypeScript</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Database &amp; ORM</dt>
                      <dd className="text-zinc-200 mt-0.5">PostgreSQL, Prisma 7.8</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Automation Engine</dt>
                      <dd className="text-zinc-200 mt-0.5">Python (Telegram/Playwright), Node.js, n8n</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">3D Visuals</dt>
                      <dd className="text-zinc-200 mt-0.5">Three.js, React Three Fiber</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                  Delivery: Custom Self-Hosted Engines
                </div>
              </aside>
            </div>
          </article>
        </Reveal>

        {/* VENTURE 3: PRO TRAINER IT */}
        <Reveal>
          <article className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/80 p-5 sm:p-8 lg:p-9 transition-colors hover:border-white/15 shadow-xl">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Pro Trainer IT</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="text-zinc-200">Operator &amp; Systems Lead</span>
                  <span>•</span>
                  <span>National IT Academy &amp; Video LMS Platform</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <a
                  href="https://www.protrainerit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Visit protrainerit.com <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </header>

            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Overview &amp; Architecture
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Pro Trainer IT is a premier technical academy scaling practical software engineering
                  education across all 64 districts of Bangladesh. The organization conducts intensive live
                  cohorts in Full-Stack MERN, Python &amp; Machine Learning, and Cloud DevOps.
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  As Systems Lead, I architected the proprietary LMS infrastructure on Next.js 16 and AWS S3,
                  implementing presigned URL video streaming with token verification to prevent unauthorized
                  leeching, alongside student dashboards, automated enrollment verification, and Vitest-backed
                  code assessment pipelines.
                </p>

                <div className="pt-2">
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: "surviving-react2shell-cve-2025-55182-vps-recovery" }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Read RCA: Surviving a Zero-Day React2Shell Attack on Pro Trainer IT <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 rounded-xl border border-white/[0.06] bg-black/40 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold pb-3 border-b border-white/[0.06]">
                    Technical Specifications
                  </h4>
                  <dl className="mt-4 space-y-3 text-xs font-mono">
                    <div>
                      <dt className="text-zinc-500">Core Framework</dt>
                      <dd className="text-zinc-200 mt-0.5">Next.js 16.1, React 19</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Video Ingress &amp; CDN</dt>
                      <dd className="text-zinc-200 mt-0.5">AWS S3 Presigned URLs (Secure Tokens)</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Data &amp; State</dt>
                      <dd className="text-zinc-200 mt-0.5">MongoDB, Mongoose 9, Zustand</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Test Harness</dt>
                      <dd className="text-zinc-200 mt-0.5">Vitest Automated Suites</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                  Reach: 64 Districts Nationwide
                </div>
              </aside>
            </div>
          </article>
        </Reveal>

        {/* VENTURE 4: MONETRIX */}
        <Reveal>
          <article className="rounded-2xl border border-white/[0.08] bg-[#0c0e14]/80 p-5 sm:p-8 lg:p-9 transition-colors hover:border-white/15 shadow-xl">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">MoneTrix</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
                  <span className="text-zinc-200">Architect &amp; Creator</span>
                  <span>•</span>
                  <span>Digital Goods E-Commerce &amp; Automated Delivery</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <a
                  href="https://www.monetrix.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Visit monetrix.shop <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </header>

            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Overview &amp; Architecture
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Selling digital templates, software licenses, graphics bundles, and media files requires a
                  resilient, zero-compromise security posture. I designed a hardened architecture with an
                  isolated private MongoDB VPC (0.0.0.0 closed, strict server-level UFW firewall allowing port
                  27017 only from our app server) and a hardened Payment Proxy gateway for local MFS checkout.
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  To ensure 100% accurate marketing attribution without losing conversion telemetry to iOS 14.5+
                  ATT restrictions or ad-blockers, I deployed a server-side Google Tag Manager (sGTM) container
                  on Stape with Meta Conversions API (CAPI) and deterministic event_id deduplication.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: "engineering-server-side-meta-capi-sgtm-tracking" }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Read: Server-Side Meta CAPI &amp; sGTM Pipeline <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: "air-gapping-mongodb-production-ufw-payment-proxy" }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Read: Air-Gapping MongoDB in Production <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 rounded-xl border border-white/[0.06] bg-black/40 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold pb-3 border-b border-white/[0.06]">
                    Technical Specifications
                  </h4>
                  <dl className="mt-4 space-y-3 text-xs font-mono">
                    <div>
                      <dt className="text-zinc-500">Core Framework</dt>
                      <dd className="text-zinc-200 mt-0.5">Next.js 16.2, React 19</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Database &amp; Isolation</dt>
                      <dd className="text-zinc-200 mt-0.5">Isolated VPC MongoDB, UFW Firewall</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Payment Ingress</dt>
                      <dd className="text-zinc-200 mt-0.5">Stripe, SSLCommerz, EPS, MFS (HMAC Proxy)</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Attribution &amp; Tracking</dt>
                      <dd className="text-zinc-200 mt-0.5">sGTM (Stape), Meta CAPI, GA4 DataLayer</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
                  Security: 0.0.0.0 Ingress Dropped
                </div>
              </aside>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
