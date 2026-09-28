# Technical SEO Audit — iamabdullah.dev

> Audit date: September 26, 2026 · Auditor: SEO engineering review (code + live site + SERP evidence)
> Reading guide for every issue below: **What's wrong → SEO impact → Priority → Exact fix → Owner → Expected impact**
> Priority key: 🔴 Critical (blocks ranking) · 🟠 High (materially limits growth) · 🟡 Medium (efficiency/quality signal) · 🟢 Low (polish)

---

## 0. Executive summary

**The site's single biggest problem is not content or design — it is that Google has almost nothing indexed.**

A `site:iamabdullah.dev` search (Sept 26, 2026) returns **2 URLs**: the homepage (with an *old cached title*) and the resume PDF. All 6 blog posts, /projects, /ventures, /skills, /blogs — none are indexed. Root causes found and fixed in this audit:

1. Soft-404s (unknown blog slugs returned HTTP 200)
2. A hand-maintained sitemap that went stale, with wrong lastmod dates
3. No Search Console verification tag in code, no analytics at all — so indexing problems were invisible
4. Zero internal links from blog posts to any page except /contact (weak crawl + relevance graph)

All of the above are **now fixed in code** (see §1 status column). The remaining work is operational: verify GSC, request indexing, publish consistently, build the content clusters in `03-content-clusters-linking-roadmap.md`.

### What was already healthy ✅

| Area | Evidence |
|---|---|
| SSR / crawlability | Live fetches return full HTML content (no client-only rendering) |
| Canonicals | Unique self-referencing canonical on every route |
| HTTPS | Site-wide, valid cert |
| URL structure | Clean, lowercase, hyphenated, keyword-bearing slugs |
| Mobile | Responsive layout, viewport meta present |
| Duplicate content | No duplicate routes; pagination not applicable (≤12 URLs) |
| Hreflang | Not applicable — single language (en). Do not add. |
| Content quality | Blog posts contain real production telemetry, code, and outcomes — rare and valuable |

---

## 1. Issue register

### 🔴 T1. Soft-404 — unknown blog slugs returned HTTP 200 — **FIXED IN CODE**

- **What's wrong:** `/blogs/<anything-wrong>` rendered an "Article Not Found" component but returned status 200. Verified live: `/blogs/this-slug-does-not-exist-12345` → 200.
- **SEO impact:** Google classifies these as *soft-404s*. Soft-404s waste crawl budget, dilute site quality signals, and can suppress crawling of the *valid* URLs sharing the same path pattern — a plausible contributor to the blog posts not being indexed.
- **Priority:** 🔴 Critical
- **Exact fix (implemented):** `src/routes/blogs.$slug.tsx` now has `beforeLoad` that throws `notFound()` when the slug doesn't exist, so the server responds with a true 404 + the root `notFoundComponent`. Verified in dev: status `404`.
- **Owner:** Developer (done)
- **Expected impact:** Removes soft-404 class entirely; crawl budget concentrates on real posts.

### 🔴 T2. Only 2 URLs indexed in Google — **FIX REQUIRED = GSC + indexing requests (operational)**

- **What's wrong:** `site:iamabdullah.dev` shows only `/` and `/Abdullah_Resume.pdf`. The homepage's SERP title is a stale cached version ("Abdullah — Founder, Developer, Server Architect"), proving Google crawled once, long ago, and rarely returned.
- **SEO impact:** Nothing ranks if nothing is indexed. This is the #1 blocker for every goal in this strategy.
- **Priority:** 🔴 Critical
- **Exact fix:**
  1. Verify the property in Google Search Console (see §2 GSC setup).
  2. Submit `https://iamabdullah.dev/sitemap.xml` in GSC → Sitemaps.
  3. Use **URL Inspection → Request Indexing** for, in this order: `/blogs/surviving-react2shell-cve-2025-55182-vps-recovery`, `/blogs/engineering-server-side-meta-capi-sgtm-tracking`, `/blogs`, `/projects`, `/ventures`, `/skills`, `/` (the React2Shell post has the strongest topical demand — a live CVE).
  4. After 2 weeks, check GSC → Pages report for "Crawled – currently not indexed" / "Discovered – currently not indexed" counts; if high, add internal links (done via homepage Latest Field Notes + related posts) and request indexing again.
- **Owner:** SEO
- **Expected impact:** Indexation of 12/12 URLs within 2–6 weeks. This unlocks everything else.

### 🔴 T3. Stale, hand-maintained sitemap — **FIXED IN CODE**

- **What's wrong:** `public/sitemap.xml` was hand-written; the React2Shell post (published Sept 18, 2025) carried lastmod `2025-09-18` while all others claimed the same day's date regardless of edits; every new post required remembering to hand-edit XML.
- **SEO impact:** Wrong `lastmod` erodes Google's trust in sitemap data (Google explicitly uses lastmod if it's consistently accurate); missing URLs delay discovery of new posts.
- **Priority:** 🔴 Critical
- **Exact fix (implemented):** `plugins/sitemap-generator.ts` regenerates `public/sitemap.xml` from `src/data/blogPosts.ts` on every build and dev startup. `dateModified` support added per post. Verified: 12 URLs emitted, correct lastmod. A comment marks the file DO-NOT-EDIT.
- **Owner:** Developer (done). **Process rule:** adding a post to `blogPosts.ts` is enough — the sitemap updates on next build.
- **Expected impact:** Fast, trustworthy discovery of every new post.

### 🔴 T4. No analytics, no Search Console wiring in code — **FIXED IN CODE (needs your IDs)**

- **What's wrong:** No GA4 tag anywhere; no GSC verification meta. (The site had zero measurement — you cannot see queries, CTR, positions, or conversions.)
- **SEO impact:** The entire quick-win loop (find queries with impressions at low CTR, fix titles, measure) is impossible without this data.
- **Priority:** 🔴 Critical
- **Exact fix (implemented):** `src/lib/seo.ts` reads `VITE_GA4_ID` and `VITE_GSC_VERIFICATION`; `__root.tsx` injects the gtag snippet (anonymize_ip) and the verification meta only when the env vars are set. Verified: setting `VITE_GA4_ID` injects the tag; leaving it empty emits nothing.
- **Owner:** SEO (create accounts, get IDs) → Developer or you (put them in `.env` / Cloudflare dashboard) — 30 minutes total.
- **Expected impact:** Data within 48h of GA4; query/impression data begins accumulating in GSC immediately after verification.

### 🟠 T5. All AI crawlers blocked in robots.txt — **FIXED IN CODE**

- **What's wrong:** `GPTBot`, `CCBot`, `ChatGPT-User`, `anthropic-ai`, `Google-Extended` were all `Disallow: /`. Also present: a verbose Cloudflare "content signals" comment block.
- **SEO impact:** Blocks ChatGPT Search citations, Perplexity citations, and AI Overviews grounding — i.e., the entire emerging AI search discovery channel (approved direction: allow).
- **Priority:** 🟠 High
- **Exact fix (implemented):** `public/robots.txt` rewritten: `User-agent: *  Allow: /` + sitemap directive. All search and AI-search crawlers now inherit full access. (Decision on record: allow AI crawlers — revisit only if scraping becomes an abuse problem.)
- **Owner:** Developer (done)
- **Expected impact:** Eligibility for AI citations. Effect is gradual and shows up as referral traffic from chatgpt.com / perplexity.ai in GA4.

### 🟠 T6. No service landing pages (no "money pages") — **STRATEGY: build 4 (docs 03)**

- **What's wrong:** Routes are `/`, `/ventures`, `/projects`, `/skills`, `/blogs`, `/contact`. There is no page whose job is to rank for a commercial keyword ("hire Node.js developer", "server-side tracking implementation service", etc.). `/contact` is a CTA, not a ranking asset.
- **SEO impact:** Commercial-intent searches have no page to rank. Portfolio-as-CV cannot capture demand.
- **Priority:** 🟠 High
- **Exact fix:** 4 service pages specified in `03-content-clusters-linking-roadmap.md` §3 (content drawn from existing case studies): `/services/server-side-tracking-implementation`, `/services/nodejs-backend-development`, `/services/payment-gateway-integration`, `/services/ai-automation-development`.
- **Owner:** Developer (pages) + Content (copy) — spec is in doc 03.
- **Expected impact:** The only way commercial keywords can rank; also gives blog posts a commercial page to link to (conversion path).

### 🟠 T7. Blog targeted ultra-competitive head terms — **STRATEGY: pivot to long-tail clusters (docs 02/03)**

- **What's wrong:** Existing posts target "Meta CAPI", "sGTM Stape", "cache stampede prevention" head-on, where stape.io, taggrs.io, owntag.eu and Meta's own docs hold all top positions with high authority.
- **SEO impact:** A new domain cannot win these SERPs in year 1; effort produces no traffic, hurting morale and domain authority growth.
- **Priority:** 🟠 High
- **Exact fix:** Keyword re-mapping in `02-onpage-keywords-competitors.md` §3 and the 5-cluster topical map in doc 03 §2 — keep existing posts (they're good) but future content targets low-competition long-tails where the site's real production data is the differentiator.
- **Owner:** Content + SEO
- **Expected impact:** First rankings within 4–10 weeks instead of never.

### 🟠 T8. Broken internal linking graph — **FIXED IN CODE + strategy in doc 03**

- **What's wrong:** Blog posts linked only to `/contact`. No blog↔blog links, no blog→projects links, homepage didn't link to any blog post (posts were 2 clicks deep only via /blogs listing). `/blogs` category filter tabs showed 7 categories that didn't match the data's 4 actual categories, so 3 filters always displayed "0".
- **SEO impact:** Orphan-ish posts receive no PageRank from the homepage; relevance between related posts never established; broken filter = wasted crawl + bad UX signals.
- **Priority:** 🟠 High
- **Exact fix (implemented):**
  - Homepage "Latest Field Notes" section → direct links to 3 newest posts (depth 1).
  - `relatedSlugs` on every post → "Related Field Notes" section on every post page.
  - Contextual CTA per post → the matching case study anchor on `/projects` (e.g. React2Shell post → `#react2shell-postmortem`).
  - Category filters corrected to the real 4 categories (security/tracking/systems/venture).
- **Owner:** Developer (done); ongoing discipline in doc 03 §4.
- **Expected impact:** Every post ≤2 clicks from homepage; topical relevance flows through the graph.

### 🟡 T9. Schema gaps — **FIXED IN CODE**

- **What's wrong:** TechArticle schema lacked `image`, `dateModified`, publisher URL; no `BreadcrumbList` anywhere; Person schema lacked `image`; ventures page had no Organization entities; WebSite `SearchAction` pointed to `/blogs?q=` which didn't actually work.
- **SEO impact:** Weakens rich-result eligibility (article rich results, breadcrumbs in SERP) and Entity/authority signals (Person ↔ Organization ↔ sameAs graph).
- **Priority:** 🟡 Medium
- **Exact fix (implemented):** TechArticle + image/dateModified/articleSection/inLanguage; BreadcrumbList on every blog post + /blogs + /ventures; Person.image added; Organization ItemList on /ventures; `?q=` search now actually filters (validateSearch wired) so the SearchAction target is real.
- **Owner:** Developer (done). Validate at: https://search.google.com/test/rich-results after deploy.
- **Expected impact:** Rich-result eligibility + stronger entity consolidation. (Honest note: Google shows article rich results mainly for news/sites it trusts — the entity signals are the durable win.)

### 🟡 T10. No per-post images / weak social previews — **FIXED IN CODE**

- **What's wrong:** Posts had no in-article imagery, no per-post `og:image` (all fell back to the site-wide card), no `og:locale`.
- **SEO impact:** Lower SERP/social CTR; images are also a (minor) quality and image-search signal.
- **Priority:** 🟡 Medium
- **Exact fix (implemented):** Branded 1200×630 social card + 1200×675 header image per post (12 PNGs in `public/blog-images/`, generated by `scripts/generate-images.mjs`); wired into `og:image`, TechArticle `image`, blog listing schema, and an in-article `<figure>` with descriptive `imageAlt` text on every post.
- **Owner:** Developer (done). Regenerate after rebranding: `node scripts/generate-images.mjs`.
- **Expected impact:** CTR improvement on shares/AI citations; complete article metadata.

### 🟡 T11. `keywords` meta tag — **FIXED IN CODE**

- **What's wrong:** `<meta name="keywords">` used on blog pages. Google has ignored it since 2009; it only leaks your keyword targets to competitors.
- **Priority:** 🟡 Medium (hygiene)
- **Exact fix (implemented):** Removed. `og:locale` added across routes.

### 🟢 T12. Framer-motion page transition wraps `<main>` — accepted, monitored

- **What's wrong:** An `AnimatePresence` fade (0.25s) wraps route output. Content is fully server-rendered, so Google sees everything, but heavy client animation on a content site is a mild INP/interaction cost.
- **Priority:** 🟢 Low
- **Recommendation:** Keep for now. If CrUX/field data (after GA4+CWV monitoring) shows INP issues on mobile, shorten the transition to 0.15s or remove. **Owner:** Developer, post-deployment check.

### 🟢 T13. Fonts loaded from Google Fonts CDN — accepted

- **What's wrong:** Silkscreen is fetched from fonts.googleapis.com while Inter/Space Grotesk/JetBrains are self-hosted via @fontsource. One external origin adds a connection on first paint.
- **Priority:** 🟢 Low
- **Recommendation:** If Core Web Vitals monitoring ever flags LCP, self-host Silkscreen via @fontsource like the others (1-line change + `bun add @fontsource/silkscreen`). Preconnect hints already present.

### 🟢 T14. Newsletter form has no backend — note

- The "Engineering Dispatch" form only shows a success toast (no persistence). Not an SEO issue directly, but list-building is part of the traffic→relationship funnel in doc 03 §6. Wire it to Web3Forms (already a dependency pattern in /contact) when convenient. **Owner:** Developer.

---

## 2. Google Search Console + GA4 setup (do this first — 30 minutes)

1. **GA4:** analytics.google.com → Admin → Create property → Web stream for `https://iamabdullah.dev` → copy the Measurement ID (`G-XXXXXXX`).
2. **GSC:** search.google.com/search-console → Add property → **URL prefix** → `https://iamabdullah.dev` → choose **HTML tag** verification → copy the `content="..."` value.
3. **Put both in env:** locally in `.env` (copy `.env.example`), and in **Cloudflare dashboard → Workers & Pages → your project → Settings → Variables** for production:
   ```
   VITE_GA4_ID=G-XXXXXXXXXX
   VITE_GSC_VERIFICATION=<the-content-value>
   ```
4. Redeploy (VITE_ vars are baked at build time). Verify: view-source on the homepage shows `google-site-verification` and the gtag snippet.
5. GSC → Sitemaps → submit `https://iamabdullah.dev/sitemap.xml`.
6. GSC → URL Inspection → Request indexing for the 7 URLs listed in T2.
7. **Weekly ritual (15 min):** GSC → Performance → filter **Position 4–20** → any query with decent impressions gets its landing page improved (title CTR fix, content expansion, internal links). This is the permanent quick-win machine.

## 3. Post-deployment verification checklist

- [ ] view-source: homepage → `google-site-verification` present (after env set)
- [ ] `/sitemap.xml` → 12 URLs, "DO NOT EDIT" comment
- [ ] `/robots.txt` → single `User-agent: * Allow: /` + sitemap line
- [ ] `/blogs/nonexistent-slug` → HTTP 404 (`curl -s -o /dev/null -w "%{http_code}" https://iamabdullah.dev/blogs/test-xyz`)
- [ ] Any blog post → view-source contains `TechArticle`, `BreadcrumbList`, `og:image` pointing at `/blog-images/og-...`
- [ ] https://search.google.com/test/rich-results on one post → no errors
- [ ] Google PageSpeed Insights on `/` and one blog post → record baseline CWV (expect good: static-ish SSR, small bundles, preconnected fonts)

## 4. Deliberately N/A items (don't waste time)

| Item | Why N/A |
|---|---|
| Hreflang | One language (English) only |
| Pagination | 6 posts, 12 total URLs — a single listing page is correct |
| WWW↔non-www canonical | Single canonical host already; Cloudflare redirects handle it |
| AMP | Deprecated/irrelevant |
| Multilingual sitemap x:html links | Single language |
| Toxic backlink disavow | New site, clean profile — only revisit if GSC shows spam links (it won't yet) |
