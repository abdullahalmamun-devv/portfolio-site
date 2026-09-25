import { useState } from "react";
import {
  Server,
  Database,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Lock,
  LineChart,
} from "lucide-react";

export function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<"caching" | "security" | "tracking">("caching");
  const [simulatedStep, setSimulatedStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const cachingSteps = [
    {
      title: "1. Edge Ingress",
      desc: "Cloudflare Edge terminates SSL, applies DDoS rate-limiting and checks HTTP edge cache.",
      badge: "Edge ~8ms",
    },
    {
      title: "2. Nginx Reverse Proxy",
      desc: "Static file cache, gzip/brotli compression, and upstream load-balancer across Node.js cluster.",
      badge: "Nginx ~3ms",
    },
    {
      title: "3. Tiered Redis L1/L2",
      desc: "In-memory LRU cache with write-through invalidation & request coalescing (prevents stampedes).",
      badge: "Cache Hit <2ms",
    },
    {
      title: "4. MongoDB Replica Set",
      desc: "Fallback query on cache-miss with read-preference to secondary replicas, writes with journal ack.",
      badge: "DB Fallback ~22ms",
    },
  ];

  const securitySteps = [
    {
      title: "1. Client Checkout Session",
      desc: "Client initiates order; payment payload is signed with HMAC-SHA256. Raw secrets never exposed to browser.",
      badge: "Signed Token",
    },
    {
      title: "2. Dedicated Payment Proxy",
      desc: "Isolates gateway communication. Replay protection lock in Redis; validates payload before dispatching to upstream.",
      badge: "Proxy Gateway",
    },
    {
      title: "3. UFW IP Whitelist Barrier",
      desc: "Database port (27017) dropped for all public traffic. Only dedicated application proxy static IP allowed.",
      badge: "Private VPC",
    },
    {
      title: "4. Isolated MongoDB Network",
      desc: "Database runs on non-public subnet. Inbound webhooks verified by proxy before atomic transaction commits.",
      badge: "Zero Exposure",
    },
  ];

  const trackingSteps = [
    {
      title: "1. Client E-Commerce Action",
      desc: "User initiates 'Purchase' or 'Add to Cart'. Custom DataLayer generates deterministic unique event_id hash.",
      badge: "event_id Hash",
    },
    {
      title: "2. Dual-Stream Ingestion",
      desc: "Event fires to Browser Pixel for immediate context AND dispatches to Server-Side GTM container (sGTM).",
      badge: "Dual-Stream",
    },
    {
      title: "3. Server-to-Server Meta CAPI",
      desc: "sGTM container (Stape) sends authenticated payload directly to Meta Conversions API, bypassing ad-blockers.",
      badge: "Direct S2S",
    },
    {
      title: "4. Real-Time Deduplication",
      desc: "Meta matches incoming event_id from browser & server, deduplicating with 100% accuracy without double counting.",
      badge: "Deduplicated",
    },
  ];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedStep(1);
    const interval = setInterval(() => {
      setSimulatedStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  const steps =
    activeTab === "caching"
      ? cachingSteps
      : activeTab === "security"
        ? securitySteps
        : trackingSteps;

  const tabTitles = {
    caching: "High-Throughput Caching Fabric (Redis L1/L2)",
    security: "MoneTrix Isolated VPC Database & Payment Proxy Architecture",
    tracking: "Server-Side Tracking (sGTM) & Meta CAPI Deduplication Engine",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0e1015] p-3.5 sm:p-6 lg:p-8 shadow-2xl">
      {/* Header Controls */}
      <div className="flex flex-col gap-3.5 sm:gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-4 sm:pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Interactive System Topology
            </span>
          </div>
          <h3 className="mt-1 text-base sm:text-xl font-bold text-white">{tabTitles[activeTab]}</h3>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex overflow-x-auto no-scrollbar rounded-lg border border-white/10 bg-black/40 p-1 gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab("caching");
                setSimulatedStep(0);
              }}
              className={`rounded-md px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-colors shrink-0 ${
                activeTab === "caching"
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Redis Caching
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("security");
                setSimulatedStep(0);
              }}
              className={`rounded-md px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-colors shrink-0 ${
                activeTab === "security"
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              VPC &amp; Payment Proxy
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("tracking");
                setSimulatedStep(0);
              }}
              className={`rounded-md px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-colors shrink-0 ${
                activeTab === "tracking"
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Meta CAPI &amp; sGTM
            </button>
          </div>

          <button
            type="button"
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10 disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`h-3 w-3 ${isSimulating ? "animate-spin text-blue-400" : ""}`} />
            {isSimulating ? "Tracing..." : "Trace Request"}
          </button>
        </div>
      </div>

      {/* Grid Pipeline */}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isHighlighted = simulatedStep >= stepNum;
          return (
            <div
              key={s.title}
              className={`relative flex flex-col justify-between rounded-lg border p-4 transition-all duration-300 ${
                isHighlighted
                  ? "border-blue-500/60 bg-blue-950/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  : "border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-zinc-400">Step 0{stepNum}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                      isHighlighted
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-white">{s.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{s.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-mono">Enforcement</span>
                <span className="flex items-center gap-1 font-mono text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real telemetry strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 rounded-lg border border-white/[0.06] bg-black/30 px-3.5 py-3 text-[11px] sm:text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {activeTab === "caching" && (
            <>
              <span>
                <strong className="text-white font-mono">P99 Read Latency:</strong> ~22ms
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span>
                <strong className="text-white font-mono">Cache Hit Ratio:</strong> 96.2%
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span>
                <strong className="text-white font-mono">Coalescing Lock:</strong> Singleflight
              </span>
            </>
          )}
          {activeTab === "security" && (
            <>
              <span>
                <strong className="text-white font-mono">DB Exposure:</strong> Private Subnet
                (0.0.0.0 Closed)
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span>
                <strong className="text-white font-mono">Firewall:</strong> UFW App IP Whitelist
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span>
                <strong className="text-white font-mono">Payment Proxy:</strong> HMAC Signed
                Gateways
              </span>
            </>
          )}
          {activeTab === "tracking" && (
            <>
              <span>
                <strong className="text-white font-mono">Tracking Mechanism:</strong> Server-Side
                GTM + Stape
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span>
                <strong className="text-white font-mono">Attribution Accuracy:</strong> 100% (iOS
                Bypassed)
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span>
                <strong className="text-white font-mono">Deduplication:</strong> Unique event_id
              </span>
            </>
          )}
        </div>
        <div className="font-mono text-[11px] text-zinc-400">Infra: Linux VPS / Docker / PM2</div>
      </div>
    </div>
  );
}
