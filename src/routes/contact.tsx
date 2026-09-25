import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Check,
  ChevronDown,
  Copy,
  Clock,
  ShieldCheck,
  MessageSquare,
  ArrowUpRight,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";
import { Toaster } from "../components/ui/sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Direct Contact & Collaboration — Abdullah Al Mamun" },
      {
        name: "description",
        content:
          "Connect with Abdullah Al Mamun for technical architecture advisory, payment gateway integration, and venture collaboration. Direct email: hello@iamabdullah.dev.",
      },
      { property: "og:title", content: "Direct Contact & Collaboration — Abdullah Al Mamun" },
      {
        property: "og:description",
        content:
          "Direct communication channel for senior engineering advisory, architecture, and partnerships.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please provide a valid business email address"),
  projectType: z.string().min(1, "Please select an engagement type"),
  message: z.string().min(10, "Please share a brief overview of your inquiry (min 10 characters)"),
});

type FormValues = z.infer<typeof schema>;

const INQUIRY_OPTIONS = [
  {
    value: "Remote Senior Engineering Role (Global/US/EU)",
    label: "Remote Senior Engineering Role (Global / US / EU)",
    desc: "Principal, staff, or high-level full-time roles",
  },
  {
    value: "High-Ticket Custom AI Automation (QuickMation)",
    label: "High-Ticket Custom AI Automation (QuickMation)",
    desc: "Autonomous workflow pipelines & enterprise AI systems",
  },
  {
    value: "Technical Advisory / Systems Architecture",
    label: "High-Performance Architecture & Advisory",
    desc: "Scalability audits, backend systems & advisory",
  },
  {
    value: "FinTech & Payment Rails",
    label: "FinTech & Dual-Rail Payment Integration",
    desc: "Cross-border & local bKash/Nagad/Stripe engines",
  },
  {
    value: "SubsDrop / MoneTrix Partnership",
    label: "SubsDrop / MoneTrix Platform Collaboration",
    desc: "Venture incubation, co-founding & growth",
  },
  {
    value: "General Conversation",
    label: "General Engineering Inquiry",
    desc: "Technical consultation & strategic discussion",
  },
] as const;

function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: "Technical Advisory / Systems Architecture",
    },
  });

  const selectedProjectType = watch("projectType");
  const activeOption =
    INQUIRY_OPTIONS.find((opt) => opt.value === selectedProjectType) || INQUIRY_OPTIONS[2];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  const onSubmit = async (data: FormValues) => {
    try {
      // 1. Prepare Web3Forms Email Submission
      const web3FormsPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:
            import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "56094adb-6ce1-45fd-9f78-499c15418b69",
          from_name: "⚡ Executive Client Lead • Abdullah Al Mamun",
          subject: `💼 New Lead: ${data.name} [${data.projectType}]`,
          "Client Name / Organization": data.name,
          "Business Email": data.email,
          "Nature of Inquiry": data.projectType,
          "Inquiry Scope & Details": data.message,
          "Channel / Source": "Direct Line (iamabdullah.dev/contact)",
          "Submission Time": new Date().toLocaleString("en-US", {
            timeZone: "Asia/Dhaka",
            dateStyle: "full",
            timeStyle: "medium",
          }),
        }),
      });

      // 2. Prepare Telegram Bot Instant Alert
      const botToken =
        import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8877787786:AAEk4jw2FD5Gfbk1ORkb0HUIcAn65MhUdiw";
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || "6955551020";

      const formattedDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const telegramText =
        `🚀 <b>NEW CLIENT LEAD RECEIVED!</b>\n\n` +
        `👤 <b>Client:</b> ${data.name}\n` +
        `✉️ <b>Email:</b> ${data.email}\n` +
        `🎯 <b>Inquiry:</b> ${data.projectType}\n` +
        `🕒 <b>Time:</b> ${formattedDate} (UTC+6)\n\n` +
        `📝 <b>Message:</b>\n<i>${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</i>\n\n` +
        `-----------------------------------\n` +
        `🔗 <b>Reply directly:</b> ${data.email}\n` +
        `🌐 <b>Channel:</b> iamabdullah.dev/contact`;

      const telegramPromise = fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: "HTML",
        }),
      }).catch((err) => console.error("Telegram notify error:", err));

      // 3. Await Email Result (Primary)
      const [emailResponse] = await Promise.all([web3FormsPromise, telegramPromise]);
      const result = await emailResponse.json();

      if (result.success) {
        toast.success(
          "Message transmitted successfully! I will respond to your email within 24 hours.",
        );
        reset();
        setIsDropdownOpen(false);
      } else {
        toast.error(
          result.message ||
            "Failed to transmit message. Please email hello@iamabdullah.dev directly.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network transmission error. Please email hello@iamabdullah.dev directly.");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@iamabdullah.dev");
    setCopiedEmail(true);
    toast.info("Email copied to clipboard: hello@iamabdullah.dev");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-12">
      <Toaster />
      <SectionHeader
        eyebrow="Initiate Contact"
        title="Direct Line for High-Impact Collaboration"
        description="Whether you are architecting a high-throughput backend system, expanding payment infrastructure in South Asia, or exploring venture partnerships."
      />

      <div className="mt-6 sm:mt-8 grid gap-6 lg:grid-cols-12">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white">Send a Direct Inquiry</h2>
              <p className="mt-1 text-xs text-zinc-400">
                Messages route directly to my personal inbox at{" "}
                <span className="font-mono text-zinc-300">hello@iamabdullah.dev</span>.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3.5" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300"
                  >
                    Your Name / Organization
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500"
                    placeholder="Alex Morgan (e.g. Acme Tech)"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300"
                  >
                    Business Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500"
                    placeholder="alex@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative w-full" ref={dropdownRef}>
                  <label
                    htmlFor="projectType"
                    className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300"
                  >
                    Nature of Inquiry
                  </label>

                  {/* Custom Mobile-Constrained Trigger */}
                  <button
                    type="button"
                    id="projectType"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={cn(
                      "mt-1.5 flex w-full items-center justify-between rounded-lg border bg-black/40 px-3.5 py-2.5 text-xs text-white transition-all focus:outline-none",
                      isDropdownOpen
                        ? "border-blue-500 ring-2 ring-blue-500/20 shadow-sm"
                        : "border-white/10 hover:border-white/20",
                    )}
                  >
                    <span className="truncate text-left font-medium text-white pr-2">
                      {activeOption.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200",
                        isDropdownOpen && "rotate-180 text-blue-400",
                      )}
                    />
                  </button>

                  {/* Hidden input for react-hook-form */}
                  <input type="hidden" {...register("projectType")} />

                  {/* Custom Dropdown Menu: Strictly fits inside the container width */}
                  {isDropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute left-0 right-0 z-30 mt-1.5 max-h-72 w-full overflow-y-auto rounded-xl border border-white/15 bg-[#12151c]/98 p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.85)] backdrop-blur-2xl ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="space-y-1">
                        {INQUIRY_OPTIONS.map((opt) => {
                          const isSelected = selectedProjectType === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setValue("projectType", opt.value, {
                                  shouldValidate: true,
                                });
                                setIsDropdownOpen(false);
                              }}
                              className={cn(
                                "group flex w-full items-start justify-between rounded-lg p-2.5 text-left transition-colors",
                                isSelected
                                  ? "bg-blue-600/20 text-white"
                                  : "text-zinc-300 hover:bg-white/[0.06] hover:text-white",
                              )}
                            >
                              <div className="min-w-0 pr-2">
                                <p
                                  className={cn(
                                    "text-xs leading-snug whitespace-normal break-words",
                                    isSelected
                                      ? "text-blue-400 font-semibold"
                                      : "font-medium group-hover:text-white",
                                  )}
                                >
                                  {opt.label}
                                </p>
                                <p className="mt-0.5 text-[10px] text-zinc-400 whitespace-normal leading-tight">
                                  {opt.desc}
                                </p>
                              </div>
                              {isSelected && (
                                <Check className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {errors.projectType && (
                    <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300"
                  >
                    Inquiry Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 resize-none"
                    placeholder="Outline your architecture scope, scale requirements, or venture partnership..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-500 shadow-sm disabled:opacity-60"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? "Transmitting..." : "Send Direct Message"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Sidebar Information */}
        <div className="lg:col-span-5 space-y-4">
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-white/10 bg-[#111318] p-4 sm:p-6 shadow-lg">
              <h3 className="text-base font-bold text-white">Direct Coordinates</h3>
              <p className="mt-1 text-xs text-zinc-400">Verified communication channels:</p>

              <div className="mt-4 space-y-2.5">
                {/* One click email copy */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-black/30 p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white">Verified Email</div>
                      <div className="font-mono text-xs text-zinc-300 truncate">
                        hello@iamabdullah.dev
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="self-start sm:self-auto flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-300 hover:bg-white/10"
                  >
                    {copiedEmail ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {copiedEmail ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* GitHub */}
                <a
                  href="https://github.com/abdullahalmamun-devv"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/30 p-3 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-200">
                      <Github className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">GitHub</div>
                      <div className="font-mono text-xs text-zinc-400">@abdullahalmamun-devv</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/abdullah-al-mamun-b07295329/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/30 p-3 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">LinkedIn</div>
                      <div className="text-xs text-zinc-400">Abdullah Al Mamun</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                </a>
              </div>

              {/* Timezone & Availability Card */}
              <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/40 p-3.5">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold uppercase text-emerald-400">
                    Location & Response Window
                  </span>
                </div>
                <div className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  Active from{" "}
                  <strong>Dhaka & Chapainawabganj, Bangladesh (Asia/Dhaka, UTC+6)</strong>.
                  Experienced collaborating with global teams across US, Europe, and Asia.
                </div>
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                  Guaranteed response within 24 hours.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
