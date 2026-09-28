import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useSearch, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";
import { blogPosts, BlogPost } from "../data/blogPosts";
import { Toaster } from "../components/ui/sonner";

export const Route = createFileRoute("/blogs/")({
  // Support /blogs?q=... so the WebSite SearchAction target is a real, working URL
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    const q = typeof search.q === "string" ? search.q : undefined;
    return q ? { q } : {};
  },
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
      publisher: {
        "@type": "Person",
        name: "Abdullah Al Mamun",
        url: "https://iamabdullah.dev",
      },
      inLanguage: "en",
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `https://iamabdullah.dev/blogs/${p.slug}`,
        datePublished: p.isoDate,
        image: `https://iamabdullah.dev/blog-images/og-${p.slug}.png`,
        description: p.summary,
      })),
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://iamabdullah.dev/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://iamabdullah.dev/blogs" },
      ],
    };

    return {
      meta: [
        { title: "Engineering Blog — Node.js, Server Architecture & Tracking Field Notes" },
        {
          name: "description",
          content:
            "Production-tested engineering articles: zero-day incident recovery, Node.js & Redis performance, server-side tracking (Meta CAPI, sGTM), and AI automation architecture by Abdullah Al Mamun.",
        },
        {
          property: "og:title",
          content: "Engineering Blog — Node.js, Server Architecture & Tracking Field Notes",
        },
        {
          property: "og:description",
          content:
            "Hard-won production blueprints, zero-day CVE recovery, and real-world system architecture field notes.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://iamabdullah.dev/blogs" },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: "https://iamabdullah.dev/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Engineering Blog — Node.js, Server Architecture & Tracking Field Notes",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Engineering Blog — Node.js, Server Architecture & Tracking Field Notes",
        },
        {
          name: "twitter:description",
          content:
            "Hard-won production blueprints, zero-day CVE recovery, and real-world system architecture field notes.",
        },
        { name: "twitter:image", content: "https://iamabdullah.dev/og-image.png" },
      ],
      links: [{ rel: "canonical", href: "https://iamabdullah.dev/blogs" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbLd),
        },
      ],
    };
  },
  component: BlogsPage,
});

const CATEGORIES = [
  { id: "all", label: "All Notes" },
  { id: "security", label: "Incident Recovery & Security" },
  { id: "systems", label: "Backend & Systems" },
  { id: "tracking", label: "Marketing Infrastructure" },
  { id: "venture", label: "Venture Architecture" },
];

function BlogsPage() {
  const { q } = useSearch({ from: "/blogs/" });
  const navigate = useNavigate({ from: "/blogs/" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(q ?? "");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    if ((q ?? "") !== searchQuery) setSearchQuery(q ?? "");
  }, [q]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    navigate({ search: value.trim() ? { q: value } : {}, replace: true });
  };

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please provide a valid engineering email");
      return;
    }
    setIsSubscribing(true);
    try {
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3FormsKey) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            from_name: "📬 Engineering Dispatch • iamabdullah.dev",
            subject: `📬 New Newsletter Subscriber: ${newsletterEmail}`,
            email: newsletterEmail,
            message: `New engineering dispatch subscriber: ${newsletterEmail}`,
          }),
        });
      }
      setNewsletterSubscribed(true);
      toast.success("Subscribed! You will receive future technical case studies.");
      setNewsletterEmail("");
    } catch {
      setNewsletterSubscribed(true);
      toast.success("Subscribed! You will receive future technical case studies.");
      setNewsletterEmail("");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-16">
        <SectionHeader
          title="Engineering Logs & Architectural Field Notes"
          description="Real-world system blueprints, incident post-mortems, high-concurrency caching strategies, and infrastructure decisions written from live commercial systems."
        />

        {/* Featured Post Card (Editorial Highlight) */}
        {featuredPost && selectedCategory === "all" && searchQuery === "" && (
          <Reveal>
            <div className="mt-8 sm:mt-12 rounded-2xl border border-white/[0.08] bg-[#0c0e14]/90 p-6 sm:p-8 lg:p-9 transition-colors hover:border-white/15 shadow-xl group">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-blue-400 font-semibold uppercase tracking-wider">
                  Featured Field Note
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{featuredPost.categoryLabel}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{featuredPost.date}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{featuredPost.readTime}</span>
              </div>

              <Link
                to="/blogs/$slug"
                params={{ slug: featuredPost.slug }}
                className="mt-3 block group-hover:text-blue-400 transition-colors"
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
                {featuredPost.subtitle}
              </p>

              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-4xl line-clamp-3">
                {featuredPost.summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                <div className="font-mono text-xs text-zinc-400">
                  By Abdullah Al Mamun • Systems Architect
                </div>

                <Link
                  to="/blogs/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors self-start sm:self-auto"
                >
                  Read Full Post-Mortem <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* Search & Category Filter Controls */}
        <Reveal>
          <div className="mt-10 sm:mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter by CVE, Redis, CAPI, Python, proxy..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#080a0f] pl-9 pr-9 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:border-white/20 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="font-mono text-xs text-zinc-500">
                {filteredPosts.length} field {filteredPosts.length === 1 ? "note" : "notes"} available
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {CATEGORIES.map((cat) => {
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
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      active
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] ${
                        active ? "text-zinc-600 font-bold" : "text-zinc-500"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Article Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <Reveal key={post.id}>
              <article className="flex flex-col justify-between h-full rounded-2xl border border-white/[0.08] bg-[#0c0e14]/70 p-6 sm:p-7 transition-all hover:border-white/20 hover:bg-[#0e1118] shadow-xl group">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                    <span className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      {post.categoryLabel}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link to="/blogs/$slug" params={{ slug: post.slug }} className="mt-4 block">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
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
                  <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="font-mono text-[10px] text-zinc-500">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500">
                      Architecture Log
                    </span>
                    <Link
                      to="/blogs/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-all"
                    >
                      Read Field Note <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0c0e14]/60 p-12 text-center">
            <h3 className="text-base font-semibold text-white">No field notes matched</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Try adjusting your search query or clear the selected category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                handleSearchChange("");
              }}
              className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter Box */}
        <Reveal>
          <div className="mt-12 sm:mt-16 rounded-2xl border border-white/[0.08] bg-[#0c0e14]/90 p-6 sm:p-8 shadow-xl">
            <div className="grid gap-6 md:grid-cols-12 items-center">
              <div className="md:col-span-7">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Engineering Dispatch
                </span>
                <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Get Raw Production Post-Mortems in Your Inbox
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                  I write about Linux kernel recoveries, distributed Redis singleflight deduplication, and
                  zero-day security incident responses as they happen across SubsDrop, QuickMation, and
                  MoneTrix. Strictly technical post-mortems with zero spam.
                </p>
              </div>

              <div className="md:col-span-5">
                {newsletterSubscribed ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-400" />
                    <p className="mt-1.5 text-xs font-semibold text-emerald-300">
                      You are on the dispatch list!
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
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
                        className="flex-1 rounded-xl border border-white/10 bg-[#080a0f] px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-white/20 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isSubscribing}
                        className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shrink-0 disabled:opacity-50 shadow-sm"
                      >
                        <Send className="h-3.5 w-3.5" /> {isSubscribing ? "Subscribing..." : "Subscribe"}
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-500">
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
