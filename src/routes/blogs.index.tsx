import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Flame,
  ShieldCheck,
  LineChart,
  Server,
  Bot,
  Lock,
  ExternalLink,
  Code2,
  X,
  Share2,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";
import { blogPosts, BlogPost } from "../data/blogPosts";
import { Toaster } from "../components/ui/sonner";

export const Route = createFileRoute("/blogs/")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Abdullah Al Mamun — Engineering Field Notes & Technical Articles",
      description:
        "Field-tested engineering articles, incident post-mortems, server-side tracking blueprints, Redis caching strategies, and venture architecture by Abdullah Al Mamun.",
      url: "https://iamabdullah.dev/blogs",
      author: {
        "@type": "Person",
        name: "Abdullah Al Mamun",
        url: "https://iamabdullah.dev",
      },
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `https://iamabdullah.dev/blogs/${p.slug}`,
        datePublished: p.isoDate,
        description: p.summary,
      })),
    };

    return {
      meta: [
        { title: "Engineering Blog & Technical Field Notes — Abdullah Al Mamun" },
        {
          name: "description",
          content:
            "Production technical articles, incident post-mortems (CVE-2025-55182), server-side Meta CAPI & sGTM tracking, and high-concurrency Redis caching blueprints by Abdullah Al Mamun.",
        },
        {
          name: "keywords",
          content:
            "software engineering blog, system design, CVE-2025-55182, React2Shell recovery, Redis singleflight, Meta CAPI, sGTM, MongoDB VPC hardening, cloud architecture, Abdullah Al Mamun",
        },
        {
          property: "og:title",
          content: "Engineering Field Notes & Technical Articles — Abdullah Al Mamun",
        },
        {
          property: "og:description",
          content:
            "Hard-won production blueprints, zero-day CVE recovery, and real-world system architecture field notes.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://iamabdullah.dev/blogs" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Engineering Field Notes & Technical Articles — Abdullah Al Mamun",
        },
        {
          name: "twitter:description",
          content:
            "Hard-won production blueprints, zero-day CVE recovery, and real-world system architecture field notes.",
        },
      ],
      links: [{ rel: "canonical", href: "https://iamabdullah.dev/blogs" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: BlogsPage,
});

const CATEGORIES = [
  { id: "all", label: "All Engineering Field Notes", icon: BookOpen },
  { id: "security", label: "Incident Recovery & Security", icon: ShieldCheck },
  { id: "analytics", label: "Server-Side Tracking & CAPI", icon: LineChart },
  { id: "performance", label: "High Concurrency & Redis", icon: Server },
  { id: "backend", label: "Database Hardening", icon: Lock },
  { id: "automation", label: "Proprietary AI Systems", icon: Bot },
  { id: "infrastructure", label: "DNS & Light Architecture", icon: Code2 },
];

function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please provide a valid engineering email");
      return;
    }
    setNewsletterSubscribed(true);
    toast.success("Subscribed! You will receive future technical case studies.");
    setNewsletterEmail("");
  };

  return (
    <>
      <Toaster />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-16">
        {/* Header */}
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-blue-400">
              FIELD NOTES &amp; ARCHITECTURAL BLUEPRINTS
            </span>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight sm:leading-none">
              Engineering Logs &amp; Production Post-Mortems
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-zinc-300 leading-relaxed">
              Real-world systems blueprints, zero-day incident containment, high-concurrency caching
              strategies, and infrastructure decisions written by{" "}
              <strong className="text-white">Abdullah Al Mamun</strong>. No generic tutorials—only
              authentic lessons from live production systems running across SubsDrop, QuickMation,
              and MoneTrix.
            </p>
          </div>
        </Reveal>

        {/* Featured Post Card (Hero Highlight) */}
        {featuredPost && selectedCategory === "all" && searchQuery === "" && (
          <Reveal delay={0.1}>
            <div className="mt-6 sm:mt-10 overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/[0.08] via-black/40 to-blue-500/[0.05] p-4 sm:p-6 lg:p-8 relative group">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold text-red-400">
                  <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" /> FEATURED POST-MORTEM
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-zinc-400">
                  {featuredPost.categoryLabel}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-400">
                  <Calendar className="h-3 w-3" /> {featuredPost.date}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-400">
                  <Clock className="h-3 w-3" /> {featuredPost.readTime}
                </span>
              </div>

              <Link
                to="/blogs/$slug"
                params={{ slug: featuredPost.slug }}
                className="mt-3 sm:mt-4 block group-hover:text-blue-400 transition-colors"
              >
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-4xl">
                {featuredPost.subtitle}
              </p>

              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-4xl line-clamp-3">
                {featuredPost.summary}
              </p>

              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400 font-mono">
                    AM
                  </div>
                  <span className="text-xs text-zinc-300 font-medium">Abdullah Al Mamun</span>
                </div>

                <Link
                  to="/blogs/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                >
                  Read Full Incident Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* Search & Filter Controls */}
        <Reveal delay={0.15}>
          <div className="mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search articles by keyword, CVE, Redis, CAPI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-9 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Tag className="h-3.5 w-3.5" />
                <span>Showing {filteredPosts.length} technical field notes</span>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count =
                  cat.id === "all"
                    ? blogPosts.length
                    : blogPosts.filter((p) => p.category === cat.id).length;
                const active = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                      active
                        ? "border-blue-500 bg-blue-600/20 text-blue-300 font-semibold shadow-sm"
                        : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                        active ? "bg-blue-500/30 text-white" : "bg-white/5 text-zinc-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Article Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post, idx) => (
            <Reveal key={post.id} delay={0.05 * idx}>
              <article className="flex flex-col justify-between h-full rounded-xl border border-white/[0.08] bg-[#0c0e14]/70 p-6 transition-all hover:border-blue-500/40 hover:bg-[#0f121a] group">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                      {post.categoryLabel}
                    </span>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                  </div>

                  <Link to="/blogs/$slug" params={{ slug: post.slug }} className="mt-4 block">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2">
                    {post.subtitle}
                  </p>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="font-mono text-[10px] text-zinc-400">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-zinc-400">
                      By Abdullah Al Mamun
                    </span>
                    <Link
                      to="/blogs/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-transform"
                    >
                      Read Field Note <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="mt-12 rounded-xl border border-white/10 bg-black/40 p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-zinc-500" />
            <h3 className="mt-3 text-base font-semibold text-white">No field notes matched</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Try adjusting your search query or clear the selected category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Engineering Dispatch Newsletter Card */}
        <Reveal delay={0.2}>
          <div className="mt-10 sm:mt-16 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-[#0a0d14] to-black/60 p-4 sm:p-8">
            <div className="grid gap-6 md:grid-cols-12 items-center">
              <div className="md:col-span-7">
                <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> PRODUCTION ARCHITECTURE DISPATCH
                </span>
                <h3 className="mt-2 text-lg sm:text-2xl font-bold text-white">
                  Get Raw Production Case Studies in Your Inbox
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  I write about Linux kernel recoveries, distributed Redis deduplication, and
                  zero-day security responses as they happen across SubsDrop, QuickMation, and
                  MoneTrix. No growth hacking spam—strictly technical post-mortems.
                </p>
              </div>

              <div className="md:col-span-5">
                {newsletterSubscribed ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-400" />
                    <p className="mt-1.5 text-xs font-semibold text-emerald-300">
                      You are on the dispatch list!
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Next post-mortem will be sent directly to your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        placeholder="engineer@company.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto justify-center inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shrink-0"
                      >
                        <Send className="h-3.5 w-3.5" /> Subscribe
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Zero marketing fluff. Unsubscribe at any time with one click.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
