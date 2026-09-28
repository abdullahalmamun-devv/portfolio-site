/**
 * Central SEO configuration for iamabdullah.dev
 * Single source of truth for site URL, GA4, GSC verification and image paths.
 */

export const SITE_URL = "https://iamabdullah.dev";
export const SITE_NAME = "Abdullah Al Mamun";

/** Trailing-slash-free absolute URL helper */
export function absUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "/" : clean.replace(/\/$/, "")}`;
}

/**
 * Per-post artwork. Static PNGs generated from a branded template in
 * public/blog-images/ — one social card (1200x630) and one article header (1200x675) per post.
 */
export function postImagePath(slug: string): string {
  return `/blog-images/${slug}.png`;
}

export function postOgImagePath(slug: string): string {
  return `/blog-images/og-${slug}.png`;
}

/** GA4 measurement ID injected via environment (VITE_GA4_ID). Empty string disables the tag. */
export const GA4_ID: string =
  (import.meta.env?.VITE_GA4_ID as string | undefined) ??
  (typeof process !== "undefined" ? process.env?.VITE_GA4_ID ?? "" : "");

/**
 * Google Search Console HTML-file-free verification meta tag content
 * (the value inside content="...", from the "HTML tag" verification method).
 */
export const GSC_VERIFICATION: string =
  (import.meta.env?.VITE_GSC_VERIFICATION as string | undefined) ??
  (typeof process !== "undefined" ? process.env?.VITE_GSC_VERIFICATION ?? "" : "");

/** ISO lastmod for a blog post (dateModified falls back to publish date). */
export function postLastmod(isoDate: string, dateModified?: string): string {
  return (dateModified ?? isoDate).slice(0, 10);
}
