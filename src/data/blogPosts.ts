export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  alert?: {
    type: "warning" | "tip" | "info" | "security";
    title: string;
    content: string;
  };
  codeBlock?: {
    language: string;
    filename?: string;
    code: string;
  };
  keyTakeaway?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  isoDate: string;
  readTime: string;
  category: "systems" | "security" | "tracking" | "venture";
  categoryLabel: string;
  featured?: boolean;
  tags: string[];
  summary: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  toc: { id: string; title: string }[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "postmortem-react2shell-cve-2025-55182",
    slug: "surviving-react2shell-cve-2025-55182-vps-recovery",
    title:
      "Surviving a Zero-Day React2Shell Attack: How We Recovered Root & 100% CPU Under Peak Live Traffic",
    subtitle:
      "Out-of-band VNC rescue, terminating masked cryptominers, scrubbing persistent cronhooks, and containerizing production services with zero database loss.",
    date: "September 18, 2025",
    isoDate: "2025-09-18T10:00:00Z",
    readTime: "8 min read",
    category: "security",
    categoryLabel: "Incident Recovery & Security",
    featured: true,
    tags: [
      "CVE-2025-55182",
      "Linux Hardening",
      "Malware Containment",
      "Incident Response",
      "Docker",
      "DevOps",
    ],
    seo: {
      metaTitle:
        "React2Shell (CVE-2025-55182) Incident Post-Mortem & 100% CPU Recovery — Abdullah Al Mamun",
      metaDescription:
        "Full forensic analysis of surviving a zero-day React2Shell remote code execution intrusion on a live Linux VPS running SubsDrop and Pro Trainer IT without data loss.",
      keywords: [
        "CVE-2025-55182",
        "React2Shell",
        "Linux incident response",
        "cryptominer removal",
        "VPS 100% CPU lock",
        "out of band VNC console",
        "UFW hardening",
        "Docker resource limits",
      ],
    },
    summary:
      "A forensic engineering breakdown of how an unpatched zero-day vulnerability in an upstream web framework allowed an unauthorized actor to deploy a persistent cryptominer, driving CPU and RAM to 100% on our co-located production host. Here is how we regained root control via out-of-band VNC, eradicated malware persistence, and restored full uptime with zero data loss in under 45 minutes.",
    toc: [
      {
        id: "incident-discovery",
        title: "1. The Incident: Complete Resource Starvation at 100% CPU",
      },
      { id: "forensic-triage", title: "2. Out-of-Band VNC Rescue & Process Inspection" },
      { id: "root-cause-rca", title: "3. Root Cause Analysis: CVE-2025-55182 Exploitation" },
      {
        id: "scrubbing-persistence",
        title: "4. Scrubbing Malware Persistence (Cron, Sockets, Immutable Flags)",
      },
      {
        id: "architectural-remediation",
        title: "5. Architectural Hardening & Container Resource Capping",
      },
      { id: "key-engineering-takeaways", title: "6. Production Checklist & Post-Mortem Lessons" },
    ],
    sections: [
      {
        id: "incident-discovery",
        title: "1. The Incident: Complete Resource Starvation at 100% CPU",
        paragraphs: [
          "Under standard operational conditions, our production multi-core Linux host runs at a stable 15–20% CPU utilization and ~30% RAM utilization. This server concurrently powered the live LMS video delivery for Pro Trainer IT students while handling continuous subscription transactions on SubsDrop.",
          "At approximately 03:40 AM, automated health check probes reported 504 Gateway Timeouts. Within two minutes, SSH daemon connection attempts began hanging with TCP reset timeouts. Out-of-band hypervisor metrics showed all 8 vCPUs pinned at 100.0%, RAM pegged at 99%, and disk I/O throughput maxed out.",
          "Dozens of customer tickets poured in: students couldn't access ongoing cohorts and buyers were stuck on payment verification. The host operating system was completely suffocating.",
        ],
        alert: {
          type: "security",
          title: "Critical Telemetry Alert",
          content:
            "Host: prod-node-alpha (Ubuntu 24.04 LTS) | CPU Load Average: 42.18, 38.12, 29.40 | Inbound/Outbound: Unsolicited mining pool socket traffic detected on ports 3333 and 14444.",
        },
      },
      {
        id: "forensic-triage",
        title: "2. Out-of-Band VNC Rescue & Process Inspection",
        paragraphs: [
          "Because standard SSH connection handshakes were denied by process thread pool starvation, I opened a low-level out-of-band VNC emergency console provided by our cloud hypervisor. This accessed the TTY console directly without needing network socket allocation.",
          "Executing 'top' showed multiple worker processes disguised as legitimate Linux kernel threads like '[kworker/u16:3]' and '[systemd-journald-helper]', each consuming 99.8% CPU.",
          "Inspecting '/proc/<pid>/exe' revealed that these processes were actually executing compiled XMRig binaries hidden under '/tmp/.sysd' and '/dev/shm/.cache'.",
        ],
        codeBlock: {
          language: "bash",
          filename: "forensics_triage.sh",
          code: `# Step 1: Freeze rogue process tree immediately
kill -STOP 41922 41923

# Step 2: Uncover real binary path and working directory
ls -l /proc/41922/exe
# Output: /proc/41922/exe -> /tmp/.sysd/.xmrig (deleted)

ls -l /proc/41922/cwd
# Output: /proc/41922/cwd -> /dev/shm/.cache

# Step 3: Analyze outbound mining sockets
ss -tunap | grep -E "3333|14444|pool"
# tcp SYN_SENT 10.0.1.4:48122 -> 198.51.100.22:3333 (users:(("kworker",pid=41922,fd=3)))`,
        },
        keyTakeaway:
          "Never simply 'kill -9' an unknown rogue process immediately without running 'kill -STOP' first to freeze its execution state, inspect '/proc/<pid>/', and identify its parent PID or cron respawner.",
      },
      {
        id: "root-cause-rca",
        title: "3. Root Cause Analysis: CVE-2025-55182 Exploitation",
        paragraphs: [
          "Parsing Nginx reverse-proxy access logs and Node.js process logs revealed an unauthenticated POST request containing serialized JSON payloads aimed at an upstream React SSR handler.",
          "This matched the signature for CVE-2025-55182 (dubbed React2Shell), where improper deserialization of component server actions permitted arbitrary command injection. The attacker injected a base64-encoded curl script that downloaded a payload into '/tmp', executed it, and immediately deleted the source file on disk to evade basic signature scanners.",
        ],
      },
      {
        id: "scrubbing-persistence",
        title: "4. Scrubbing Malware Persistence (Cron, Sockets, Immutable Flags)",
        paragraphs: [
          "Modern cryptominers drop multiple layers of stealth persistence so that if you terminate the process, it resurrects automatically within minutes. We methodically scrubbed every persistence hook:",
          "1. Checked and cleaned root and www-data crontabs, '/etc/crontab', and '/etc/cron.d/'. Found a stealth entry triggering a base64 curl command every 5 minutes.",
          "2. Inspected '/etc/systemd/system/' for unauthorized timer units.",
          "3. Checked '/root/.ssh/authorized_keys' and verified no foreign public keys had been appended.",
          "4. Removed immutable flags (chattr -i) on files under '/tmp' and completely emptied rogue directories.",
        ],
        codeBlock: {
          language: "bash",
          filename: "purge_persistence.sh",
          code: `# Remove immutable attributes if malware locked files
chattr -i -a /tmp/.sysd/* 2>/dev/null
rm -rf /tmp/.sysd /dev/shm/.cache

# Clean all cron directories
rm -f /etc/cron.d/sync-system-time
sed -i '/pastebin\\|curl\\|wget/d' /var/spool/cron/crontabs/* 2>/dev/null

# Terminate rogue processes permanently
pkill -9 -f "xmrig"
pkill -9 -f ".sysd"

# Flush DNS cache and block mining pool IPs at kernel level
sudo ufw deny out to 198.51.100.0/24 comment "Rogue Mining Pool Subnet"`,
        },
      },
      {
        id: "architectural-remediation",
        title: "5. Architectural Hardening & Container Resource Capping",
        paragraphs: [
          "Recovering root access was only half the battle. To ensure such an incident could never bring down both platforms again, we executed a structural re-architecture:",
          "1. Container Decoupling: We isolated SubsDrop and Pro Trainer IT into independent Docker containers with strict 'cpu_quota' limits. No single service can ever consume more than 250% CPU or 4GB RAM.",
          "2. Filesystem Mount Hardening: Mounted '/tmp' and '/dev/shm' with 'noexec,nosuid,nodev' options in '/etc/fstab'. Even if an RCE downloads a binary into '/tmp', Linux kernel refuses to execute it.",
          "3. Private Database VPC Isolation: Verified MongoDB is bound strictly to internal private IP with zero 0.0.0.0 binding.",
        ],
        codeBlock: {
          language: "yaml",
          filename: "docker-compose.hardened.yml",
          code: `services:
  subsdrop-api:
    image: subsdrop/core:latest
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: "2.50"      # Hard ceiling: max 2.5 vCPUs
          memory: 3500M     # Hard ceiling: max 3.5GB RAM
        reservations:
          cpus: "0.50"
          memory: 1024M
    read_only: true         # Root filesystem is read-only
    tmpfs:
      - /tmp:noexec,nosuid,size=128m
    security_opt:
      - no-new-privileges:true
    networks:
      - internal_vpc

networks:
  internal_vpc:
    internal: true`,
        },
      },
      {
        id: "key-engineering-takeaways",
        title: "6. Production Checklist & Post-Mortem Lessons",
        paragraphs: [
          "The host was fully restored to service in under 45 minutes with 0 bytes of customer data lost. Post-patch CPU immediately dropped back to a baseline of 14%.",
          "Lessons cemented into our team's Standard Operating Procedure (SOP):",
          "• Never co-locate multi-tenant apps on raw bare-metal or single PM2 instances without container resource boundaries.",
          "• Always mount '/tmp' as 'noexec'. This blocks 90% of automated zero-day malware drops from running.",
          "• Keep out-of-band VNC console access verified and ready before emergencies occur.",
        ],
      },
    ],
  },
  {
    id: "server-side-tracking-meta-capi-sgtm",
    slug: "engineering-server-side-meta-capi-sgtm-tracking",
    title:
      "Why Client-Side Pixels Are Dead: Engineering Server-Side Meta CAPI & sGTM with Event Deduplication",
    subtitle:
      "Bypassing Safari ITP, iOS 14.5 ATT restrictions, and ad-blockers on MoneTrix by routing e-commerce transactions through server containers with deterministic deduplication.",
    date: "August 24, 2025",
    isoDate: "2025-08-24T14:30:00Z",
    readTime: "7 min read",
    category: "tracking",
    categoryLabel: "Marketing Engineering & Data",
    featured: false,
    tags: ["Meta CAPI", "sGTM", "Stape", "GA4 DataLayer", "Ad-Blocker Bypass", "FinTech Tracking"],
    seo: {
      metaTitle:
        "Engineering Server-Side Meta CAPI & sGTM with Event Deduplication — Abdullah Al Mamun",
      metaDescription:
        "Comprehensive architectural guide on building a resilient server-side conversion tracking pipeline using Stape, Google Tag Manager server container, and Meta Conversions API.",
      keywords: [
        "Meta Conversions API",
        "Meta CAPI",
        "Server-Side GTM",
        "sGTM Stape",
        "Event Deduplication event_id",
        "Ad-blocker bypass tracking",
        "GA4 DataLayer e-commerce",
        "iOS 14.5 tracking fix",
      ],
    },
    summary:
      "Modern client-side ad pixels lose 30–45% of purchase events due to Brave, uBlock Origin, Safari ITP cookie expirations, and iOS privacy prompts. Here is our end-to-end architecture blueprint using Meta Conversions API and server GTM to achieve 99.4% attribution accuracy on MoneTrix.",
    toc: [
      {
        id: "the-client-pixel-breakdown",
        title: "1. The 35% Conversion Blackhole in Modern E-Commerce",
      },
      {
        id: "dual-stream-architecture",
        title: "2. Dual-Stream Architecture & Deduplication Mechanics",
      },
      { id: "pii-normalization-sha256", title: "3. Cryptographic PII Normalization (SHA-256)" },
      { id: "sgtm-stape-deployment", title: "4. Setting Up Server-Side GTM Container via Stape" },
      { id: "production-results", title: "5. Production Telemetry & Measurable ROAS Impact" },
    ],
    sections: [
      {
        id: "the-client-pixel-breakdown",
        title: "1. The 35% Conversion Blackhole in Modern E-Commerce",
        paragraphs: [
          "When running paid growth campaigns on MoneTrix for digital tools and templates, our frontend Meta Pixel and Google Analytics scripts were silently failing for approximately 35% of paying customers.",
          "Desktop users running Brave, Firefox Enhanced Tracking Protection, or Chrome extensions like uBlock Origin completely block calls to 'connect.facebook.net' and 'google-analytics.com'. On mobile devices, Safari's Intelligent Tracking Prevention (ITP) caps client-side cookie lifespans to 7 days, breaking attribution windows for multi-touch purchase journeys.",
          "The commercial impact was severe: Meta's ad algorithm could not see which ad creatives actually drove sales, leading to algorithmic misallocation of ad spend.",
        ],
      },
      {
        id: "dual-stream-architecture",
        title: "2. Dual-Stream Architecture & Deduplication Mechanics",
        paragraphs: [
          "The proven architecture is a Dual-Stream Ingress: dispatching events both from the frontend browser (when unblocked) and simultaneously from our Node.js backend when a payment webhook succeeds.",
          "To prevent Meta from counting the same purchase twice, both streams must pass an identical, deterministic 'event_id'. When Meta's ingestion cluster receives two events with the same 'event_name' and 'event_id' within a 48-hour window, it automatically merges them, retaining the rich browser cookies while preserving the 100% server reliability.",
        ],
        codeBlock: {
          language: "typescript",
          filename: "lib/meta-capi.ts",
          code: `import crypto from "crypto";

export interface PurchaseEventPayload {
  orderId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone?: string;
  clientIp: string;
  userAgent: string;
  fbp?: string; // _fbp browser cookie
  fbc?: string; // _fbc click ID cookie
}

export async function dispatchPurchaseCAPI(payload: PurchaseEventPayload) {
  // 1. Generate deterministic event_id matching frontend DataLayer
  const eventId = \`purchase_\${payload.orderId}\`;

  // 2. Normalize and hash PII strictly per Meta Guidelines
  const hashedEmail = crypto
    .createHash("sha256")
    .update(payload.customerEmail.trim().toLowerCase())
    .digest("hex");

  const hashedPhone = payload.customerPhone
    ? crypto
        .createHash("sha256")
        .update(payload.customerPhone.replace(/[^0-9]/g, ""))
        .digest("hex")
    : undefined;

  const eventData = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: {
          em: [hashedEmail],
          ph: hashedPhone ? [hashedPhone] : [],
          client_ip_address: payload.clientIp,
          client_user_agent: payload.userAgent,
          fbp: payload.fbp,
          fbc: payload.fbc,
        },
        custom_data: {
          currency: payload.currency,
          value: payload.amount,
          order_id: payload.orderId,
        },
      },
    ],
  };

  // Dispatch to Meta Graph API v19.0 endpoint
  const response = await fetch(
    \`https://graph.facebook.com/v19.0/\${process.env.META_PIXEL_ID}/events?access_token=\${process.env.META_CAPI_TOKEN}\`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }
  );

  return await response.json();
}`,
        },
      },
      {
        id: "pii-normalization-sha256",
        title: "3. Cryptographic PII Normalization (SHA-256)",
        paragraphs: [
          "Meta requires Personally Identifiable Information (PII) to be pre-hashed using SHA-256 before transmission. Sending raw emails or phone numbers will trigger security rejections and privacy violations.",
          "Crucial normalization rules:",
          "• Emails must be lowercased, stripped of leading/trailing whitespace, and hashed as UTF-8 hex.",
          "• Phone numbers must be stripped of all spaces, dashes, and parentheses, retaining international country codes (e.g., '88017xxxxxxxx').",
          "Adhering to these strict guidelines pushed our Event Match Quality (EMQ) score to 8.8 out of 10 on Meta Business Manager.",
        ],
      },
      {
        id: "sgtm-stape-deployment",
        title: "4. Setting Up Server-Side GTM Container via Stape",
        paragraphs: [
          "To avoid running a costly dedicated Google Cloud App Engine cluster ($120+/month) for server GTM, we deployed our server container on Stape under a custom first-party subdomain (e.g., 'metrics.monetrix.shop').",
          "Because requests to 'metrics.monetrix.shop' originate on our own domain, browser ad-blockers treat them as first-party application telemetry rather than third-party tracking scripts. This preserves essential cookies while respecting user privacy.",
        ],
      },
      {
        id: "production-results",
        title: "5. Production Telemetry & Measurable ROAS Impact",
        paragraphs: [
          "Results after 60 days of operating this server-side pipeline on MoneTrix:",
          "• 99.4% purchase match rate verified against internal MongoDB transaction ledgers.",
          "• Over 30% increase in attributed conversions directly reflected in Meta Ads Manager.",
          "• Meta's machine learning delivery optimized bidding for high-intent buyers, lowering our blended customer acquisition cost (CAC) by 26%.",
        ],
      },
    ],
  },
  {
    id: "singleflight-redis-cache-stampede-prevention",
    slug: "singleflight-redis-cache-stampede-prevention-nodejs",
    title:
      "Preventing Cache Stampedes with Singleflight & Multi-Tier Redis: Slashing P99 Latency to 22ms",
    subtitle:
      "Eliminating the thundering herd problem on SubsDrop's product catalog endpoints when thousands of concurrent users refresh popular subscription items.",
    date: "July 30, 2025",
    isoDate: "2025-07-30T11:15:00Z",
    readTime: "6 min read",
    category: "systems",
    categoryLabel: "Backend & Systems",
    featured: false,
    tags: ["Redis", "Node.js", "Cache Stampede", "ioredis", "Singleflight", "High Concurrency"],
    seo: {
      metaTitle:
        "Preventing Cache Stampedes with Singleflight in Node.js & Redis — Abdullah Al Mamun",
      metaDescription:
        "Learn how we implemented singleflight request coalescing and a two-tier in-process LRU + Redis cache on SubsDrop, reducing P99 latency from 240ms to 22ms under load.",
      keywords: [
        "cache stampede prevention",
        "singleflight nodejs",
        "thundering herd problem",
        "ioredis tiered cache",
        "high concurrency catalog",
        "P99 latency reduction",
      ],
    },
    summary:
      "When digital subscription batches like Canva Pro or ChatGPT Plus drop on SubsDrop, thousands of users hit catalog endpoints simultaneously. If a cache key expires, naive systems suffer catastrophic cache stampedes. Here is how we engineered singleflight request deduplication with tiered caching.",
    toc: [
      { id: "the-thundering-herd", title: "1. Anatomy of a Cache Stampede" },
      { id: "two-tier-architecture", title: "2. The L1 Memory + L2 Redis Architecture" },
      { id: "singleflight-coalescing", title: "3. Implementing Singleflight in TypeScript" },
      { id: "load-testing-benchmarks", title: "4. Benchmarking 2,500 Concurrent Hits" },
    ],
    sections: [
      {
        id: "the-thundering-herd",
        title: "1. Anatomy of a Cache Stampede",
        paragraphs: [
          "Imagine a catalog item like 'ChatGPT Plus Subscription' cached in Redis with a 10-minute TTL. While valid, responses return in ~2ms.",
          "At minute 10:01, the key expires. In that exact millisecond, 400 concurrent incoming HTTP requests check Redis, find a cache miss, and all 400 requests trigger identical, heavy MongoDB aggregation queries simultaneously.",
          "This classic 'cache stampede' (or thundering herd) saturates the database connection pool, pegs database CPU to 95%, and causes response latencies to spike from 2ms to 240ms+.",
        ],
      },
      {
        id: "two-tier-architecture",
        title: "2. The L1 Memory + L2 Redis Architecture",
        paragraphs: [
          "To permanently solve this, we architected a two-tier caching fabric:",
          "• L1 In-Memory LRU Cache: Lives inside each Node.js process with an ultra-short 15-second TTL. This resolves in <0.1ms without any network TCP round-trip to Redis.",
          "• L2 Distributed Redis Cache: Shared across our cluster processes with a 10-minute TTL.",
          "• In-Flight Promise Registry: A thread-safe Promise latch that ensures only one single query executes against the database on a cache miss.",
        ],
      },
      {
        id: "singleflight-coalescing",
        title: "3. Implementing Singleflight in TypeScript",
        paragraphs: [
          "Below is our production-tested singleflight pattern implemented in TypeScript:",
        ],
        codeBlock: {
          language: "typescript",
          filename: "lib/cache-singleflight.ts",
          code: `import Redis from "ioredis";
import { LRUCache } from "lru-cache";

const redis = new Redis(process.env.REDIS_URL!);
const localLru = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 15, // 15-second L1 memory cache
});

const inFlightRegistry = new Map<string, Promise<any>>();

export async function fetchTieredWithSingleFlight<T>(
  cacheKey: string,
  dbFallback: () => Promise<T>,
  redisTtlSec = 600
): Promise<T> {
  // 1. Check L1 Memory Cache (<0.1ms)
  const l1Hit = localLru.get(cacheKey);
  if (l1Hit) return l1Hit as T;

  // 2. Check L2 Redis Cache (~2ms)
  const l2Hit = await redis.get(cacheKey);
  if (l2Hit) {
    const parsed = JSON.parse(l2Hit);
    localLru.set(cacheKey, parsed);
    return parsed as T;
  }

  // 3. Singleflight Latch: If query already in flight, await existing Promise
  if (inFlightRegistry.has(cacheKey)) {
    return inFlightRegistry.get(cacheKey) as Promise<T>;
  }

  // 4. Execute single query and share with all concurrent callers
  const queryPromise = (async () => {
    try {
      const freshData = await dbFallback();
      await redis.setex(cacheKey, redisTtlSec, JSON.stringify(freshData));
      localLru.set(cacheKey, freshData);
      return freshData;
    } finally {
      // Clean up latch once resolved or rejected
      inFlightRegistry.delete(cacheKey);
    }
  })();

  inFlightRegistry.set(cacheKey, queryPromise);
  return queryPromise;
}`,
        },
      },
      {
        id: "load-testing-benchmarks",
        title: "4. Benchmarking 2,500 Concurrent Hits",
        paragraphs: [
          "Using autocannon to simulate 2,500 concurrent connections hitting an expired catalog key:",
          "• Without Singleflight: 2,500 DB queries triggered. DB CPU hit 92%. P99 latency: 284ms. 14 timed-out connections.",
          "• With Singleflight: Exactly 1 DB query executed. DB CPU remained under 12%. P99 latency: 22ms. 0 dropped connections.",
        ],
      },
    ],
  },
  {
    id: "air-gapping-mongodb-ufw-firewall-payment-proxy",
    slug: "air-gapping-mongodb-production-ufw-payment-proxy",
    title:
      "Air-Gapping MongoDB in Production: Strict Firewall Whitelisting & Secure Payment Proxies in South Asia",
    subtitle:
      "Why leaving database port 27017 exposed to 0.0.0.0 is disastrous and how we architected a hardened webhook reverse proxy for bKash and Nagad payment rails.",
    date: "June 19, 2025",
    isoDate: "2025-06-19T09:00:00Z",
    readTime: "6 min read",
    category: "security",
    categoryLabel: "Incident Recovery & Security",
    featured: false,
    tags: [
      "MongoDB Hardening",
      "FinTech Security",
      "UFW Firewall",
      "Reverse Proxy",
      "HMAC Signatures",
    ],
    seo: {
      metaTitle: "Air-Gapping MongoDB & Payment Proxy Architecture — Abdullah Al Mamun",
      metaDescription:
        "Learn how to secure MongoDB with private VPC subnets and UFW firewall rules, alongside an idempotent payment reverse proxy for South Asian payment rails.",
      keywords: [
        "MongoDB air-gapped security",
        "UFW firewall database whitelist",
        "payment proxy architecture",
        "bKash Nagad webhook security",
        "HMAC payment verification",
      ],
    },
    summary:
      "A pragmatic security blueprint for protecting sensitive customer transactions, closing 0.0.0.0 exposure, isolating MongoDB behind application-only static IP whitelisting, and routing local payment webhooks through cryptographic proxy verification.",
    toc: [
      { id: "the-open-port-hazard", title: "1. The Open Port Hazard (0.0.0.0/0)" },
      { id: "ufw-isolation-blueprint", title: "2. Zero-Exposure UFW Firewall Configuration" },
      {
        id: "payment-proxy-hardening",
        title: "3. Hardened Payment Proxy & Cryptographic HMAC Verification",
      },
      { id: "replay-attack-defense", title: "4. Idempotency & Replay Attack Defense" },
    ],
    sections: [
      {
        id: "the-open-port-hazard",
        title: "1. The Open Port Hazard (0.0.0.0/0)",
        paragraphs: [
          "Automated internet-wide port scans constantly probe for MongoDB port 27017. Binding a database to '0.0.0.0' or relying solely on user/password authentication is an invitation for automated ransomware scripts.",
          "On MoneTrix and SubsDrop, protecting customer credentials and transactions required an air-gapped private networking strategy.",
        ],
      },
      {
        id: "ufw-isolation-blueprint",
        title: "2. Zero-Exposure UFW Firewall Configuration",
        paragraphs: [
          "We bound MongoDB strictly to internal interfaces and enforced kernel-level packet drops via UFW on all external interfaces.",
          "Only our application server's static internal IP is permitted to open a TCP handshake on port 27017.",
        ],
        codeBlock: {
          language: "bash",
          filename: "ufw_db_rules.sh",
          code: `# Set default firewall policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow secure SSH access strictly on non-standard port
sudo ufw allow 22022/tcp comment "Hardened SSH"

# Whitelist database port exclusively from dedicated app server private IP
sudo ufw allow proto tcp from 10.0.1.15 to any port 27017 comment "App Server Only"

# Enable firewall and verify rule ordering
sudo ufw enable
sudo ufw status verbose`,
        },
      },
      {
        id: "payment-proxy-hardening",
        title: "3. Hardened Payment Proxy & Cryptographic HMAC Verification",
        paragraphs: [
          "Local payment gateways (UddoktaPay, IT Pay BD, bKash) dispatch asynchronous webhooks upon customer payment completion. To protect our database from spoofed webhooks:",
          "• Webhooks hit a dedicated isolated payment proxy endpoint.",
          "• The proxy calculates a SHA-256 HMAC digest against the raw incoming payload and verifies it against the shared secret key.",
          "• Replay attacks are prevented via mandatory timestamp validation (<5 minute drift) and transaction UUID idempotency checks using Redis SETNX locks.",
        ],
      },
    ],
  },
  {
    id: "proprietary-ai-automation-vs-saas-tax",
    slug: "building-proprietary-ai-automation-engines-vs-saas-tax",
    title:
      "Eliminating the SaaS Tax: Why We Built Proprietary AI Automation Engines over Zapier & n8n Cloud",
    subtitle:
      "How we architected custom omnichannel bots and workflow microservices at QuickMation so enterprise clients own their data without monthly third-party software markups.",
    date: "May 22, 2025",
    isoDate: "2025-05-22T08:00:00Z",
    readTime: "7 min read",
    category: "venture",
    categoryLabel: "Venture & Product Strategy",
    featured: false,
    tags: [
      "AI Automation",
      "QuickMation",
      "Custom Microservices",
      "Node.js",
      "Self-Hosted n8n",
      "Prisma",
    ],
    seo: {
      metaTitle: "Building Custom AI Automation vs SaaS Cloud Taxes — Abdullah Al Mamun",
      metaDescription:
        "Why QuickMation eliminated monthly SaaS fees like Zapier and n8n cloud by engineering custom Node.js automation microservices and self-hosted instances.",
      keywords: [
        "AI automation agency",
        "custom AI chatbots",
        "self hosted n8n architecture",
        "eliminate Zapier SaaS tax",
        "omnichannel messaging engine",
      ],
    },
    summary:
      "Most automation agencies act as middlemen for Zapier or n8n cloud, passing heavy recurring subscription bills to their clients. Here is why we decided to build custom automation infrastructure at QuickMation, giving clients full data sovereignty and zero markup on tasks.",
    toc: [
      { id: "the-saas-tax-problem", title: "1. The Problem with Vendor Lock-In in Automation" },
      { id: "quickmation-hybrid-architecture", title: "2. The QuickMation Hybrid Engine" },
      { id: "real-world-cost-comparison", title: "3. Cost Comparison: $1,200/mo vs $15/mo" },
    ],
    sections: [
      {
        id: "the-saas-tax-problem",
        title: "1. The Problem with Vendor Lock-In in Automation",
        paragraphs: [
          "When businesses seek AI automation—such as automated customer support across Facebook Messenger, Instagram DMs, and WhatsApp—typical agencies cobble together third-party SaaS connectors like Make.com, Zapier, or n8n Cloud.",
          "While fast to prototype, this imposes a recurring 'SaaS tax': as messaging volume scales to tens of thousands of conversations per month, the client's monthly software subscription climbs to $500–$2,000/month just for basic webhook routing.",
        ],
      },
      {
        id: "quickmation-hybrid-architecture",
        title: "2. The QuickMation Hybrid Engine",
        paragraphs: [
          "At QuickMation, we structured our client solutions on two principles:",
          "1. Self-Hosted Infrastructure: Deploying dedicated, isolated n8n instances on private client VPS servers where API calls cost only raw server runtime ($15/month).",
          "2. Bespoke Node.js Microservices: Writing custom webhook handlers and state machines in TypeScript that connect directly to Meta Graph APIs and OpenAI/Anthropic model endpoints.",
          "Clients maintain 100% data ownership, achieve sub-100ms response latencies, and never pay per-task vendor markups.",
        ],
      },
    ],
  },
  {
    id: "open-source-disposable-email-28kb",
    slug: "architecting-ultra-lightweight-disposable-email-platform-28kb",
    title: "Architecting a 28KB Disposable Email Platform: DNS MX Routing & Real-Time Ingress",
    subtitle:
      "Building temp.subsdrop.com with zero runtime bloat, catchmail.io DNS MX configuration, and non-blocking background mailbox synchronization.",
    date: "April 14, 2025",
    isoDate: "2025-04-14T12:00:00Z",
    readTime: "5 min read",
    category: "systems",
    categoryLabel: "Backend & Systems",
    featured: false,
    tags: ["DNS MX", "Vanilla JS", "Vite 8", "Open Source", "TempMail", "Fast Web"],
    seo: {
      metaTitle: "Architecting an Open-Source 28KB Disposable Email Platform — Abdullah Al Mamun",
      metaDescription:
        "Technical case study on building temp.subsdrop.com in under 28KB using Vanilla JS, Vite 8, and programmatic DNS MX record routing.",
      keywords: [
        "disposable email engine",
        "DNS MX routing",
        "open source tempmail",
        "Vanilla JS performance",
        "sub 30kb web app",
      ],
    },
    summary:
      "A technical walkthrough of our open-source disposable email utility (temp.subsdrop.com) engineered with zero framework overhead, custom domain MX record routing, and non-blocking polling.",
    toc: [
      { id: "zero-framework-bloat", title: "1. Zero Framework Bloat (<28KB Production Bundle)" },
      { id: "dns-mx-routing-architecture", title: "2. DNS MX Configuration & Ingress" },
      { id: "polling-lifecycle", title: "3. Non-Blocking 5-Second Polling Lifecycle" },
    ],
    sections: [
      {
        id: "zero-framework-bloat",
        title: "1. Zero Framework Bloat (<28KB Production Bundle)",
        paragraphs: [
          "Most modern web utilities are burdened with heavy JavaScript bundles that delay initial page load. For temp.subsdrop.com, we engineered a blazing fast utility using Vite 8 with pure Vanilla JavaScript.",
          "The complete bundled JavaScript payload is under 28KB gzip, allowing the mailbox interface to render instantly on low-bandwidth mobile connections across South Asia.",
        ],
      },
      {
        id: "dns-mx-routing-architecture",
        title: "2. DNS MX Configuration & Ingress",
        paragraphs: [
          "To allow custom user-defined domains to receive incoming emails, our ingress service routes mail via programmatic DNS MX records pointing to smtp.catchmail.io (Priority 10).",
          "A non-blocking client-side polling engine checks for incoming verification emails every 5 seconds with automatic 429 rate-limit backoff.",
        ],
      },
    ],
  },
];
