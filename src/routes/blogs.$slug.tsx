import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Code2,
  ExternalLink,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Send,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { blogPosts, BlogPost } from "../data/blogPosts";
import { Toaster } from "../components/ui/sonner";

export const Route = createFileRoute("/blogs/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) {
      return {
        meta: [{ title: "Article Not Found — Abdullah Al Mamun" }],
      };
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: post.title,
      description: post.seo.metaDescription,
      author: {
        "@type": "Person",
        name: "Abdullah Al Mamun",
        url: "https://iamabdullah.dev",
        sameAs: [
          "https://github.com/abdullahalmamun-devv",
          "https://www.linkedin.com/in/abdullah-al-mamun-b07295329/",
        ],
        jobTitle: "Systems Architect & Tech Founder",
      },
      publisher: {
        "@type": "Person",
        name: "Abdullah Al Mamun",
      },
      datePublished: post.isoDate,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://iamabdullah.dev/blogs/${post.slug}`,
      },
      keywords: post.seo.keywords.join(", "),
    };

    return {
      meta: [
        { title: `${post.title} — Abdullah Al Mamun` },
        { name: "description", content: post.seo.metaDescription },
        { name: "keywords", content: post.seo.keywords.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://iamabdullah.dev/blogs/${post.slug}` },
        { property: "article:published_time", content: post.isoDate },
        { property: "article:author", content: "Abdullah Al Mamun" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.subtitle },
      ],
      links: [{ rel: "canonical", href: `https://iamabdullah.dev/blogs/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: BlogPostDetail,
});

function BlogPostDetail() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="mt-2 text-sm text-zinc-400">The requested field note could not be located.</p>
        <Link
          to="/blogs"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Return to all articles
        </Link>
      </div>
    );
  }

  const copyCode = (idx: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    toast.success("Article link copied to clipboard");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${post.title} by @abdullahalmamun_dev`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <Toaster />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/[0.05]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-12 pb-24 sm:pb-12">
        {/* Back Link & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-white/[0.08]">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={copyArticleLink}
              className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-zinc-300 hover:bg-white/10"
            >
              {copiedLink ? (
                <Check className="h-3 w-3 text-emerald-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copiedLink ? "Link Copied" : "Copy Link"}
            </button>
            <button
              type="button"
              onClick={shareOnTwitter}
              aria-label="Share on X"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white text-xs font-bold"
            >
              𝕏
            </button>
            <button
              type="button"
              onClick={shareOnLinkedIn}
              aria-label="Share on LinkedIn"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-blue-400"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="mt-6 sm:mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
              {post.categoryLabel}
            </span>
            {post.featured && (
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold text-red-400">
                FEATURED POST-MORTEM
              </span>
            )}
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-400">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs text-zinc-400">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.15] break-words">
            {post.title}
          </h1>

          <p className="mt-2.5 sm:mt-3 text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            {post.subtitle}
          </p>

          {/* Author Byline */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-y border-white/[0.08] py-3.5 sm:py-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 font-bold text-white font-display text-sm sm:text-base">
                A
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-white truncate">
                    Abdullah Al Mamun
                  </span>
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] text-emerald-400">
                    AUTHOR &amp; OPERATOR
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400 truncate">
                  Founder &amp; Systems Architect (SubsDrop, QuickMation, Pro Trainer IT, MoneTrix)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <a
                href="https://github.com/abdullahalmamun-devv"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white"
                aria-label="Author GitHub"
              >
                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-al-mamun-b07295329/"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-blue-400"
                aria-label="Author LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Content Layout with Sidebar TOC */}
        <div className="mt-6 sm:mt-8 grid gap-8 lg:gap-10 lg:grid-cols-12 min-w-0">
          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
            {/* Executive Summary Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Executive Summary &amp; Scope
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {post.summary}
              </p>
            </div>

            {/* Mobile Table of Contents Accordion */}
            <details className="lg:hidden rounded-xl border border-white/10 bg-[#111318] p-3.5 group">
              <summary className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold cursor-pointer list-none flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                  Table of Contents ({post.toc.length} sections)
                </span>
                <span className="text-zinc-500 text-[10px] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs text-zinc-400 hover:text-blue-400 py-1 transition-colors leading-snug"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </details>

            {/* Sections */}
            {post.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-3.5 sm:space-y-4"
              >
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight border-b border-white/[0.06] pb-2">
                  {section.title}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-base text-zinc-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.alert && (
                  <div
                    className={`rounded-xl border p-3.5 sm:p-4 ${
                      section.alert.type === "security"
                        ? "border-amber-500/40 bg-amber-500/[0.05] text-amber-200"
                        : "border-blue-500/40 bg-blue-500/[0.05] text-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono">
                      {section.alert.type === "security" ? (
                        <ShieldAlert className="h-4 w-4 text-amber-400" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-blue-400" />
                      )}
                      {section.alert.title}
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">
                      {section.alert.content}
                    </p>
                  </div>
                )}

                {section.codeBlock && (
                  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#090b10] max-w-full min-w-0">
                    <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/50 px-3 sm:px-4 py-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Code2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                        <span className="font-mono text-zinc-400 text-[11px] truncate">
                          {section.codeBlock.filename || `${section.codeBlock.language} excerpt`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyCode(idx, section.codeBlock!.code)}
                        className="flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
                      >
                        {copiedCodeIdx === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto p-3 sm:p-4 text-[11px] sm:text-xs font-mono text-zinc-300 leading-relaxed max-w-full">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {section.keyTakeaway && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.04] p-3 sm:p-3.5 text-xs text-emerald-300 leading-relaxed">
                    <strong className="text-emerald-200">Key Engineering Takeaway:</strong>{" "}
                    {section.keyTakeaway}
                  </div>
                )}
              </section>
            ))}

            {/* Tags footer */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs text-zinc-400 mr-2">Filed under:</span>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Share & Discussion Box */}
            <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Share or Discuss this Field Note</h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Spread high-integrity engineering blueprints with other systems builders.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={shareOnTwitter}
                  className="flex-1 sm:flex-none text-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                >
                  Share on 𝕏
                </button>
                <button
                  type="button"
                  onClick={shareOnLinkedIn}
                  className="flex-1 sm:flex-none text-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                >
                  LinkedIn
                </button>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto text-center rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                >
                  Reach Out
                </Link>
              </div>
            </div>

            {/* Prev & Next Post Navigation */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 pt-6 border-t border-white/[0.08]">
              {prevPost ? (
                <Link
                  to="/blogs/$slug"
                  params={{ slug: prevPost.slug }}
                  className="rounded-xl border border-white/[0.08] bg-black/30 p-3.5 sm:p-4 transition-all hover:border-white/20 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Previous Field Note
                  </span>
                  <div className="mt-2 text-xs font-bold text-white hover:text-blue-300">
                    {prevPost.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  to="/blogs/$slug"
                  params={{ slug: nextPost.slug }}
                  className="rounded-xl border border-white/[0.08] bg-black/30 p-3.5 sm:p-4 transition-all hover:border-white/20 flex flex-col justify-between text-left sm:text-right"
                >
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider flex items-center sm:justify-end gap-1">
                    Next Field Note <ArrowRight className="h-3 w-3" />
                  </span>
                  <div className="mt-2 text-xs font-bold text-white hover:text-blue-300">
                    {nextPost.title}
                  </div>
                </Link>
              )}
            </div>
          </main>

          {/* Sticky Sidebar: Table of Contents & Author Profile */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            <div className="sticky top-24 rounded-xl border border-white/10 bg-[#111318] p-5 shadow-lg">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold pb-3 border-b border-white/[0.08]">
                Table of Contents
              </h3>
              <nav className="mt-3 space-y-1.5">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs text-zinc-400 hover:text-blue-400 transition-colors py-1 leading-snug"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              {/* Author Box in Sidebar */}
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <div className="text-xs font-bold text-white">Written by Abdullah Al Mamun</div>
                <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                  Systems Architect &amp; CEO of SubsDrop. Specializing in high-throughput backend
                  infrastructure, dual-rail payments, and Linux incident response.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                  >
                    Contact Author <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
