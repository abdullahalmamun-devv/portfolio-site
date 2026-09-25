import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Server,
  Users,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  ArrowRight,
  Globe,
  Tv,
  Bot,
  ShoppingBag,
  Cpu,
  Layers,
  Lock,
  LineChart,
  ShieldAlert,
  Mail,
  Github,
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal";
import { TechChip } from "../components/TechChip";

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
      { property: "og:url", content: "/ventures" },
    ],
    links: [{ rel: "canonical", href: "/ventures" }],
  }),
  component: VenturesPage,
});

function VenturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-12">
      <SectionHeader
        eyebrow="Commercial Portfolio"
        title="Four Live Platforms. One Systems Architect & Builder."
        description="I combine product strategy, operational management, and hands-on system engineering. Every platform listed below is live, generating value, and backed by production code."
      />

      {/* DETAILED VENTURE DOSSIERS */}
      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        {/* VENTURE 1: SUBSDROP */}
        <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 lg:p-7 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <Briefcase className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white">SubsDrop</h2>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                    LIVE PLATFORM
                  </span>
                  <a
                    href="https://subsdrop.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4"
                  >
                    https://subsdrop.com <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-1 text-sm font-medium text-blue-400">
                  Role: Founder &amp; Chief Executive Officer
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                  Dhaka, Bangladesh • Serving Nationwide &amp; International Customers
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://subsdrop.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 shadow-sm"
              >
                Visit SubsDrop.com <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://tv.subsdrop.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10"
              >
                <Tv className="h-3.5 w-3.5 text-emerald-400" /> tv.subsdrop.com
              </a>
              <a
                href="https://temp.subsdrop.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-500/20"
              >
                <Mail className="h-3.5 w-3.5 text-blue-400" /> temp.subsdrop.com
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  The Problem &amp; Architecture
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Navigating digital subscriptions in Bangladesh has historically been broken due to
                  dual-currency card barriers, high conversion fees, and manual delays. SubsDrop is
                  engineered as Bangladesh’s #1 digital subscription hub, allowing thousands of
                  professionals and teams to access 25+ essential tools (Canva Pro, ChatGPT Plus,
                  Grammarly, Envato Elements) with instant automated delivery.
                </p>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  As CEO and Lead Architect, I engineered the platform on Next.js 15, Node.js, and
                  ioredis, deploying our automated credential vault, WebSocket live updates,
                  Cloudflare R2 media CDN (media.subsdrop.com), Live TV streaming (tv.subsdrop.com),
                  our open-source temporary email service (temp.subsdrop.com), and multi-rail
                  payment reconciliation over bKash, Nagad, Rocket, and global cards.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  Key Production Highlights
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <CreditCard className="h-4 w-4 text-blue-400" />
                      Idempotent Payments
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      UddoktaPay &amp; IT Pay BD integrated with Redis distributed locks preventing
                      duplicate order credits.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Server className="h-4 w-4 text-emerald-400" />
                      Automated Vault
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Automated token, invite, and license key distribution pipeline delivering to
                      users under 30 seconds.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Mail className="h-4 w-4 text-purple-400" />
                      Open-Source TempMail
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      High-performance disposable mail utility deployed at temp.subsdrop.com with
                      DNS MX routing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
                  Technical Architecture
                </h4>
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div>
                    <span className="text-zinc-400 block">Frontend &amp; App:</span>
                    <span className="font-mono text-white font-medium">
                      Next.js 15, TypeScript, Tailwind
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Cache &amp; Queue:</span>
                    <span className="font-mono text-white font-medium">
                      ioredis 5.8, WebSockets (ws 8.20)
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Database &amp; Storage:</span>
                    <span className="font-mono text-white font-medium">
                      MongoDB, AWS S3 / Cloudflare R2
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Payments:</span>
                    <span className="font-mono text-white font-medium">
                      UddoktaPay, IT Pay BD, Stripe
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
                <a
                  href="https://subsdrop.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-blue-400 hover:underline"
                >
                  <span>subsdrop.com</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* VENTURE 2: QUICKMATION */}
        <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 lg:p-7 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <Bot className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white">QuickMation</h2>
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-purple-400">
                    AGENCY &amp; PLATFORM
                  </span>
                  <a
                    href="https://quickmation.online"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4"
                  >
                    https://quickmation.online <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-1 text-sm font-medium text-purple-400">
                  Role: Co-Founder &amp; Automation Architect
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <Globe className="h-3.5 w-3.5 text-zinc-400" />
                  Global AI &amp; Enterprise Automation Agency
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://quickmation.online"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500 shadow-sm"
              >
                Visit QuickMation.online <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  Custom AI Automation Without Vendor Lock-in
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Most automation agencies simply connect generic Zapier or n8n nodes and bill
                  clients exorbitant ongoing SaaS fees. At QuickMation, we architect custom
                  enterprise automation engines alongside self-hosted n8n instances so clients own
                  their data, control latency, and pay zero markup on API calls.
                </p>
                <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
                  We engineer omnichannel message bots across Facebook Messenger, Instagram DM,
                  TikTok, and custom web chatbots, alongside bespoke business automation software
                  for education, industrial supply chains, and e-commerce.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  Core Automation Capabilities
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Bot className="h-4 w-4 text-purple-400" />
                      Omnichannel AI Assistants
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Context-aware bots handling customer inquiries, lead qualification, and
                      appointment booking.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      Custom Automation Microservices
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Proprietary workflow engines in Node.js &amp; Prisma replacing expensive SaaS
                      connectors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold">
                  Agency Stack
                </h4>
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div>
                    <span className="text-zinc-400 block">Framework:</span>
                    <span className="font-mono text-white font-medium">
                      Next.js 16.2, TypeScript
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Database &amp; ORM:</span>
                    <span className="font-mono text-white font-medium">PostgreSQL, Prisma 7.8</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">3D Graphics:</span>
                    <span className="font-mono text-white font-medium">
                      Three.js, React Three Fiber
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Automation:</span>
                    <span className="font-mono text-white font-medium">
                      Custom Node.js, Self-Hosted n8n
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
                <a
                  href="https://quickmation.online"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-purple-400 hover:underline"
                >
                  <span>quickmation.online</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* VENTURE 3: PRO TRAINER IT */}
        <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 lg:p-7 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <GraduationCap className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white">Pro Trainer IT</h2>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-blue-400">
                    ACADEMY
                  </span>
                  <a
                    href="https://www.protrainerit.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                  >
                    https://protrainerit.com <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-1 text-sm font-medium text-emerald-400">
                  Role: Operator, Systems Lead &amp; Scaling Strategist
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                  HQ: মহারাজপুর ঘোড়াস্ট্যান্ড, চাঁপাইনবাবগঞ্জ সদর - ৬৩০০ • Reaching Nationwide
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://www.protrainerit.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 shadow-sm"
              >
                Visit ProTrainerIT.com <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="tel:01628786666"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 font-mono"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" /> 01628-786666
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  Democratizing Practical Engineering Education
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Pro Trainer IT originated as a dedicated physical learning academy in Maharajpur,
                  Chapainawabganj. I am scaling its transformation into a hybrid and online platform
                  reaching software engineers, developers, and operators across all 64 districts of
                  Bangladesh.
                </p>
                <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
                  The platform is built on Next.js 16 with secure AWS S3 presigned video delivery
                  for courses, live student dashboards, automated enrollment verification, and
                  hands-on capstone mentor pipelines.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  Curriculum &amp; Operations
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Users className="h-4 w-4 text-emerald-400" />
                      Live Batches &amp; Mentoring
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Cohorts in Full-Stack MERN, Python &amp; Machine Learning, DevOps, and UI/UX
                      Design.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Server className="h-4 w-4 text-blue-400" />
                      High-Performance LMS Platform
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      S3 presigned video streaming, interactive quizzes, and automated certificate
                      verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                  Platform Stack
                </h4>
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div>
                    <span className="text-zinc-400 block">Framework:</span>
                    <span className="font-mono text-white font-medium">Next.js 16.1, React 19</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Video Streaming:</span>
                    <span className="font-mono text-white font-medium">AWS S3 Presigned URLs</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Database &amp; State:</span>
                    <span className="font-mono text-white font-medium">
                      MongoDB, Mongoose 9, Zustand
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Testing:</span>
                    <span className="font-mono text-white font-medium">
                      Vitest automated suites
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
                <a
                  href="https://www.protrainerit.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-emerald-400 hover:underline"
                >
                  <span>protrainerit.com</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* VENTURE 4: MONETRIX */}
        <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 lg:p-7 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <ShoppingBag className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white">MoneTrix</h2>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                    SAAS PRODUCT
                  </span>
                  <a
                    href="https://www.monetrix.shop"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
                  >
                    https://www.monetrix.shop <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-1 text-sm font-medium text-amber-400">
                  Role: Lead Architect &amp; Creator
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <Globe className="h-3.5 w-3.5 text-zinc-400" />
                  E-Commerce &amp; Automated Delivery SaaS for Digital Product Sellers
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://www.monetrix.shop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-500 shadow-sm"
              >
                Visit MoneTrix.shop <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Backend Infrastructure &amp; Security Architecture
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Selling digital templates, software licenses, graphics bundles, and media files
                  requires a resilient, zero-compromise security posture. I designed a 3-tier
                  hardened architecture to protect our customer transactions and persistent data:
                </p>
                <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      1. Isolated Database Setup
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      MongoDB is deployed in a strictly isolated private environment with zero
                      exposure to public networks (0.0.0.0 completely closed).
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                      2. Strict Firewall Rules
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      Server-level UFW firewall drops all inbound traffic on port 27017 except
                      connections from our dedicated application server's static IP, dropping breach
                      risks to near zero.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      3. Payment Proxy Architecture
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      All local gateway checkouts &amp; webhooks pass through a secure payment
                      proxy. Transactions validate via proxy before hitting 3rd-party gateways;
                      webhook callbacks are verified before DB updates.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Tracking &amp; Data Analytics (Marketing) Architecture
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  To ensure 100% accurate marketing data and optimize ROAS without losing
                  conversions to iOS 14.5+ restrictions or ad-blockers, I implemented an advanced
                  tracking pipeline:
                </p>
                <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400" />
                      1. Server-Side Tracking (sGTM &amp; CAPI)
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      Hosted a Google Tag Manager server container via Stape, integrating Meta
                      Conversions API (CAPI) to stream direct server-to-server events bypassing
                      ad-blockers.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      2. Event Deduplication
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      Dual-stream browser Pixel &amp; server CAPI hits are tagged with deterministic{" "}
                      <code className="text-amber-300 font-mono text-[11px]">event_id</code> hashes,
                      preventing any double-counting of Add to Cart or Purchase events.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                      3. Custom Data Layer &amp; GA4
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                      Engineered a custom e-commerce DataLayer capturing granular user journey
                      behavior and syncing structured event data directly into Google Analytics 4
                      (GA4).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Product &amp; Security Stack
                </h4>
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div>
                    <span className="text-zinc-400 block">Framework:</span>
                    <span className="font-mono text-white font-medium">Next.js 16.2, React 19</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">DB &amp; Security:</span>
                    <span className="font-mono text-white font-medium">
                      Isolated VPC Mongo, UFW IP Whitelist
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Payment Proxy:</span>
                    <span className="font-mono text-white font-medium">
                      Hardened Webhook Ingress (HMAC)
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Tracking &amp; CAPI:</span>
                    <span className="font-mono text-white font-medium">
                      sGTM (Stape), Meta CAPI, GA4 DataLayer
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Secure Storage:</span>
                    <span className="font-mono text-white font-medium">
                      AWS S3 Presigner (Anti-Leech)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
                <a
                  href="https://www.monetrix.shop"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-amber-400 hover:underline"
                >
                  <span>monetrix.shop</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
