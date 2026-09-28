/**
 * Generates per-post social cards (1200x630) and article header images (1200x675)
 * into public/blog-images/ using ffmpeg drawtext — matching the site's dark,
 * mono-accent aesthetic. Zero extra npm dependencies.
 *
 * Run: node scripts/generate-images.mjs
 * Requires: ffmpeg on PATH.
 *
 * NOTE: keep the post list in sync with src/data/blogPosts.ts.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const OUT_DIR = resolve(process.cwd(), "public/blog-images");
const FONT_DIR = "C\\:/Windows/Fonts"; // ffmpeg fontconfig escaping for Windows drive paths
const ARIAL = `${FONT_DIR}/arialbd.ttf`;
const CONSOLA = `${FONT_DIR}/consolab.ttf`;

const BG = "0x0a0c10";
const PANEL = "0x0f121a";
const BLUE = "0x60a5fa";
const EMERALD = "0x34d399";
const AMBER = "0xfbbf24";
const WHITE = "0xf4f4f5";
const MUTED = "0xa1a1aa";

const POSTS = [
  {
    slug: "surviving-react2shell-cve-2025-55182-vps-recovery",
    eyebrow: "INCIDENT RECOVERY & SECURITY",
    accent: AMBER,
    lines: ["Surviving React2Shell", "CVE-2025-55182 VPS Recovery", "Under Live Traffic"],
    footer: "IAMABDULLAH.DEV / FIELD NOTES",
  },
  {
    slug: "engineering-server-side-meta-capi-sgtm-tracking",
    eyebrow: "MARKETING ENGINEERING & DATA",
    accent: BLUE,
    lines: ["Client-Side Pixels Are Dead", "Meta CAPI + sGTM", "Event Deduplication"],
    footer: "IAMABDULLAH.DEV / FIELD NOTES",
  },
  {
    slug: "singleflight-redis-cache-stampede-prevention-nodejs",
    eyebrow: "BACKEND & SYSTEMS",
    accent: EMERALD,
    lines: ["Cache Stampedes, Solved", "Singleflight + Multi-Tier Redis", "P99: 240ms → 22ms"],
    footer: "IAMABDULLAH.DEV / FIELD NOTES",
  },
  {
    slug: "air-gapping-mongodb-production-ufw-payment-proxy",
    eyebrow: "INCIDENT RECOVERY & SECURITY",
    accent: AMBER,
    lines: ["Air-Gapping MongoDB", "UFW Whitelisting &", "Hardened Payment Proxies"],
    footer: "IAMABDULLAH.DEV / FIELD NOTES",
  },
  {
    slug: "building-proprietary-ai-automation-engines-vs-saas-tax",
    eyebrow: "VENTURE & PRODUCT STRATEGY",
    accent: BLUE,
    lines: ["Eliminating the SaaS Tax", "Proprietary AI Automation", "vs Zapier & n8n Cloud"],
    footer: "IAMABDULLAH.DEV / FIELD Notes".toUpperCase(),
  },
  {
    slug: "architecting-ultra-lightweight-disposable-email-platform-28kb",
    eyebrow: "BACKEND & SYSTEMS",
    accent: EMERALD,
    lines: ["A 28KB Disposable Email", "Platform — DNS MX Routing", "& Real-Time Ingress"],
    footer: "IAMABDULLAH.DEV / FIELD NOTES",
  },
  {
    slug: "stop-sharing-env-files-inboxes-envlink-guide",
    eyebrow: "DEVELOPER SECURITY & SECRETS",
    accent: AMBER,
    lines: ["Stop Sharing .env in Inboxes", "Secure Secrets with", "EnvLink CLI"],
    footer: "IAMABDULLAH.DEV / FIELD NOTES",
  },
];

function drawtext({ text, y, size, color, font = ARIAL, x = 90, extra = [] }) {
  const escaped = text
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\\\u2019")
    .replace(/:/g, "\\:")
    .replace(/%/g, "\\%");
  return [
    "drawtext=fontfile='" + font + "'",
    `text='${escaped}'`,
    `fontcolor=${color}`,
    `fontsize=${size}`,
    `x=${x}`,
    `y=${y}`,
    ...extra,
  ].join(":");
}

function runFfmpeg(args, label) {
  const res = spawnSync(FFMPEG, args, { encoding: "utf8", shell: false });
  if (res.status !== 0) {
    console.error(`✗ ${label} failed:\n${res.stderr.split("\n").slice(-8).join("\n")}`);
    process.exitCode = 1;
    return false;
  }
  console.log(`✓ ${label}`);
  return true;
}

function generateCard(post, width, height, label) {
  const scale = height / 630;
  const baseY = Math.round(150 * scale);
  const step = Math.round(78 * scale);
  const eyebrowSize = Math.round(26 * scale);
  const titleSize = Math.round(58 * scale);
  const footerSize = Math.round(20 * scale);

  const filters = [
    drawtext({
      text: post.eyebrow,
      y: baseY,
      size: eyebrowSize,
      color: post.accent,
      font: CONSOLA,
    }),
    ...post.lines.map((line, i) =>
      drawtext({
        text: line,
        y: baseY + (i + 1) * step,
        size: titleSize,
        color: WHITE,
      }),
    ),
    drawtext({
      text: post.footer,
      y: height - Math.round(64 * scale),
      size: footerSize,
      color: MUTED,
      font: CONSOLA,
    }),
  ].join(",");

  return runFfmpeg(
    [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=${BG}:s=${width}x${height},drawbox=x=0:y=0:w=${width}:h=${height}:color=${PANEL}@0.35:t=fill,format=rgb24`,
      "-vf",
      filters,
      "-frames:v",
      "1",
      resolve(OUT_DIR, `${label}.png`),
    ],
    label,
  );
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  let ok = true;
  for (const post of POSTS) {
    ok = generateCard(post, 1200, 630, `og-${post.slug}`) && ok;
    ok = generateCard(post, 1200, 675, post.slug) && ok;
  }

  if (!ok) {
    console.error("\nSome images failed. Fix and re-run: node scripts/generate-images.mjs");
    process.exit(1);
  }
  console.log(`\nGenerated ${POSTS.length * 2} images in public/blog-images/`);
}

main();
