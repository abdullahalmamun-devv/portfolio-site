import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { postImagePath, postOgImagePath, postLastmod, absUrl } from "../lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { blogPosts, BlogPost } from "../data/blogPosts";
import { Toaster } from "../components/ui/sonner";

export const Route = createFileRoute("/blogs/$slug")({
  // True HTTP 404 for unknown slugs (prevents Google soft-404 classification)
  beforeLoad: ({ params }) => {
    if (!blogPosts.some((p) => p.slug === params.slug)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) {
      return {
        meta: [{ title: "Article Not Found — Abdullah Al Mamun" }],
      };
    }

    const postUrl = absUrl(`/blogs/${post.slug}`);
    const headerImage = absUrl(postImagePath(post.slug));
    const ogImage = absUrl(postOgImagePath(post.slug));

    const techArticleLd = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: post.title,
      description: post.seo.metaDescription,
      image: [ogImage, headerImage],
      author: {
        "@type": "Person",
        name: "Abdullah Al Mamun",
        url: "https://iamabdullah.dev",
        image: "https://iamabdullah.dev/icon_site_match_1024.png",
        sameAs: [
          "https://github.com/abdullahalmamun-devv",
          "https://www.linkedin.com/in/abdullah-al-mamun-b07295329/",
        ],
        jobTitle: "Systems Architect & Tech Founder",
      },
      publisher: {
        "@type": "Person",
        name: "Abdullah Al Mamun",
        url: "https://iamabdullah.dev",
      },
      datePublished: post.isoDate,
      dateModified: postLastmod(post.isoDate, post.dateModified),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      keywords: post.seo.keywords.join(", "),
      articleSection: post.categoryLabel,
      inLanguage: "en",
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absUrl("/blogs") },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    };

    return {
      meta: [
        { title: `${post.title} — Abdullah Al Mamun` },
        { name: "description", content: post.seo.metaDescription },
        { name: "keywords", content: post.seo.keywords.join(", ") },
        { name: "author", content: "Abdullah Al Mamun" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.subtitle },
        { property: "og:type", content: "article" },
        { property: "og:url", content: postUrl },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: post.imageAlt },
        { property: "og:locale", content: "en_US" },
        { property: "article:published_time", content: post.isoDate },
        {
          property: "article:modified_time",
          content: postLastmod(post.isoDate, post.dateModified),
        },
        { property: "article:author", content: "Abdullah Al Mamun" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.subtitle },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: postUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(techArticleLd),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbLd),
        },
        ...(post.faq && post.faq.length > 0
          ? [
              {
                type: "application/ld+json" as const,
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.faq.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.answer,
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: BlogPostDetail,
});

/** Contextual blog → case-study CTA (internal linking / relevance transfer). */
const PROJECT_CTA: Record<string, { anchor: string; label: string }> = {
  "surviving-react2shell-cve-2025-55182-vps-recovery": {
    anchor: "cve-react2shell-postmortem",
    label: "React2Shell Incident Post-Mortem",
  },
  "air-gapping-mongodb-production-ufw-payment-proxy": {
    anchor: "monetrix-vpc-proxy",
    label: "Air-Gapped MongoDB & Payment Proxy Case Study",
  },
  "engineering-server-side-meta-capi-sgtm-tracking": {
    anchor: "server-side-meta-capi",
    label: "Server-Side Meta CAPI Architecture",
  },
  "singleflight-redis-cache-stampede-prevention-nodejs": {
    anchor: "caching-fabric",
    label: "Redis Caching & Singleflight Case Study",
  },
  "building-proprietary-ai-automation-engines-vs-saas-tax": {
    anchor: "quickmation-automation-engine",
    label: "Proprietary Automation Engine Case Study",
  },
  "architecting-ultra-lightweight-disposable-email-platform-28kb": {
    anchor: "tempmail-open-source",
    label: "TempMail Ingress Architecture Case Study",
  },
  "stop-sharing-env-files-inboxes-envlink-guide": {
    anchor: "monetrix-vpc-proxy",
    label: "Production Ingress & Security Case Study",
  },
};

function BlogPostDetail() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active Table of Contents section highlighting
  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    post.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post]);

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
    toast.success("Code snippet copied");
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    toast.success("Article link copied");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = post.relatedSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));

  return (
    <>
      <Toaster />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/[0.04]">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-16">
        {/* Navigation Breadcrumb Bar */}
        <div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Field Notes
          </Link>
        </div>

        {/* Article Header */}
        <header className="mt-8 space-y-4 pb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="text-blue-400 font-medium">{post.categoryLabel}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight sm:leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-3xl">
            {post.subtitle}
          </p>

          <div className="pt-2 font-mono text-xs text-zinc-400">
            By <span className="text-zinc-200">Abdullah Al Mamun</span> • Systems Architect &amp; Founder
          </div>
        </header>

        {/* Hero Figure */}
        <figure className="mt-8">
          <img
            src={postImagePath(post.slug)}
            alt={post.imageAlt}
            width={1200}
            height={675}
            loading="eager"
            className="w-full rounded-xl border border-white/[0.08] bg-[#0c0e14] object-cover"
          />
        </figure>

        {/* 2-Column Content Layout with Sticky Sidebar TOC */}
        <div className="mt-10 sm:mt-14 grid gap-10 lg:grid-cols-12 min-w-0">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-10 min-w-0">
            {/* Executive Abstract (Clean Blockquote Lead) */}
            <div className="border-l-2 border-zinc-700 pl-4 sm:pl-5 py-1">
              <p className="text-[15px] sm:text-[17px] text-zinc-200 leading-[1.8] font-normal italic">
                {post.summary}
              </p>
            </div>

            {/* Mobile Table of Contents Accordion */}
            <details className="lg:hidden rounded-xl border border-white/[0.08] bg-[#0c0e14] p-4 group">
              <summary className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>Table of Contents ({post.toc.length} sections)</span>
                <span className="text-zinc-500 text-[10px] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 space-y-2 border-t border-white/[0.06] pt-3">
                {post.toc.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block font-mono text-xs text-zinc-400 hover:text-white transition-colors leading-snug"
                  >
                    <span className="text-zinc-600 mr-2">0{idx + 1}.</span>
                    {item.title.replace(/^[0-9]+\.\s*/, "")}
                  </a>
                ))}
              </nav>
            </details>

            {/* Sections */}
            {post.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 space-y-5"
              >
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white pt-2">
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[15px] sm:text-[16px] text-zinc-300 leading-[1.8] font-normal"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Clean Architectural Alert Note */}
                {section.alert && (
                  <div className="my-6 border-l-2 border-blue-500/60 pl-4 py-1.5 space-y-1 bg-white/[0.01] rounded-r-lg">
                    <div className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
                      {section.alert.title}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {section.alert.content}
                    </p>
                  </div>
                )}

                {/* Clean Code Block */}
                {section.codeBlock && (
                  <div className="my-6 rounded-xl border border-white/[0.08] bg-[#07090e] overflow-hidden max-w-full min-w-0">
                    <div className="flex items-center justify-between border-b border-white/[0.06] bg-black/40 px-4 py-2">
                      <span className="font-mono text-xs text-zinc-400">
                        {section.codeBlock.filename || `${section.codeBlock.language} configuration`}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCode(idx, section.codeBlock!.code)}
                        className="font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
                      >
                        {copiedCodeIdx === idx ? (
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        ) : (
                          <span>Copy</span>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto p-4 sm:p-5 text-[12px] sm:text-[13px] font-mono text-zinc-300 leading-relaxed max-w-full">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Resource Links / Action Buttons */}
                {section.links && section.links.length > 0 && (
                  <div className="my-6 grid gap-2.5 sm:grid-cols-2">
                    {section.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between p-3.5 rounded-xl border border-white/[0.08] bg-[#0c0e14] hover:border-white/20 transition-all text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {link.label}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0" />
                        </div>
                        {link.description && (
                          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1 font-mono">
                            {link.description}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                )}

                {/* Clean Key Takeaway */}
                {section.keyTakeaway && (
                  <div className="my-6 border-l-2 border-emerald-500/60 pl-4 py-1.5 space-y-1 bg-white/[0.01] rounded-r-lg">
                    <div className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Key Takeaway
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {section.keyTakeaway}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Contextual Case Study Link */}
            {PROJECT_CTA[post.slug] && (
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#0c0e14] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">
                    Production Implementation
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    Review the verified telemetry in the{" "}
                    <Link
                      to="/case-studies"
                      hash={PROJECT_CTA[post.slug].anchor}
                      className="text-white hover:text-blue-400 underline underline-offset-4 font-medium"
                    >
                      {PROJECT_CTA[post.slug].label}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {post.faq && post.faq.length > 0 && (
              <section className="pt-8 border-t border-white/[0.08] space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Frequently Asked Questions
                </h2>
                <dl className="space-y-6">
                  {post.faq.map((f, fIdx) => (
                    <div key={fIdx} className="space-y-1.5">
                      <dt className="text-sm sm:text-base font-semibold text-white">
                        {f.question}
                      </dt>
                      <dd className="text-sm text-zinc-400 leading-relaxed">
                        {f.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Related Field Notes */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-white/[0.08]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                  Related Field Notes
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      to="/blogs/$slug"
                      params={{ slug: rp.slug }}
                      className="group rounded-xl border border-white/[0.08] bg-[#0c0e14] p-5 transition-all hover:border-white/20 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-[10px] text-blue-400 uppercase tracking-wider">
                          {rp.categoryLabel}
                        </span>
                        <div className="mt-1.5 text-sm font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                          {rp.title}
                        </div>
                        <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {rp.subtitle}
                        </p>
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-zinc-400 group-hover:text-blue-400 transition-colors">
                        Read Field Note <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags footer */}
            <div className="pt-6 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-zinc-500">
                <span className="mr-1">Tags:</span>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-zinc-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Footer Sign-off */}
            <footer className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Abdullah Al Mamun</div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Systems Architect &amp; Founder of SubsDrop, QuickMation, and MoneTrix.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start sm:self-auto"
              >
                Discuss Systems <ArrowRight className="h-3 w-3" />
              </Link>
            </footer>

            {/* Prev & Next Post Navigation */}
            <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-white/[0.08]">
              {prevPost ? (
                <Link
                  to="/blogs/$slug"
                  params={{ slug: prevPost.slug }}
                  className="rounded-xl border border-white/[0.08] bg-[#0c0e14] p-4 transition-all hover:border-white/20 flex flex-col justify-between group"
                >
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3" /> Previous Note
                  </span>
                  <div className="mt-2 text-xs font-medium text-white group-hover:text-blue-400 transition-colors">
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
                  className="rounded-xl border border-white/[0.08] bg-[#0c0e14] p-4 transition-all hover:border-white/20 flex flex-col justify-between text-left sm:text-right group"
                >
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center sm:justify-end gap-1">
                    Next Note <ArrowRight className="h-3 w-3" />
                  </span>
                  <div className="mt-2 text-xs font-medium text-white group-hover:text-blue-400 transition-colors">
                    {nextPost.title}
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Minimalist Floating Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-28 z-20 space-y-6">
              <div>
                <div className="flex items-center justify-between pb-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                    On this page
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {Math.round(scrollProgress)}%
                  </span>
                </div>
                <nav className="mt-2 space-y-1.5 border-l border-white/[0.08]">
                  {post.toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-xs font-mono transition-colors pl-3.5 -ml-px border-l py-0.5 leading-snug ${
                          isActive
                            ? "border-blue-400 text-blue-400 font-semibold"
                            : "border-transparent text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {item.title.replace(/^[0-9]+\.\s*/, "")}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Share & Actions */}
              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={copyArticleLink}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? "Link Copied" : "Copy Article Link"}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
