import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/ventures", label: "Ventures" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <Link to="/" className="font-display text-sm font-bold tracking-[0.2em] text-foreground">
            ABDULLAH<span className="text-primary">.</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                  className="px-3 py-1.5 text-sm transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-glow sm:px-4 sm:text-sm"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
