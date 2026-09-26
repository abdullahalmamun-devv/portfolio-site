import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-display text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Route not found</h2>
        <p className="mt-2 text-sm text-zinc-400">
          The requested system endpoint does not exist. Navigate back to the primary overview.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 shadow-sm"
          >
            Return to Overview
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">Application Exception</h1>
        <p className="mt-2 text-sm text-zinc-400">
          An unhandled error occurred in the client boundary.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-500"
          >
            Retry Execution
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Abdullah Al Mamun — Full-Stack Developer & Tech Founder" },
      {
        name: "description",
        content:
          "Full-stack developer & founder of SubsDrop, QuickMation, MoneTrix. Hire me for Node.js, Next.js, server architecture & enterprise automation projects.",
      },
      { name: "author", content: "Abdullah Al Mamun" },
      { property: "og:site_name", content: "Abdullah Al Mamun" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://iamabdullah.dev/og-image.png" },
      { property: "og:image:secure_url", content: "https://iamabdullah.dev/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Abdullah Al Mamun — Full-Stack Developer & Tech Founder" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Abdullah Al Mamun — Full-Stack Developer & Tech Founder" },
      {
        name: "twitter:description",
        content:
          "Full-stack developer & founder of SubsDrop, QuickMation, MoneTrix. Hire me for Node.js, Next.js, server architecture & enterprise automation projects.",
      },
      { name: "twitter:image", content: "https://iamabdullah.dev/og-image.png" },
      { name: "twitter:image:alt", content: "Abdullah Al Mamun — Full-Stack Developer & Tech Founder" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Abdullah Al Mamun",
            url: "https://iamabdullah.dev",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://iamabdullah.dev/blogs?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Abdullah Al Mamun",
            alternateName: "Abdullah",
            jobTitle: "Full-Stack Developer & Tech Founder",
            url: "https://iamabdullah.dev",
            email: "hello@iamabdullah.dev",
            sameAs: [
              "https://github.com/abdullahalmamun-devv",
              "https://www.linkedin.com/in/abdullah-al-mamun-b07295329/",
              "https://subsdrop.com",
              "https://www.protrainerit.com",
              "https://quickmation.online",
              "https://www.monetrix.shop",
            ],
            worksFor: [
              { "@type": "Organization", name: "SubsDrop", url: "https://subsdrop.com" },
              { "@type": "Organization", name: "QuickMation", url: "https://quickmation.online" },
              {
                "@type": "Organization",
                name: "Pro Trainer IT",
                url: "https://www.protrainerit.com",
              },
              { "@type": "Organization", name: "MoneTrix", url: "https://www.monetrix.shop" },
            ],
            knowsAbout: [
              "Full-Stack Web Development",
              "Node.js",
              "Next.js",
              "React",
              "Server Architecture",
              "Redis Caching",
              "MongoDB",
              "Linux Server Administration",
              "Server-Side Tracking",
              "Meta CAPI",
              "Enterprise AI Automation",
            ],
          },
        ]),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AnimatedOutlet() {
  const router = useRouter();
  const key = router.state.location.pathname;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen ambient-bg flex flex-col justify-between overflow-x-hidden w-full max-w-full">
        <Nav />
        <main className="pt-20 sm:pt-24 flex-grow w-full max-w-full overflow-x-hidden">
          <AnimatedOutlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
