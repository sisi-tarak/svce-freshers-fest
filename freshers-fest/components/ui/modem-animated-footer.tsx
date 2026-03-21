"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface NavLink {
  label: string;
  id: string;
}

interface AnimatedFooterProps {
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
  creatorName: string;
  brandIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function AnimatedFooter({
  brandName,
  brandDescription,
  socialLinks,
  navLinks,
  creatorName,
  brandIcon,
  children,
}: AnimatedFooterProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      {/* Subtle top separator — gradient line, not a solid border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border-default), transparent)",
        }}
      />

      {/* Main footer content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-14 pb-8">
        {/* Top section: Brand + Nav + Social */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand column — logo + description only, NO brandName heading */}
          <div className="md:col-span-5">
            {brandIcon && <div className="mb-4">{brandIcon}</div>}
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {brandDescription}
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-default)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--accent-orange, #FF4D00)";
                    e.currentTarget.style.borderColor = isDark
                      ? "rgba(255, 77, 0, 0.3)"
                      : "rgba(230, 81, 0, 0.3)";
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(255, 77, 0, 0.08)"
                      : "rgba(230, 81, 0, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--border-default)";
                    e.currentTarget.style.backgroundColor =
                      "var(--bg-tertiary)";
                  }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links column */}
          <div className="md:col-span-3">
            <h4
              className="font-heading font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-left transition-all duration-200 cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Children slot (contact info, etc.) */}
          <div className="md:col-span-4">{children}</div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border-default), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 SVCE Freshers Fest. Organized by GDG Team, SVCE Tirupati.
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--text-muted)" }}
          >
            Built with{" "}
            <span className="text-accent-orange inline-block animate-pulse">
              ♥
            </span>{" "}
            by {creatorName}
          </p>
        </div>
      </div>

      {/* ─── Large Faded Background Text — pale orange ─── */}
      <div className="relative z-0 -mt-16 overflow-hidden select-none pointer-events-none">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center font-heading font-black leading-none"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              backgroundImage: isDark
                ? "linear-gradient(to bottom, rgba(255, 158, 11, 0.7), rgba(255, 158, 11, 0))"
                : "linear-gradient(to bottom, rgba(230, 81, 0, 0.6), rgba(230, 81, 0, 0))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: isDark ? 0.1 : 0.15,
            }}
          >
            {brandName}
          </div>
        </div>
      </div>
    </footer>
  );
}
