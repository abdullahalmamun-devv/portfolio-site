# SEO Strategy — iamabdullah.dev

Complete audit + long-term organic growth strategy, delivered September 2026. Three documents, one reading order per role.

## 📖 Who reads what

| Role | Read | Then do |
|---|---|---|
| **Developer** | `01-technical-audit.md` | All code fixes marked **FIXED IN CODE** are already in this repo — your remaining items: set `VITE_GA4_ID` + `VITE_GSC_VERIFICATION` (§2), run the post-deploy checklist (§3), later build the 4 `/services/*` pages from doc 03 §3 |
| **Content** | `02-onpage-keywords-competitors.md` §1 → `03-content-clusters-linking-roadmap.md` §2 | New titles/metas (doc 02 §1), then the Month-1 calendar (doc 03 §2). Follow the per-post checklist at the end of doc 03 |
| **SEO** | All three, in order | Execute doc 01 §2 (GSC/GA4 setup), run the weekly 4–20 ritual (doc 03 §6), own quick wins (doc 03 §7) |

## 📁 Documents

1. **[01-technical-audit.md](./01-technical-audit.md)** — 14 issues with What/Why/Priority/Fix/Owner/Impact. Code-level fixes are implemented; setup + operational steps remain.
2. **[02-onpage-keywords-competitors.md](./02-onpage-keywords-competitors.md)** — per-page audits with exact new copy, categorized keyword research (money/service/commercial/informational/long-tail/brand/semantic), competitor gap analysis, keyword→page map.
3. **[03-content-clusters-linking-roadmap.md](./03-content-clusters-linking-roadmap.md)** — 5 topical clusters, 12-month calendar (4–6 posts/mo), 4 service-page blueprints, internal-linking rules + map, safe backlink strategy, quick wins, phased 6–12 month roadmap, KPIs.

## ⚡ Start here (this week)

1. Set the two env vars and deploy (doc 01 §2) — 30 min
2. GSC: submit sitemap + request indexing for the 7 URLs (doc 01 §1-T2) — 30 min
3. Quick wins 3–5 from doc 03 §7 (title/meta rewrites) — 1 h

## 🔧 Repo changes that came with this audit

- Soft-404 fix (`src/routes/blogs.$slug.tsx` — true 404s)
- Auto-generated sitemap (`plugins/sitemap-generator.ts`, runs on every build/dev)
- robots.txt: AI/search crawlers allowed
- GA4 + GSC verification hooks (`src/lib/seo.ts`, env-driven)
- Schema upgrades: BreadcrumbList everywhere relevant, TechArticle image/dateModified, Organization entities on /ventures, Person image
- Internal linking: homepage → newest posts, related posts on every article, per-post contextual case-study anchors, fixed /blogs category filters, working `?q=` search
- Per-post OG + header images (`public/blog-images/`, regenerate: `node scripts/generate-images.mjs`)
