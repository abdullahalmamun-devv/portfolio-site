import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Database,
  CreditCard,
  Terminal,
  Server,
  Zap,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  ArrowUpRight,
  Flame,
  ShieldAlert,
  Bot,
  Layers,
  Cpu,
  Lock,
  LineChart,
  Network,
  Mail,
  Github,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { TechChip } from "../components/TechChip";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Systems, Incident Post-Mortems & Code — Abdullah Al Mamun" },
      {
        name: "description",
        content:
          "Production technical case studies, zero-day CVE post-mortems (React2Shell CVE-2025-55182), isolated private VPC database architecture, Server-Side Meta CAPI tracking, and open-source disposable email engine (TempMail).",
      },
      {
        property: "og:title",
        content: "Systems, Incident Post-Mortems & Code — Abdullah Al Mamun",
      },
      {
        property: "og:description",
        content:
          "Hard-won engineering post-mortems, telemetry, and architectural blueprints for production systems.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

type Category =
  "all" | "postmortem" | "security" | "tracking" | "infra" | "automation" | "opensource";

interface CaseStudyLink {
  label: string;
  url: string;
  isPrimary?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CaseStudy {
  id: string;
  category: "postmortem" | "security" | "tracking" | "infra" | "automation" | "opensource";
  icon: React.ComponentType<{ className?: string }>;
  codeBadge: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  telemetry: { label: string; value: string; change: string }[];
  stack: string[];
  codeSnippet: string;
  links?: CaseStudyLink[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "cve-react2shell-postmortem",
    category: "postmortem" as const,
    icon: Flame,
    codeBadge: "INCIDENT POST-MORTEM: CVE-2025-55182",
    title: "Surviving a Zero-Day React2Shell Attack & 100% CPU Recovery Under Live Traffic",
    subtitle:
      "Regaining root control, purging malware persistence, and restoring Pro Trainer IT & SubsDrop with zero data loss.",
    problem:
      "Our production Linux VPS suddenly became unresponsive with CPU, RAM, and disk I/O pinned at 100% (normal baseline is 15-20%). Even standard SSH logins were hanging. At the time, both Pro Trainer IT and SubsDrop were co-located on this host. With hundreds of active students trying to stream classes and customers attempting checkout on SubsDrop, furious error tickets flooded in. Our core services were completely suffocating.",
    solution:
      "Accessed the server via out-of-band VNC rescue console. Through process inspection and socket analysis, discovered an active Remote Code Execution (RCE) intrusion via the React2Shell vulnerability (CVE-2025-55182) that had spawned an unauthorized cryptominer and hidden persistence scripts in /tmp and cron. Killed malicious process trees, removed unauthorized cronjobs and root SSH keys, patched vulnerable packages, isolated SubsDrop and Pro Trainer IT into separate Docker containers with strict CPU/memory limits, hardened the UFW firewall, and brought both production services back online with zero database loss.",
    telemetry: [
      { label: "Data Loss", value: "0 bytes", change: "100% integrity" },
      { label: "Recovery Time", value: "< 45 mins", change: "From detection to live" },
      { label: "Post-Patch CPU", value: "14%", change: "Normalized baseline" },
      { label: "Persistence Cleared", value: "100%", change: "Cron + sockets + binaries" },
    ],
    stack: [
      "Linux VPS (Ubuntu)",
      "VNC Console",
      "Bash",
      "Docker Container Limits",
      "UFW Firewall",
      "PM2",
    ],
    codeSnippet: `#!/usr/bin/env bash
# Production Incident Response & Process Isolation Script
# 1. Inspect top resource-consuming processes and abnormal socket connections
ps aux --sort=-%cpu | head -n 10
ss -tulpn | grep -E ':(4444|6666|3333|8080)'

# 2. Terminate rogue miner/exploit process tree immediately
kill -9 $(pgrep -f "malicious_binary_name")
kill -9 $(pgrep -f "/tmp/.*shell")

# 3. Clean malicious crontabs and systemd timer persistence
crontab -r
rm -f /etc/cron.d/malware_* /var/spool/cron/crontabs/*
rm -rf /tmp/.miner* /dev/shm/.shell*

# 4. Enforce strict Docker container resource capping (prevent future host CPU freezes)
# docker-compose.prod.yml snippet:
# deploy:
#   resources:
#     limits:
#       cpus: '1.50'
#       memory: 2048M
#     reservations:
#       cpus: '0.25'
#       memory: 512M

# 5. Patch vulnerable dependencies and reboot isolated services
npm audit fix --force
docker compose -f docker-compose.prod.yml up -d --build`,
  },
  {
    id: "monetrix-vpc-proxy",
    category: "security" as const,
    icon: Lock,
    codeBadge: "SECURITY & VPC ARCHITECTURE",
    title: "Isolated Private Database Environment & Hardened Payment Proxy Gateway (MoneTrix)",
    subtitle:
      "Zero public database port exposure with application IP whitelisting and reverse proxy payment validation.",
    problem:
      "Digital product merchants face aggressive port scans, database injection attempts, and fraudulent payment callbacks. Leaving database ports exposed to 0.0.0.0 or allowing client browsers to interact directly with payment gateway webhook endpoints exposes the platform to catastrophic breach and fraudulent order crediting.",
    solution:
      "Architected an air-gapped database deployment for MoneTrix: MongoDB is bound strictly to private network interfaces with zero public IP routing. Implemented strict UFW/iptables firewall rules allowing inbound connections on port 27017 exclusively from our dedicated application server's static IP. Built a dedicated payment proxy layer that terminates client checkouts, cryptographically signs orders, validates incoming local MFS webhooks (UddoktaPay, IT Pay BD) with replay locks, and updates internal order state only after multi-factor signature verification.",
    telemetry: [
      { label: "Public DB Port Access", value: "0.0.0.0 BLOCKED", change: "UFW dropped" },
      { label: "Whitelisted Sources", value: "App Server Only", change: "Static IP bound" },
      { label: "Fraudulent Callbacks", value: "0 Accepted", change: "Proxy terminated" },
      { label: "Ledger Accuracy", value: "100%", change: "Zero discrepancies" },
    ],
    stack: [
      "Linux VPS",
      "UFW Firewall",
      "Private Subnet MongoDB",
      "Node.js Payment Proxy",
      "HMAC-SHA256",
    ],
    codeSnippet: `// 1. Linux Server Firewall Rule Configuration (Air-Gapping MongoDB)
# Deny all public traffic to MongoDB default port
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Whitelist ONLY dedicated Application Proxy Server IP (e.g. 192.168.1.100 or static public IP)
sudo ufw allow from 203.0.113.45 to any port 27017 proto tcp comment 'App Server Mongo Access'
sudo ufw enable

// 2. Hardened Payment Proxy Webhook Verifier (Node.js / Express)
export async function paymentProxyHandler(req: Request, res: Response) {
  const incomingSignature = req.headers["x-gateway-signature"] as string;
  const rawBody = req.body;

  // Cryptographic signature verification before any database interaction
  const expectedSignature = crypto
    .createHmac("sha256", process.env.PAYMENT_GATEWAY_SECRET!)
    .update(JSON.stringify(rawBody))
    .digest("hex");

  if (incomingSignature !== expectedSignature) {
    logger.warn(\`Unauthorized payment proxy webhook from IP: \${req.ip}\`);
    return res.status(401).json({ error: "Invalid signature payload" });
  }

  // Forward sanitized event to private database worker via internal network
  await internalQueue.publish("payment.verified", {
    orderId: rawBody.order_id,
    amount: rawBody.amount,
    transactionId: rawBody.transaction_id,
  });

  return res.status(200).json({ received: true });
}`,
  },
  {
    id: "server-side-meta-capi",
    category: "tracking" as const,
    icon: LineChart,
    codeBadge: "MARKETING ENGINEERING & ANALYTICS",
    title: "Server-Side Tracking (sGTM & Meta CAPI) with 100% Event Deduplication",
    subtitle:
      "Bypassing iOS 14.5+ restrictions and ad-blockers for accurate e-commerce attribution and ROAS optimization.",
    problem:
      "Client-side tracking pixels (Meta Pixel, Google Analytics) lose 25-40% of conversion data due to Safari ITP, iOS 14.5+ privacy restrictions, and browser ad-blockers. Furthermore, sending both browser and server events without a proper deduplication architecture leads to double-counted conversions, inflated metrics, and corrupted ad optimization algorithms.",
    solution:
      "Implemented an enterprise server-side tracking architecture using a dedicated Google Tag Manager (sGTM) server container hosted on Stape. Built a custom e-commerce DataLayer capturing all funnel actions ('view_item', 'add_to_cart', 'begin_checkout', 'purchase'). Engineered a dual-stream tracking pipeline where client actions fire to browser pixel while simultaneously dispatching to sGTM and Meta Conversions API (CAPI). Built deterministic unique event_id generation ensuring Meta deduplicates browser and server hits with 100% precision.",
    telemetry: [
      { label: "Attribution Recovery", value: "+32%", change: "vs browser-only pixel" },
      { label: "Event Deduplication", value: "100%", change: "Unique event_id" },
      { label: "Ad-Blocker Bypass", value: "100%", change: "Server-to-Server CAPI" },
      { label: "Event Quality Score", value: "9.6 / 10", change: "Meta Event Manager" },
    ],
    stack: [
      "Server-Side GTM (sGTM)",
      "Stape.io",
      "Meta Conversions API (CAPI)",
      "GA4 DataLayer",
      "TypeScript",
    ],
    codeSnippet: `// Server-Side Meta CAPI Event Dispatcher with Event Deduplication
import crypto from "crypto";

interface PurchaseEventParams {
  orderId: string;
  amount: number;
  currency: string;
  email: string;
  phone?: string;
  clientIp: string;
  userAgent: string;
}

export async function dispatchServerSidePurchase(params: PurchaseEventParams) {
  // 1. Generate deterministic event_id shared between browser and server
  const eventId = \`purchase_\${params.orderId}\`;

  // 2. Hash user identifiers (SHA-256) per Meta privacy standards
  const hashedEmail = crypto.createHash("sha256").update(params.email.trim().toLowerCase()).digest("hex");
  const hashedPhone = params.phone 
    ? crypto.createHash("sha256").update(params.phone.replace(/[^0-9]/g, "")).digest("hex") 
    : undefined;

  // 3. Construct Meta Conversions API payload
  const capiPayload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // Critical for Meta event deduplication
        event_source_url: \`https://www.monetrix.shop/checkout/success?order=\${params.orderId}\`,
        action_source: "website",
        user_data: {
          em: [hashedEmail],
          ph: hashedPhone ? [hashedPhone] : [],
          client_ip_address: params.clientIp,
          client_user_agent: params.userAgent,
        },
        custom_data: {
          currency: params.currency,
          value: params.amount,
          order_id: params.orderId,
        },
      },
    ],
  };

  // 4. Dispatch directly to sGTM container / Meta CAPI endpoint
  return await fetch(\`https://graph.facebook.com/v19.0/\${process.env.META_PIXEL_ID}/events?access_token=\${process.env.META_CAPI_TOKEN}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(capiPayload),
  });
}`,
  },
  {
    id: "caching-fabric",
    category: "infra" as const,
    icon: Database,
    codeBadge: "ARCHITECTURE: TIERED-CACHE",
    title: "Multi-Tiered Redis In-Memory Cache with Singleflight Request Coalescing",
    subtitle:
      "P99 latency reduction from 240ms to 22ms under concurrent catalog read load on SubsDrop.",
    problem:
      "When traffic spiked for popular tools (Canva Pro, ChatGPT Plus), thousands of users hit the product catalog endpoints simultaneously. A cold cache or expired TTL caused a classic 'cache stampede' where hundreds of identical queries hammered the database, spiking connection pools and slowing down the whole service.",
    solution:
      "Architected a two-tier caching fabric: an in-process LRU cache (L1, 15-second TTL) inside each Node.js process combined with a centralized Redis cluster (L2, 10-minute TTL). Implemented singleflight request coalescing so that during a cache miss, only one single database query executes while all concurrent requests wait on the same Promise.",
    telemetry: [
      { label: "P99 Read Latency", value: "< 22ms", change: "-90% reduction" },
      { label: "Cache Hit Ratio", value: "96.2%", change: "Catalog endpoints" },
      { label: "Database CPU Load", value: "-75%", change: "During peak traffic" },
      { label: "Cache Stampedes", value: "0", change: "Singleflight lock" },
    ],
    stack: ["Node.js", "ioredis 5.8", "MongoDB Replica Set", "LRU Cache", "Docker", "PM2"],
    codeSnippet: `// Request coalescing & tiered Redis cache pattern
const singleFlightLocks = new Map<string, Promise<any>>();

export async function getTieredCached<T>(
  key: string, 
  fetcher: () => Promise<T>, 
  ttlSec = 600
): Promise<T> {
  // L1: In-process memory check (<0.1ms)
  const l1Hit = localLruCache.get(key);
  if (l1Hit) return l1Hit as T;

  // L2: Distributed Redis check (~2ms)
  const l2Hit = await redisClient.get(key);
  if (l2Hit) {
    const parsed = JSON.parse(l2Hit);
    localLruCache.set(key, parsed, 15); // Populate L1 for 15s
    return parsed;
  }

  // Prevent cache stampede: coalesce concurrent misses into one promise
  if (singleFlightLocks.has(key)) {
    return singleFlightLocks.get(key);
  }

  const fetchPromise = (async () => {
    try {
      const freshData = await fetcher();
      await redisClient.setex(key, ttlSec, JSON.stringify(freshData));
      localLruCache.set(key, freshData, 15);
      return freshData;
    } finally {
      singleFlightLocks.delete(key);
    }
  })();

  singleFlightLocks.set(key, fetchPromise);
  return fetchPromise;
}`,
  },
  {
    id: "quickmation-automation-engine",
    category: "automation" as const,
    icon: Bot,
    codeBadge: "AI & WORKFLOW AUTOMATION",
    title: "Proprietary Omnichannel AI Automation Engine (Bypassing n8n/Zapier SaaS Taxes)",
    subtitle:
      "Custom microservices delivering automated multi-platform messaging, lead scoring, and CRM synchronization.",
    problem:
      "Relying on external automation platforms like Zapier or third-party n8n cloud instances creates severe bottlenecks for high-volume enterprise clients: execution latency spikes, rate limits, data privacy risks, and ballooning monthly task costs.",
    solution:
      "At QuickMation, we developed a proprietary Node.js & Prisma workflow execution engine alongside self-hosted n8n instances. The system listens to webhooks from Facebook Messenger, Instagram DM, and web chat, evaluates conversation context with LLM tools, verifies inventory/booking state via database transactions, and executes deterministic actions in < 300ms without paying per-task SaaS fees.",
    telemetry: [
      { label: "Cost Savings", value: "92%", change: "vs Zapier tier pricing" },
      { label: "Response Latency", value: "< 280ms", change: "Webhook to bot reply" },
      { label: "Uptime", value: "99.95%", change: "Self-hosted Docker runner" },
      { label: "Supported Channels", value: "FB, IG, Web", change: "Unified inbox" },
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Prisma 7.8",
      "PostgreSQL",
      "Meta Graph API",
      "Self-Hosted n8n",
    ],
    links: [
      {
        label: "QuickMation.online",
        url: "https://quickmation.online",
        isPrimary: true,
        icon: ExternalLink,
      },
    ],
    codeSnippet: `// Custom Webhook Dispatcher for Omnichannel Meta & Webhook Automations
import { prisma } from "../lib/prisma";
import { evaluateConversationIntent } from "../services/ai-agent";

export async function processIncomingMessage(event: OmnichannelEvent) {
  // 1. Verify webhook signature and extract channel metadata
  const channel = event.source; // 'facebook' | 'instagram' | 'web'
  const customerId = event.senderId;

  // 2. Fetch or initialize conversation thread with transaction lock
  const thread = await prisma.conversationThread.upsert({
    where: { externalSenderId: customerId },
    create: { externalSenderId: customerId, platform: channel },
    update: { updatedAt: new Date() },
  });

  // 3. Evaluate context via localized LLM agent
  const response = await evaluateConversationIntent({
    userQuery: event.text,
    history: thread.recentMessages,
  });

  // 4. Dispatch automated reply through official platform API
  await dispatchPlatformReply(channel, customerId, response.messageText);
  return { status: "processed", latencyMs: Date.now() - event.timestamp };
}`,
  },
  {
    id: "tempmail-open-source",
    category: "opensource" as const,
    icon: Mail,
    codeBadge: "OPEN-SOURCE DEVELOPER TOOLING",
    title: "TempMail — High-Performance Disposable Inbox & Multi-Domain MX Ingress",
    subtitle:
      "Privacy-centric open-source email engine deployed at temp.subsdrop.com with custom DNS MX routing and real-time polling.",
    problem:
      "Developers, QA engineers, and privacy-conscious users constantly need disposable inboxes for end-to-end verification, signup flows, and anti-spam protection. Most commercial temp-mail tools are loaded with heavy trackers, ad bloat, slow refresh cycles, and don't provide custom domain MX record routing or developer documentation.",
    solution:
      "Engineered TempMail as an open-source, ultra-lightweight web platform and developer tool. Built with high-performance Vanilla ES6+ modules and Vite (<28KB bundle), eliminating framework overhead. Integrated CatchMail REST API with an automated countdown polling lifecycle, multi-domain routing allowing users to configure custom domain MX records (smtp.catchmail.io, priority 10), client-side localStorage persistence, and interactive API documentation (docs.html) for automated test suites.",
    telemetry: [
      { label: "Cold Load Time", value: "< 95ms", change: "Zero runtime bloat" },
      { label: "Total Bundle Size", value: "24.8 KB", change: "Vanilla JS + CSS" },
      { label: "Polling Cadence", value: "5s Auto", change: "Non-blocking ticks" },
      { label: "License & Status", value: "MIT Open", change: "github.com public" },
    ],
    stack: [
      "Vanilla JavaScript (ES6+)",
      "Vite 8",
      "CatchMail REST API",
      "DNS MX Routing",
      "HTML5 LocalStorage",
      "MIT License",
    ],
    links: [
      {
        label: "Visit temp.subsdrop.com",
        url: "https://temp.subsdrop.com",
        isPrimary: true,
        icon: ExternalLink,
      },
      {
        label: "GitHub Repository (MIT)",
        url: "https://github.com/abdullahalmamun-devv/tempmail-site",
        isPrimary: false,
        icon: Github,
      },
    ],
    codeSnippet: `// TempMail: Domain Configuration & Real-Time Polling Lifecycle
// 1. Supported domains + custom user-configured DNS MX records
const S = {
  email: '',
  domain: 'catchmail.io',
  msgs: [],
  customDomains: [],
  readIds: new Set(),
};

// DNS Custom Domain Setup:
// MX Record -> smtp.catchmail.io (Priority: 10)
export function renderDomains() {
  const allDomains = [
    'catchmail.io',
    'dropifygraphics.xyz',
    'immirev.com',
    'ssportslive.xyz',
    'urbanchic.online',
    ...S.customDomains,
  ];
  return allDomains;
}

// 2. Automated non-blocking 5-second polling loop
export function startPoll() {
  stopPoll();
  let sec = 5;
  S.timer = setInterval(async () => {
    sec--;
    if (sec <= 0) {
      sec = 5;
      await fetchMailboxMessages();
    }
  }, 1000);
}

// 3. Secure sanitized message fetching with rate-limit backoff (429)
export async function fetchMailboxMessages() {
  if (!S.email) return;
  try {
    const res = await fetch(\`/api/v1/mailbox?address=\${encodeURIComponent(S.email)}\`);
    if (res.status === 429) return; // Graceful backoff
    const data = await res.json();
    const fresh = (data.messages || []).filter(m => !S.readIds.has(m.id));
    if (fresh.length > 0) notifyNewEmail(fresh.length);
    S.msgs = data.messages || [];
  } catch (err) {
    console.error('Failed to sync mailbox:', err);
  }
}`,
  },
];

function ProjectsPage() {
  const [filter, setFilter] = useState<Category>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    filter === "all" ? caseStudies : caseStudies.filter((c) => c.category === filter);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-12">
      <SectionHeader
        eyebrow="Production Engineering"
        title="Systems, Incident Post-Mortems &amp; Architecture"
        description="Real blueprints, production telemetry, and hard-won post-mortems from platforms operating under real traffic."
      />

      {/* Category Filter Tabs */}
      <div className="mt-5 sm:mt-6 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-white/[0.08] -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {[
          { key: "all", label: "All Case Studies" },
          { key: "postmortem", label: "CVE Incident Recovery" },
          { key: "security", label: "VPC & Payment Proxy" },
          { key: "tracking", label: "Meta CAPI & sGTM Tracking" },
          { key: "infra", label: "Redis Caching" },
          { key: "automation", label: "Enterprise AI Automation" },
          { key: "opensource", label: "Open-Source & Developer Tools" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key as Category)}
            className={`rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              filter === t.key
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Case Studies List */}
      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        {filtered.map((item) => {
          const Icon = item.icon;
          const isPostMortem = item.category === "postmortem";
          return (
            <article
              key={item.id}
              className={`rounded-xl border p-4 sm:p-6 lg:p-7 shadow-lg transition-all ${
                isPostMortem
                  ? "border-amber-500/40 bg-gradient-to-b from-[#18130b] to-[#100e0b]"
                  : "border-white/10 bg-[#111318]"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 pb-4 border-b border-white/[0.08]">
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border ${
                      isPostMortem
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                        : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <span
                      className={`font-mono text-[10px] sm:text-xs font-semibold ${
                        isPostMortem ? "text-amber-400" : "text-blue-400"
                      }`}
                    >
                      {item.codeBadge}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">{item.title}</h2>
                  </div>
                </div>

                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {item.links.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                            link.isPrimary
                              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
                              : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {LinkIcon && <LinkIcon className="h-3.5 w-3.5" />}
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Subtitle / Punchline */}
              <p
                className={`mt-2.5 text-sm font-medium ${
                  isPostMortem ? "text-amber-300" : "text-emerald-400"
                }`}
              >
                {item.subtitle}
              </p>

              {/* Problem & Architecture Breakdown */}
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                      The Operational Challenge
                    </h3>
                    <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed">{item.problem}</p>
                  </div>

                  <div>
                    <h3
                      className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                        isPostMortem ? "text-amber-400" : "text-blue-400"
                      }`}
                    >
                      Architectural Resolution &amp; Implementation
                    </h3>
                    <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed">{item.solution}</p>
                  </div>

                  {/* Telemetry Matrix */}
                  <div className="pt-2">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                      Production Metrics
                    </h3>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {item.telemetry.map((t) => (
                        <div
                          key={t.label}
                          className="rounded-lg border border-white/[0.06] bg-black/30 p-2.5"
                        >
                          <div className="font-mono text-base font-bold text-white">{t.value}</div>
                          <div className="text-[11px] font-medium text-zinc-300">{t.label}</div>
                          <div
                            className={`text-[10px] ${
                              isPostMortem ? "text-amber-400" : "text-emerald-400"
                            }`}
                          >
                            {t.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.stack.map((t) => (
                      <TechChip key={t}>{t}</TechChip>
                    ))}
                  </div>
                </div>

                {/* Production Code Snippet Preview */}
                <div className="flex flex-col rounded-xl border border-white/[0.08] bg-[#090b10] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5 bg-black/40 text-xs">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-blue-400" />
                      <span className="font-mono text-zinc-400 text-[11px]">
                        Production Code / Config Excerpt
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyCode(item.id, item.codeSnippet)}
                      className="flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed max-h-[380px] overflow-y-auto">
                    <pre>
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
