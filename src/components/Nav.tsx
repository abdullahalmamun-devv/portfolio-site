import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Menu, X, ArrowUpRight, Github, Linkedin, Layers, BookOpen } from "lucide-react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/ventures", label: "Ventures" },
  { to: "/projects", label: "Systems & Post-Mortems" },
  { to: "/skills", label: "Stack & Testing" },
  { to: "/blogs", label: "Blogs" },
] as const;

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Mobile Dark Backdrop Scrim */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-6xl px-3 sm:px-6 pt-2.5 sm:pt-4">
          <nav className="glass flex items-center justify-between rounded-xl px-3 py-2.5 sm:px-6 sm:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.15)]">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center group shrink-0">
              <div className="flex flex-col">
                <span className="font-pixel text-xs sm:text-[13px] tracking-wider text-white transition-colors group-hover:text-emerald-400">
                  Abdullah Al Mamun
                </span>
                <span className="hidden sm:block text-[10px] text-zinc-400 font-mono">
                  Founder & Systems Architect
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1 border border-white/[0.06] bg-black/40 rounded-lg p-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-white/[0.1] text-white font-medium shadow-sm" }}
                    inactiveProps={{
                      className: "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]",
                    }}
                    className="rounded-md px-3 py-1.5 text-xs transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="https://github.com/abdullahalmamun-devv"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:text-white hover:border-white/20"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-al-mamun-b07295329/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:text-white hover:border-white/20"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="/Abdullah_Resume.pdf"
                download="Abdullah_Al_Mamun_Resume.pdf"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
              >
                <Download className="h-3.5 w-3.5 text-zinc-400" />
                Resume
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 shadow-sm"
              >
                Contact
                <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
              </Link>
            </div>

            {/* Mobile Menu Button (Clean hamburger toggle without squished Contact button) */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Menu: 100% Opaque Solid Card for Total Contrast & Readability */}
          {mobileMenuOpen && (
            <div className="relative z-50 mt-2 rounded-2xl border border-white/15 bg-[#0b0d12] p-3.5 sm:p-4 md:hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/10 animate-in fade-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-90px)] overflow-y-auto">
              <ul className="space-y-1.5">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setMobileMenuOpen(false)}
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{
                        className:
                          "bg-blue-600/20 border-blue-500/40 text-white font-semibold shadow-sm",
                      }}
                      inactiveProps={{
                        className:
                          "bg-white/[0.03] border-white/[0.06] text-zinc-200 hover:bg-white/[0.08] hover:text-white",
                      }}
                      className="flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm transition-all"
                    >
                      <span className="font-medium">{l.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/abdullahalmamun-devv"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abdullah-al-mamun-b07295329/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
                <a
                  href="/Abdullah_Resume.pdf"
                  download="Abdullah_Al_Mamun_Resume.pdf"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  <Download className="h-4 w-4 text-zinc-400" />
                  Download Resume PDF
                </a>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
                >
                  Direct Contact / Hire Me
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile App Dock Navigation Bar (Docked design matching reference image with 3 items: Ventures | Elevated Contact | Blogs) */}
      {!mobileMenuOpen && (
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none">
          <nav className="pointer-events-auto relative w-full border-t border-white/[0.1] bg-[#08090d]/95 backdrop-blur-2xl rounded-t-[26px] shadow-[0_-12px_40px_rgba(0,0,0,0.85)] px-4 pt-2.5 pb-[max(env(safe-area-inset-bottom),10px)]">
            {/* Subtle top edge emerald/cyan ambient glow */}
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

            <div className="grid grid-cols-3 items-center justify-items-center relative max-w-sm mx-auto">
              {/* 1. Ventures (Left) */}
              <Link
                to="/ventures"
                activeProps={{ className: "text-emerald-400 font-semibold" }}
                inactiveProps={{ className: "text-zinc-400 hover:text-zinc-200" }}
                className="flex flex-col items-center justify-center py-1 transition-colors text-center gap-1 group w-full"
              >
                <Layers className="h-5 w-5 transition-transform group-hover:scale-110 group-active:scale-95" />
                <span className="text-[11px] font-medium leading-none tracking-tight">
                  Ventures
                </span>
              </Link>

              {/* 2. CENTER: Elevated Glowing Chat Button (Contact) */}
              <div className="flex flex-col items-center justify-center -mt-6">
                <Link
                  to="/contact"
                  className="group relative flex flex-col items-center justify-center focus:outline-none"
                  aria-label="Direct Contact"
                >
                  <div className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-b from-[#181d27] to-[#0a0c12] border border-emerald-500/50 shadow-[0_0_24px_rgba(16,185,129,0.5),0_0_48px_rgba(16,185,129,0.2)] ring-2 ring-emerald-400/60 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_36px_rgba(16,185,129,0.75)] group-active:scale-95">
                    {/* Inner ambient glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/15 via-transparent to-white/10 pointer-events-none" />

                    {/* Chat Bubble Icon with Smile from Reference Image */}
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white relative z-10 transition-transform group-hover:scale-110"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      <path d="M9 11c.7 1.3 1.8 2 3 2s2.3-.7 3-2" />
                    </svg>

                    {/* Online indicator dot */}
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                  </div>
                  <span className="mt-1 text-[10px] font-semibold text-zinc-300 tracking-wider transition-colors group-hover:text-emerald-400">
                    Contact
                  </span>
                </Link>
              </div>

              {/* 3. Blogs (Right) */}
              <Link
                to="/blogs"
                activeProps={{ className: "text-emerald-400 font-semibold" }}
                inactiveProps={{ className: "text-zinc-400 hover:text-zinc-200" }}
                className="flex flex-col items-center justify-center py-1 transition-colors text-center gap-1 group w-full"
              >
                <BookOpen className="h-5 w-5 transition-transform group-hover:scale-110 group-active:scale-95" />
                <span className="text-[11px] font-medium leading-none tracking-tight">Blogs</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
