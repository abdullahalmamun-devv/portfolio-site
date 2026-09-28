import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-10 sm:mt-14 border-t border-white/[0.08] bg-[#090b0e] pb-16 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand Info */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center text-white group">
              <span className="font-pixel text-sm sm:text-base tracking-wider text-white transition-colors group-hover:text-emerald-400">
                Abdullah Al Mamun
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              Senior Full-Stack Systems Engineer &amp; Tech Founder. Available for high-ticket
              contracts &amp; remote engineering roles worldwide. Architecting scalable digital
              infrastructure with zero downtime.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>All 4 Platforms Operational • Available Globally (UTC+6)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6 sm:gap-10 text-xs">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                Navigation
              </div>
              <ul className="mt-3 space-y-2 text-zinc-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link to="/ventures" className="hover:text-white transition-colors">
                    4 Live Platforms
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="hover:text-white transition-colors">
                    Incident Post-Mortems &amp; Code
                  </Link>
                </li>
                <li>
                  <Link to="/skills" className="hover:text-white transition-colors">
                    Stack &amp; Linux Hardening
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="hover:text-white transition-colors">
                    Developer Tools &amp; Stack
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-white transition-colors">
                    Engineering Blogs &amp; Notes
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Hire / Contract Me
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                Live Platforms
              </div>
              <ul className="mt-3 space-y-2 text-zinc-400">
                <li>
                  <a
                    href="https://subsdrop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 font-medium hover:text-white"
                  >
                    SubsDrop.com <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                  <span className="block text-[11px] text-zinc-400">Digital Tools SaaS</span>
                </li>
                <li className="pt-1">
                  <a
                    href="https://quickmation.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 font-medium hover:text-white"
                  >
                    QuickMation.online <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                  <span className="block text-[11px] text-zinc-400">Enterprise AI Automation</span>
                </li>
                <li className="pt-1">
                  <a
                    href="https://www.protrainerit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 font-medium hover:text-white"
                  >
                    ProTrainerIT.com <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                  <span className="block text-[11px] text-zinc-400">
                    Technical Academy &amp; LMS
                  </span>
                </li>
                <li className="pt-1">
                  <a
                    href="https://www.monetrix.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 font-medium hover:text-white"
                  >
                    MoneTrix.shop <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                  <span className="block text-[11px] text-zinc-400">
                    Digital Product Merchant SaaS
                  </span>
                </li>
                <li className="pt-1">
                  <a
                    href="https://temp.subsdrop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 font-medium hover:text-white"
                  >
                    temp.subsdrop.com <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                  <span className="block text-[11px] text-zinc-400">
                    Disposable Email Utility
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* External Channels */}
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Verified Profiles
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href="https://github.com/abdullahalmamun-devv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:text-white hover:border-white/20"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-al-mamun-b07295329/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:text-white hover:border-white/20"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@iamabdullah.dev"
                aria-label="Direct Email"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:text-white hover:border-white/20"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/[0.06] pt-5 text-center text-[11px] text-zinc-400">
          <div>© {new Date().getFullYear()} Abdullah Al Mamun. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
