import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";
import { GlowCard } from "../components/GlowCard";
import { Toaster } from "../components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Collaborate" },
      {
        name: "description",
        content:
          "Get in touch with Abdullah for engineering work, partnerships, and ventures. Based in Bangladesh, working globally.",
      },
      { property: "og:title", content: "Contact — Let's Collaborate" },
      {
        property: "og:description",
        content: "Reach out for engineering work, partnerships, and ventures.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Tell me your name"),
  email: z.string().email("That email looks off"),
  message: z.string().min(10, "A little more detail helps"),
});
type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Placeholder — wire to Lovable Cloud / email service when ready.
    await new Promise((r) => setTimeout(r, 600));
    console.log("contact submission", data);
    toast.success("Message sent — I'll get back within 24h.");
    reset();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Toaster />
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something durable."
        description="Engineering work, partnership, or just a sharp idea — drop a line and I'll respond personally."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <GlowCard>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message")}
                  className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60 resize-none"
                  placeholder="What are you building?"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </GlowCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlowCard className="h-full">
            <h2 className="text-lg font-semibold">Direct channels</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer to skip the form? Reach me where I already work.
            </p>

            <ul className="mt-6 space-y-3">
              <li>
                <a href="mailto:hello@abdullah.dev" className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-primary/40">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-xs text-muted-foreground">hello@abdullah.dev</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-primary/40">
                  <Linkedin className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">LinkedIn</div>
                    <div className="text-xs text-muted-foreground">Professional network</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-primary/40">
                  <Github className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium">GitHub</div>
                    <div className="text-xs text-muted-foreground">Code & open source</div>
                  </div>
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-border/60 bg-background/30 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                Response time
              </div>
              <div className="mt-1 text-sm">Usually within 24 hours, Asia/Dhaka.</div>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </div>
  );
}
