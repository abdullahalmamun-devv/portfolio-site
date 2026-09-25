# Abdullah — Portfolio Site Plan

A cinematic, dark-mode-first portfolio built on the project's existing TanStack Start + React 19 + Tailwind v4 stack, with Framer Motion for scroll reveals and transitions. Separate route per section for SEO and shareable deep links.

## Stack note

This Lovable project runs on TanStack Start (not Next.js) and deploys to Lovable's managed edge hosting. The visual result, animations, copy, and SEO match the brief — only the framework wrapper and the VPS/Docker/Nginx pieces don't apply here.

## Design direction

- **Theme:** Deep slate/near-black base (`#06080d` → `#0b0f1a`) with neon cyan primary (`#22d3ee`) and emerald secondary (`#10b981`) accents. Subtle radial gradients and grid noise overlay for cinematic depth.
- **Type:** Space Grotesk (display, tight tracking for headlines) + Inter (body). Mono accents via JetBrains Mono for tech labels.
- **Motion:** Framer Motion — staggered fade/slide reveals on scroll (`whileInView`), magnetic CTA hover, glow pulse on accent elements, page transitions on route change. Restrained, not flashy.
- **Surfaces:** Glassmorphism nav, bordered cards with hairline cyan glow on hover, gradient text on hero headline.

## Routes

```
src/routes/
  __root.tsx         → shell: glass sticky nav, footer, page transition wrapper
  index.tsx          → Home / Hero + condensed highlights
  ventures.tsx       → SubsDrop + Pro Trainer IT detail cards
  skills.tsx         → "The Arsenal" — categorized tech grid
  projects.tsx       → Featured technical case studies
  contact.tsx        → Contact form + socials
```

Each route gets unique `head()` metadata (title, description, og:title, og:description). Nav uses `<Link>` with `activeProps` for active state.

## Sections & copy

**Header / Nav** — Sticky, glassmorphism (`backdrop-blur-xl bg-background/60` + border). Logo wordmark "ABDULLAH" + nav links + cyan-outlined "Resume" download button (wired to placeholder `/resume.pdf` for now).

**Hero (`/`)**

- Headline: _"Building Scalable Digital Ecosystems & Empowering Tech Growth."_ — gradient cyan→emerald on key phrase.
- Sub: dual-role line — CEO of SubsDrop + technical architect behind Pro Trainer IT's infrastructure.
- CTAs: primary "View My Work" → `/projects`, ghost "Let's Collaborate" → `/contact`.
- Background: animated radial gradient + faint dotted grid + floating accent orbs.
- Below fold: condensed teaser strip (ventures count, years building, stack pills) linking to deeper routes.

**About (on `/` after hero)**

- Bio: based in Bangladesh (Dhaka / Chapainawabganj), scaling Pro Trainer IT into a national online platform, passion for AI-automated workflows.
- Personal touch: analytical lens — same approach to system architecture as to dissecting cinematic franchise narratives.

**The Arsenal (`/skills`)** — Bento/masonry grid, 4 categories as cards, each with icon header + tech chips:

- Frontend & Backend: Next.js, React, Node.js, MERN
- DevOps & Infrastructure: Docker, PM2, Nginx, Redis, MongoDB, VPS Management
- AI & Automation: Gemini CLI, OpenClaw, Custom LLM Integrations
- Business & Integrations: UddoktaPay, IT Pay BD, Digital Marketing, Facebook Ads Optimization

**Ventures (`/ventures`)** — Two large detail cards:

- **SubsDrop** — Digital service business, CEO & Founder. Role, scope, outcomes.
- **Pro Trainer IT** — IT training, operator & scaler, physical + online platform vision.

**Projects (`/projects`)** — Three case studies as expandable cards:

1. Multi-layered caching system — Redis + MongoDB, high-availability health-check APIs.
2. E-commerce / service platform — UddoktaPay + IT Pay BD + international gateway integration.
3. AI-assisted high-conversion video & audio production campaigns.
   Each card: problem → architecture → outcome, with tech-stack chips.

**Contact (`/contact`)** — Validated form (Name, Email, Message) using react-hook-form + zod (already in project deps). Submit shows success toast via sonner; no backend write for now (placeholder handler — Lovable Cloud can be wired later if needed). Socials: LinkedIn, GitHub, email.

**Footer** — Minimal: wordmark, route links, social icons, © line.

## Technical details

- Install `framer-motion` via `bun add framer-motion`.
- Install fonts via `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono`; import in `src/start.ts`.
- Tailwind v4 tokens in `src/styles.css` under `@theme`: cyan/emerald accents, custom radii, neon shadow utilities (`--shadow-glow`). Dark mode is the default (`.dark` applied to `html` in `__root.tsx`).
- Shared components in `src/components/`: `Nav`, `Footer`, `PageTransition`, `SectionHeader`, `RevealOnScroll`, `GlowCard`, `TechChip`.
- Resume button points to `/resume.pdf` (you can drop the file in `public/` later).
- SEO: per-route `head()` with unique title (<60 chars) + description (<160 chars), single `h1` per page, semantic landmarks, alt text on every image, JSON-LD `Person` schema on home route.

## Out of scope (per stack)

- `tailwind.config.js` — Tailwind v4 is CSS-first; tokens live in `src/styles.css`.
- `docker-compose.yml` + Nginx config — Lovable hosting handles deployment; no VPS layer to configure here. (Happy to produce these as a separate reference document in a follow-up if you want them for use elsewhere.)

After approval I'll build all routes, components, animations, and SEO in one pass.
