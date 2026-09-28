# On-Page SEO, Keyword Research & Competitor Gap Analysis — iamabdullah.dev

> Companion to `01-technical-audit.md` (technical state) and `03-content-clusters-linking-roadmap.md` (execution plan).
> Difficulty/competition ratings below are **qualitative, SERP-inspection-based estimates** (live checks Sept 2026) — they deliberately favor "who actually holds page 1 and how strong is it" over tool scores. Re-validate with GSC impressions data after 60 days of collection.

---

## 1. Page-by-page on-page audit

Format: current state → verdict → exact new copy where a change is warranted. Titles ≈≤60 chars, metas ≈150–160 chars.

### 1.1 Homepage `/`

- **Title (current):** `Abdullah Al Mamun — Full-Stack Developer & Tech Founder` — brand-only, describes *what you are*, not *what you solve*. Google's cached SERP shows an even older title → Google rarely re-crawls.
- **Verdict:** 🟠 Needs change. The homepage's realistic keyword wins are brand + "hire full-stack developer Abdullah"-adjacent queries; it should also semantically anchor the site's services.
- **Proposed title:** `Abdullah Al Mamun — Senior Node.js & Full-Stack Developer for Hire`
- **Proposed meta:** `Senior full-stack engineer & founder of 4 live platforms. Hire me for Node.js/Next.js architecture, server-side tracking (CAPI/sGTM), payment systems & AI automation.`
- **H1 (current):** "Senior Full-Stack Engineer & Systems Architect. Operator of 4 Live Platforms." ✅ good — keep.
- **On-page gaps fixed in code:** homepage now links to 3 newest blog posts ("Latest Field Notes") — fresh-content + internal-link signal.
- **Conversion+SEO balance:** hero badges already show "Open for Global Remote" — good. Add one line of services links (once /services pages exist) to the "Ready for Immediate Engagement" banner: this is where commercial anchor text belongs.

### 1.2 `/ventures`

- **Title (current):** `Ventures & Live Platforms — SubsDrop, QuickMation, Pro Trainer IT, MoneTrix` — fine for entity clarity (matches Organization schema now added). Not a ranking page; it's an **entity-proof page** ("real operator" evidence).
- **Verdict:** 🟢 Keep title; schema now added in code (BreadcrumbList + Organization ItemList). Improvement: give each venture dossier a short "My role & what I engineered" paragraph with descriptive anchors to relevant blog posts (e.g., SubsDrop → singleflight post; MoneTrix → CAPI + MongoDB posts). 30 minutes, done once.

### 1.3 `/projects`

- **Title (current):** `Systems, Incident Post-Mortems & Code — Abdullah Al Mamun`
- **Verdict:** 🟡 Good page, wrong audience framing. This page can rank for **case-study-adjacent long-tails** ("nginx cryptominer incident", "react2shell case study") if its title carries searchable words.
- **Proposed title:** `Production Case Studies — Node.js, Redis, Security Post-Mortems`
- **Proposed meta:** `Real production engineering: zero-day CVE recovery, Redis caching at 22ms P99, air-gapped MongoDB, server-side CAPI tracking, and 28KB email infra — with telemetry.`
- **Fixed in code:** every case-study card now has a stable `id` anchor (blog CTAs deep-link to them). Improvement backlog: each card's `problem → solution → telemetry` structure is already SEO-perfect; when time allows, add a one-line outcome metric under each card title.

### 1.4 `/skills`

- **Title (current):** `Technical Stack & Capabilities — Abdullah Al Mamun`
- **Verdict:** 🟢 Correctly a thin utility page — *do not* try to make it rank; it would cannibalize nothing and compete with nothing. Keep as supporting conversion page. One fix: it renders an H1 via SectionHeader ✅.

### 1.5 `/contact`

- **Title (current):** `Direct Contact & Collaboration — Abdullah Al Mamun`
- **Verdict:** 🟢 Fine. Target: brand + "contact" — already wins by default. **Conversion note:** form works via Web3Forms + Telegram alerts — good response-time story; add "Replies within 24h" near the form (trust signal that raises conversion from organic visitors).

### 1.6 `/blogs` (listing)

- **Fixed in code:** new title `Engineering Blog — Node.js, Server Architecture & Tracking Field Notes` (keyword-bearing, intent-matching), fixed category filters (7 phantom categories → real 4), Blog schema now includes publisher + per-post images, BreadcrumbList added, `?q=` search now works server-side so the WebSite SearchAction is truthful.
- **Anchor-text note:** homepage "View All Field Notes" + nav "Blogs" → `/blogs` is the main authority path into the blog hub — good.

### 1.7 Blog posts (6)

Every post keeps its strong technical identity; the changes below are title/meta sharpening for CTR + the keyword pivot documented in §3. (Schema, images, internal links: fixed in code — see doc 01 T9/T10.)

| Post | Current title issue | Proposed meta title | Proposed meta description |
|---|---|---|---|
| React2Shell recovery | Fine but long; "Surviving" buries the CVE | `React2Shell CVE-2025-55182: VPS Recovery Post-Mortem` | `A real post-mortem: zero-day RCE pinned our VPS at 100% CPU mid-traffic. VNC rescue, cron persistence purge, container hardening — zero data loss.` |
| Meta CAPI + sGTM | "Why Client-Side Pixels Are Dead" is opinion-headline (low query match) | `Meta CAPI + sGTM: Event Deduplication Guide (Real Numbers)` | `Production blueprint for server-side Meta CAPI via sGTM: deterministic event_id dedup, SHA-256 PII hashing, 99.4% match rate, EMQ 8.8/10.` |
| Redis singleflight | Good | Keep | Keep (already crisp, includes 22ms proof) |
| MongoDB air-gapping | "South Asia" narrows a global query | `Air-Gapping MongoDB: UFW Whitelisting + Payment Proxy` | `Close 0.0.0.0 exposure, whitelist app-only DB access via UFW, and route bKash/Nagad webhooks through HMAC-verified, idempotent proxies.` |
| AI automation vs SaaS tax | "SaaS Tax" jargon; fine for audience | `Self-Hosted AI Automation vs Zapier/n8n: $1,200→$15/mo` | `Why we build proprietary Node.js automation engines + self-hosted n8n instead of paying per-task SaaS markups — architecture and real costs.` |
| TempMail 28KB | Good | Keep | Keep |

**H-structure check (all posts):** exactly one H1 (post title), section titles H2, sub-blocks use styled divs not headings ✅ compliant.

**E-E-A-T (all posts):** author byline + Person schema + sameAs(GitHub/LinkedIn) + real telemetry — this is genuinely strong first-hand experience signaling; it is the site's core moat. Keep the "Written by" box and byline schema on every future post.

### 1.8 Keyword cannibalization check

- `projects.tsx` case studies and `blogPosts.ts` cover the **same incidents** (React2Shell, CAPI, singleflight, MongoDB, TempMail, automation). **Verdict: not cannibalization** — they serve different intents (scan/evidence vs deep read), now explicitly cross-linked blog→project anchor (relevance transfer instead of competition). Do not merge them.
- Watch one future risk: when `/services/server-side-tracking-implementation` launches, the blog's CAPI post and the service page must split cleanly — post targets informational ("how/event dedup"), service page targets commercial ("implementation service/pricing/hire"). Enforced via internal anchor rules in doc 03 §4.

---

## 2. Keyword research — categorized

Legend: **Vol** = relative demand estimate (◆ low, ◆◆ medium, ◆◆◆ high), **Comp** = competition (from live SERP inspection), **Intent**: I=informational, C=commercial, T=transactional, N=navigational.

### 2.1 Primary money keywords (target: service pages — doc 03 §3)

| Keyword | Intent | Vol | Comp | Target page | Notes |
|---|---|---|---|---|---|
| hire node.js developer | T | ◆◆◆ | High | `/services/nodejs-backend-development` | Page-1 held by marketplaces (Toptal/Arc). Win long-tail variants first (see 2.5); this head term is a 12-month play |
| nodejs backend development services | C | ◆◆ | High | same | Agency SERP; needs cluster + backlinks |
| server-side tracking service | C | ◆ | Low-Med | `/services/server-side-tracking-implementation` | Consultants only — winnable within 3–6 months |
| meta conversions api implementation | C | ◆◆ | Medium | same | Stape owns informational; *implementation service* intent is open |
| sgtm setup service / server-side gtm agency | C | ◆ | Low | same | Commercial modifiers beat docs/tutorial SERPs |
| payment gateway integration developer | C | ◆◆ | Medium | `/services/payment-gateway-integration` | Global; BD-specific variants are wide open (2.4) |
| bkash / nagad payment integration | C | ◆◆ | **Very Low (EN)** | same | **Blue ocean** — no quality English engineering page targets this |
| ai automation agency | C | ◆◆◆ | Very High | `/services/ai-automation-development` | Head term — only target long-tail variants in year 1 |

### 2.2 Commercial-intent supporting keywords

| Keyword | Intent | Comp | Target | Notes |
|---|---|---|---|---|
| meta capi agency / consultant | C | Low | tracking service page | |
| redis caching consultant | C | Low | nodejs service page | Almost no dedicated SERP competition |
| mongodbatlas / mongodb security audit service | C | Low | payment integration page | Niche but high-value |
| ai chatbot development for business | C | High | AI service page | Via long-tails: "facebook messenger ai chatbot developer" |

### 2.3 Informational keywords (existing posts re-mapped + new)

| Keyword | Comp | Target post | Status |
|---|---|---|---|
| react2shell cve-2025-55182 | Med (news-driven, decaying) | React2Shell post | Publish fast — news window + evergreen post-mortem value |
| meta capi event deduplication | Med-High (stape/taggrs) | CAPI post | Differentiate on real numbers; expect position 5–15 eventually |
| emq event match quality improve | Med | *new* post (cluster A) | Stape has a thin doc; a real EMQ 8.8 case can win |
| cache stampede prevention nodejs | Med | singleflight post | Keep; support with new "singleflight pattern explained" |
| mongodb 0.0.0.0 exposure fix | Low | MongoDB post | Problem-specific long-tail — winnable |
| ufw whitelist port for app server | Low | MongoDB post | Command-level query; add a dedicated H2 |
| self hosted n8n vs zapier cost | Low-Med | automation post | Cost-comparison intent; already matches |
| disposable email own domain setup | Med | TempMail post | Add step-by-step section to capture |

### 2.4 Low-competition / long-tail opportunities (priority attack list)

These are chosen where **the site's real production data is the differentiator** and page-1 is weak (forum posts, thin docs):

1. `bkash webhook hmac verification` — near-zero EN competition; you have working code
2. `uddoktapay webhook integration` — vendor docs only; your proxy pattern wins
3. `nginx reverse proxy cryptominer incident` — incident-specific; zero dedicated content
4. `docker cpu quota limit cryptominer containment` — same
5. `sgtm stape cloudflare workers self-hosted` — Stape covers hosted; self-host angle open
6. `meta capi emq score 9` / `event match quality benchmark` — nobody publishes real benchmarks
7. `redis singleflight pattern typescript` — JS ecosystem content is thin vs Go's singleflight
8. `l1 l2 cache nodejs in-process lru redis` — architecture-query, weak page 1
9. `air gapped mongodb vpc security checklist` — checklist intent, easy win
10. `bdix cdn bangladesh content delivery` (cluster B expansion, later)

### 2.5 Brand keywords (defend, don't build)

`abdullah al mamun developer`, `iamabdullah.dev`, `subsdrop founder` — already won by homepage; GSC will confirm. The resume PDF currently ranks #2 with an old title — consider adding `noindex` headers is **not** needed (it's good entity evidence); leave it.

### 2.6 Semantic/supporting terms (sprinkle naturally in copy — never stuff)

`reverse proxy`, `idempotency key`, `webhook signature`, `request coalescing`, `thundering herd`, `p99 latency`, `first-party tracking`, `conversion api gateway`, `tag loading sequence`, `vpc peering`, `chattr immutable`, `noexec tmp mount`, `event_id dedup`, `sha256 pii hashing`.

---

## 3. Competitor gap analysis (actionable)

### 3.1 Server-side tracking cluster — competitors

| Competitor | What they rank for | Their structure | Their weakness = your gap |
|---|---|---|---|
| **stape.io** (blog + docs) | every sGTM/CAPI how-to; DR high | Long SEO'd guides + product CTAs | Vendor angle: **no real client numbers**, no incidents. You: publish 99.4% match, EMQ 8.8, dedup pitfalls with code |
| **owntag.eu / taggrs.io** | dedup, setup guides | Tutorial format | EU-consultant generic; no FinTech/conversion economics (ROAS, CAC −26% story is yours) |
| **Meta developers docs** | official CAPI reference | Reference docs | Zero production war stories; developers bounce to blogs — capture them |
| **Reddit r/GoogleTagManager / r/FacebookAds** | "dedup nightmare" threads | Q&A threads (rank because nothing better exists) | **Thread titles are your content calendar** — each recurring question = one post |

**Actionable gaps:** (1) every stape guide stops at "it works" — publish *verification* methodology (server logs, EMQ benchmarks); (2) no one covers **Cloudflare Workers-hosted sGTM** cost angle; (3) no BD/local-rail CAPI use case (your MoneTrix story is unique globally).

### 3.2 Bangladesh payment engineering cluster — the blue ocean

Live SERP checks show: `bkash api integration` → official docs + freelance-listing pages; `bkash webhook verification` → forum scraps; **no English engineering case study exists** for production bKash/Nagad/UddoktaPay rails with HMAC/idempotency/reconciliation patterns. Meanwhile thousands of BD developers + agencies + global remote-hiring managers search these. **First-mover content (4–6 posts, cluster B) ≈ owned SERP within months.** This is the fastest ranking opportunity on the entire site.

### 3.3 "Hire developer" personal-portfolio SERP

Competitors: Toptal/Arc/Upwork profile pages and LinkedIn. You cannot out-rank marketplaces on head terms; you *can* own: `node.js developer bangladesh remote hire` (weak page 1), `hire developer who has run production saas` (intent gap), plus every service + case-study long-tail above which funnel to /services pages. Strategy: let marketplaces fight the head; capture the qualified tail; convert with proof (ventures + telemetry) that profiles can't match.

### 3.4 SERP features to win

- **People Also Ask** (tracking/security queries): seed Q&A with FAQ schema on service pages + 2–3 posts (doc 03 §3) using question-style H2s that mirror PAA phrasing.
- **Featured snippets**: singleflight + UFW posts have code-block structure Google excerpts; add a 40–60 word direct answer paragraph directly under the first H2 of each.
- **Discussions/forums**: your React2Shell post should also exist as a condensed write-up on dev.to/HN (canonical to original — doc 03 §5) to occupy the discussions module for the CVE.

---

## 4. Route-level keyword → page map (single source of truth)

| Keyword theme | Primary page | Supporting pages | Forbidden overlap |
|---|---|---|---|
| Brand/person | `/` | /ventures, /blogs | — |
| Full-stack/Node hire | `/services/nodejs-backend-development` (new) | singleflight post, /projects | homepage stays brand-first |
| Server-side tracking | `/services/server-side-tracking-implementation` (new) | CAPI post, EMQ post (new) | post never says "hire/service" |
| BD payments | `/services/payment-gateway-integration` (new) | MongoDB post, bKash posts (new) | — |
| AI automation | `/services/ai-automation-development` (new) | SaaS-tax post | — |
| Security/incidents | `/projects` | React2Shell + MongoDB posts | — |
