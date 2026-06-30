import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-display text-sm font-bold tracking-[0.2em]">
            ABDULLAH<span className="text-primary">.</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground max-w-sm">
            Building scalable digital ecosystems from Bangladesh. Founder, architect, operator.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/ventures" className="text-xs text-muted-foreground hover:text-foreground">Ventures</Link>
          <Link to="/skills" className="text-xs text-muted-foreground hover:text-foreground">Skills</Link>
          <Link to="/projects" className="text-xs text-muted-foreground hover:text-foreground">Projects</Link>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <a aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-primary hover:border-primary/40">
            <Linkedin className="h-4 w-4" />
          </a>
          <a aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-primary hover:border-primary/40">
            <Github className="h-4 w-4" />
          </a>
          <a aria-label="Email" href="mailto:hello@abdullah.dev" className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-primary hover:border-primary/40">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        © {new Date().getFullYear()} Abdullah — All systems operational
      </div>
    </footer>
  );
}
