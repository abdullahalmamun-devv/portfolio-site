import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { TechChip } from "../components/TechChip";
import { blogPosts } from "../data/blogPosts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdullah Al Mamun — Senior Node.js & Full-Stack Developer for Hire" },
      {
        name: "description",
        content:
          "Senior full-stack engineer & founder of 4 live platforms. Hire me for Node.js/Next.js architecture, server-side tracking (CAPI/sGTM), payment systems & AI automation.",
      },
      {
        property: "og:title",
        content: "Abdullah Al Mamun — Senior Node.js & Full-Stack Developer for Hire",
      },
      {
        property: "og:description",
        content:
          "Senior full-stack engineer & founder of 4 live platforms. Hire me for Node.js/Next.js architecture, server-side tracking, payment systems & AI automation.",
      },
      { property: "og:url", content: "https://iamabdullah.dev/" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://iamabdullah.dev/og-image.png" },
      { property: "og:image:secure_url", content: "https://iamabdullah.dev/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Abdullah Al Mamun — Senior Node.js & Full-Stack Developer for Hire",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Abdullah Al Mamun — Senior Node.js & Full-Stack Developer for Hire" },
      {
        name: "twitter:description",
        content:
          "Senior full-stack engineer & founder of 4 live platforms. Hire me for Node.js/Next.js architecture, server-side tracking, payment systems & AI automation.",
      },
      { name: "twitter:image", content: "https://iamabdullah.dev/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://iamabdullah.dev/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Abdullah Al Mamun",
              url: "https://iamabdullah.dev",
              jobTitle: "Senior Full-Stack Developer & Tech Founder",
              description: "Senior full-stack engineer & founder of 4 live platforms. Specializing in Node.js/Next.js architecture, server-side tracking, payment systems & AI automation.",
              image: "https://iamabdullah.dev/icon_site_match_1024.png",
              sameAs: [
                "https://github.com/abdullahalmamun-devv",
                "https://www.linkedin.com/in/abdullah-al-mamun-b07295329/",
              ],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Professional Services by Abdullah Al Mamun",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Service",
                  name: "Full-Stack Web Development",
                  description: "Production-grade Node.js, Next.js, and React application architecture with Redis caching, MongoDB optimization, and Docker containerization.",
                  provider: { "@type": "Person", name: "Abdullah Al Mamun", url: "https://iamabdullah.dev" },
                  serviceType: "Web Development",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Service",
                  name: "Server-Side Tracking & Analytics",
                  description: "Meta CAPI, sGTM, and GA4 server-side implementation with event deduplication and ad-blocker bypass for accurate e-commerce attribution.",
                  provider: { "@type": "Person", name: "Abdullah Al Mamun", url: "https://iamabdullah.dev" },
                  serviceType: "Marketing Technology",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Service",
                  name: "Enterprise AI & Python Automation",
                  description: "Python automation engines, Telegram bots, headless browser automation (Playwright/Selenium), custom omnichannel AI chatbots, and self-hosted n8n deployments.",
                  provider: { "@type": "Person", name: "Abdullah Al Mamun", url: "https://iamabdullah.dev" },
                  serviceType: "AI & Automation",
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Service",
                  name: "VPS Security & Infrastructure Hardening",
                  description: "Linux server hardening, UFW firewall configuration, MongoDB air-gapping, incident response, and Docker container isolation.",
                  provider: { "@type": "Person", name: "Abdullah Al Mamun", url: "https://iamabdullah.dev" },
                  serviceType: "DevOps & Security",
                },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: {
                  "@type": "Service",
                  name: "Payment Gateway Integration",
                  description: "Multi-rail FinTech payment systems with Stripe, SSLCommerz, EPS, bKash, Nagad, UddoktaPay, and international card processing with HMAC webhook verification.",
                  provider: { "@type": "Person", name: "Abdullah Al Mamun", url: "https://iamabdullah.dev" },
                  serviceType: "FinTech Development",
                },
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://iamabdullah.dev/" },
            ],
          },
        ]),
      },
    ],
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
            <h1 className="max-w-4xl text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight sm:leading-[1.15]">
              Senior Full-Stack Engineer &amp; Systems Architect.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
              I am{" "}
              <strong className="font-pixel text-[13px] sm:text-sm font-normal tracking-wider text-white">
                Abdullah Al Mamun
              </strong>{" "}
              — CEO &amp; Founder of{" "}
              <a
                href="https://subsdrop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-medium"
              >
                SubsDrop
              </a>
              , Co-Founder of{" "}
              <a
                href="https://quickmation.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline font-medium"
              >
                QuickMation
              </a>
              , and Operator at{" "}
              <a
                href="https://www.protrainerit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-medium"
              >
                Pro Trainer IT
              </a>
              . I architect battle-hardened Node.js &amp; Python backend infrastructure, multi-tier Redis
              caching, FinTech payment reconciliation (Stripe, SSLCommerz, EPS, MFS), Telegram &amp; browser automation, and custom enterprise AI engines.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4 LIVE PLATFORMS SHOWCASE */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
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
              <div>
                <h3 className="text-lg font-bold text-white">SubsDrop</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Founder &amp; Chief Executive Officer</p>
              </div>
              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                Bangladesh’s #1 digital subscription marketplace offering 25+ premium tools (Canva
                Pro, ChatGPT Plus, Grammarly). Ecosystem includes media.subsdrop.com CDN, Live TV
                streaming (tv.subsdrop.com), and disposable email utility
                (temp.subsdrop.com) with automated credential delivery and multi-rail payments.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <TechChip>Next.js 15</TechChip>
                <TechChip>ioredis</TechChip>
                <TechChip>MongoDB</TechChip>
                <TechChip>WebSockets</TechChip>
                <TechChip>Cloudflare R2</TechChip>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">subsdrop.com</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://temp.subsdrop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-400 hover:text-white"
                >
                  tempmail
                </a>
                <span className="text-zinc-700">|</span>
                <a
                  href="https://subsdrop.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
              <div>
                <h3 className="text-lg font-bold text-white">QuickMation</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Co-Founder &amp; Automation Architect</p>
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
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                Visit Agency <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Pro Trainer IT */}
          <div className="rounded-xl border border-white/10 bg-[#111318] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
            <div>
              <div>
                <h3 className="text-lg font-bold text-white">Pro Trainer IT</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Operator &amp; Scaling Strategist</p>
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
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Visit Academy <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* MoneTrix */}
          <div className="rounded-xl border border-white/10 bg-[#111318] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
            <div>
              <div>
                <h3 className="text-lg font-bold text-white">MoneTrix</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Architect &amp; Creator</p>
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
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Visit MoneTrix <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* LATEST FIELD NOTES — internal links from homepage to blog posts (crawl depth 1) */}
      <section
        id="field-notes"
        className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 border-b border-white/[0.06]"
      >
        <div className="flex flex-wrap items-end justify-between gap-3 max-w-3xl">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Fresh From Production
            </h2>
            <p className="mt-1.5 text-zinc-400 text-xs sm:text-sm">
              Incident post-mortems, architecture decisions, and performance engineering — written
              from live systems, not theory.
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            View All Field Notes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-xl border border-white/[0.08] bg-[#0c0e14]/70 p-4 sm:p-5 transition-all hover:border-blue-500/40 hover:bg-[#0f121a]"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                {post.categoryLabel}
              </span>
              <h3 className="mt-2 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                {post.subtitle}
              </p>
              <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-400">
                Read Field Note <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FREELANCE / REMOTE CONTRACT BANNER */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#111318] to-[#0a0c10] p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              Ready for Immediate Engagement
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
