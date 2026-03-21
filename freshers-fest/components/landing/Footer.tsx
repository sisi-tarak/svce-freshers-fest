"use client";

import {
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { AnimatedFooter } from "@/components/ui/modem-animated-footer";
import { useTheme } from "@/hooks/useTheme";

const SOCIAL_LINKS = [
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://instagram.com/SVCETirupati",
    label: "Instagram",
  },
  {
    icon: <Youtube className="w-5 h-5" />,
    href: "#",
    label: "YouTube",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:gdsc@svce.edu.in",
    label: "Email",
  },
];

const NAV_LINKS = [
  { label: "Events", id: "events" },
  { label: "Hackathon", id: "hackathon" },
  { label: "Schedule", id: "schedule" },
  { label: "Speakers", id: "speakers" },
  { label: "Sponsors", id: "sponsors" },
  { label: "FAQ", id: "faq" },
  { label: "Register", id: "register" },
];

function ContactLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-start gap-2 text-sm transition-colors duration-200"
      style={{ color: "var(--text-secondary)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--text-primary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--text-secondary)")
      }
    >
      {icon}
      {children}
    </a>
  );
}

function FooterLogo() {
  const { theme } = useTheme();
  return (
    <img
      src={theme === "dark" ? "/svcelogo.png" : "/svcelogo-dark.png"}
      alt="SVCE Tirupati"
      className="h-16 w-auto"
    />
  );
}

export default function Footer() {
  return (
    <AnimatedFooter
      brandName="SVCE FRESHERS FEST"
      brandDescription="Where SVCE Proves It Is Technical. Cultural. Total. April 10-11, 2026 — two days of hackathons, workshops, exhibitions, music, and everything in between."
      socialLinks={SOCIAL_LINKS}
      navLinks={NAV_LINKS}
      creatorName="GDG Team @ SVCE Tirupati"
      brandIcon={<FooterLogo />}
    >
      {/* Contact Info */}
      <div>
        <h4
          className="font-heading font-semibold text-sm uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Contact & Venue
        </h4>
        <div className="space-y-3">
          <ContactLink
            href="https://maps.google.com/?q=SVCE+Tirupati"
            icon={<MapPin className="w-4 h-4 shrink-0 mt-0.5" />}
          >
            SVCE Campus, Tirupati, Andhra Pradesh
          </ContactLink>
          <ContactLink
            href="mailto:gdsc@svce.edu.in"
            icon={<Mail className="w-4 h-4 shrink-0" />}
          >
            gdsc@svce.edu.in
          </ContactLink>
          <ContactLink
            href="tel:+919876543210"
            icon={<Phone className="w-4 h-4 shrink-0" />}
          >
            +91 98765 43210
          </ContactLink>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Overall Event Lead:{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              Sisindri Singamsetti
            </span>
          </p>
          <p
            className="text-xs font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            #SVCEFreshersFest2026
          </p>
        </div>
      </div>
    </AnimatedFooter>
  );
}
