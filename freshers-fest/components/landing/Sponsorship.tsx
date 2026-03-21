"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { SPONSOR_TIERS, FOOD_STALL_TIERS } from "@/lib/constants";
import { CircleCheck, Mail, UtensilsCrossed, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Sponsorship() {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Rising particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let parts: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
      y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
      v: Math.random() * 0.2 + 0.03,
      o: Math.random() * 0.3 + 0.1,
    });

    const init = () => {
      parts = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) parts.push(make());
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 40;
          p.v = Math.random() * 0.2 + 0.03;
          p.o = Math.random() * 0.3 + 0.1;
        }
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${p.o})`
          : `rgba(0,0,0,${p.o * 0.4})`;
        ctx.fillRect(p.x, p.y, 0.6, 1.8);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement || document.body);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isDark]);

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden isolate"
      style={{
        backgroundColor: isDark ? "#0b0b0c" : "#FFF8F0",
        color: isDark ? "#f6f7f8" : "var(--text-primary)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
      ref={ref}
    >
      {/* Accent grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.5 }}
      >
        <div
          className="absolute left-0 right-0"
          style={{
            top: "18%",
            height: "1px",
            background: isDark ? "#27272a" : "rgba(240,224,208,0.6)",
            transformOrigin: "50% 50%",
            animation: "drawX 0.6s ease 0.08s forwards",
            transform: "scaleX(0)",
          }}
        />
        <div
          className="absolute left-0 right-0"
          style={{
            top: "82%",
            height: "1px",
            background: isDark ? "#27272a" : "rgba(240,224,208,0.6)",
            transformOrigin: "50% 50%",
            animation: "drawX 0.6s ease 0.24s forwards",
            transform: "scaleX(0)",
          }}
        />
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "20%",
            width: "1px",
            background: isDark ? "#27272a" : "rgba(240,224,208,0.6)",
            transformOrigin: "50% 0%",
            animation: "drawY 0.7s ease 0.2s forwards",
            transform: "scaleY(0)",
          }}
        />
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "80%",
            width: "1px",
            background: isDark ? "#27272a" : "rgba(240,224,208,0.6)",
            transformOrigin: "50% 0%",
            animation: "drawY 0.7s ease 0.36s forwards",
            transform: "scaleY(0)",
          }}
        />
      </div>

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(80% 60% at 50% 15%, rgba(255,255,255,0.04), transparent 60%)"
            : "radial-gradient(80% 60% at 50% 15%, rgba(255,77,0,0.03), transparent 60%)",
        }}
      />

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 gradient-text"
          >
            Partner With Us
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: isDark ? "#a0a0a8" : "#4A4A5A" }}
          >
            Three tiers. Unlimited visibility.
          </p>
        </motion.div>

        {/* Sponsor Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SPONSOR_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
              style={{
                backgroundColor: isDark
                  ? "rgba(24,24,27,0.7)"
                  : "rgba(255,255,255,0.85)",
                border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = isDark
                  ? `0 0 40px ${tier.color}22, 0 20px 60px rgba(0,0,0,0.4)`
                  : `0 0 40px ${tier.color}15, 0 20px 60px rgba(0,0,0,0.08)`;
                e.currentTarget.style.borderColor = `${tier.color}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = isDark
                  ? "#27272a"
                  : "#F0E0D0";
              }}
            >
              {/* Top gradient bar */}
              {/* <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, ${tier.color}, ${tier.color}66)`,
                }}
              /> */}

              <div className="p-7 flex flex-col flex-1">
                {/* Tier badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold w-fit mb-4"
                  style={{
                    backgroundColor: `${tier.color}15`,
                    color: tier.color,
                    border: `1px solid ${tier.color}30`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  {tier.name} Sponsor
                </div>

                {/* Price */}
                <p
                  className="text-3xl font-heading font-bold mb-6"
                  style={{ color: isDark ? "#ffffff" : "#1A1A2E" }}
                >
                  {tier.priceRange}
                </p>

                {/* Separator */}
                <div
                  className="h-px w-full mb-6"
                  style={{
                    background: isDark
                      ? "linear-gradient(to right, #27272a, transparent)"
                      : "linear-gradient(to right, #F0E0D0, transparent)",
                  }}
                />

                {/* Benefits */}
                <ul className="space-y-3.5 flex-1">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: isDark ? "#d4d4d8" : "#4A4A5A" }}
                    >
                      <CircleCheck
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: tier.color }}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-8">
                  <a href="mailto:gdsc@svce.edu.in?subject=Sponsorship%20Inquiry%20-%20Freshers%20Fest%202026">
                    <button
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-heading font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.04)",
                        color: isDark ? "#f4f4f5" : "#1A1A2E",
                        border: `1px solid ${isDark ? "#3f3f46" : "#E0D0C0"}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${tier.color}18`;
                        e.currentTarget.style.borderColor = `${tier.color}50`;
                        e.currentTarget.style.color = tier.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.04)";
                        e.currentTarget.style.borderColor = isDark
                          ? "#3f3f46"
                          : "#E0D0C0";
                        e.currentTarget.style.color = isDark
                          ? "#f4f4f5"
                          : "#1A1A2E";
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Get in Touch
                      <ArrowRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Food Stall Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="rounded-2xl overflow-hidden max-w-3xl mx-auto"
          style={{
            backgroundColor: isDark
              ? "rgba(24,24,27,0.6)"
              : "rgba(255,255,255,0.8)",
            border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* <div className="h-1 gradient-cta" /> */}

          <div className="p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,77,0,0.1)"
                    : "rgba(255,77,0,0.08)",
                }}
              >
                <UtensilsCrossed className="w-5 h-5 text-accent-orange" />
              </div>
              <h3
                className="font-heading font-bold text-xl"
                style={{ color: isDark ? "#ffffff" : "#1A1A2E" }}
              >
                Food Stall Sponsorship
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {FOOD_STALL_TIERS.map((stall) => (
                <div
                  key={stall.name}
                  className="text-center p-5 rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.02)",
                    border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDark
                      ? "rgba(255,77,0,0.3)"
                      : "rgba(255,77,0,0.2)";
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(255,77,0,0.05)"
                      : "rgba(255,77,0,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark
                      ? "#27272a"
                      : "#F0E0D0";
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.02)";
                  }}
                >
                  <p className="font-heading font-bold text-accent-orange text-lg">
                    {stall.price}
                  </p>
                  <p
                    className="text-sm font-semibold mt-1.5"
                    style={{ color: isDark ? "#f4f4f5" : "#1A1A2E" }}
                  >
                    {stall.name}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: isDark ? "#71717a" : "#8A8A9A" }}
                  >
                    {stall.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="mailto:gdsc@svce.edu.in?subject=Food%20Stall%20Sponsorship">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-heading font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                    color: isDark ? "#f4f4f5" : "#1A1A2E",
                    border: `1px solid ${isDark ? "#3f3f46" : "#E0D0C0"}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(255,77,0,0.12)"
                      : "rgba(255,77,0,0.08)";
                    e.currentTarget.style.borderColor = isDark
                      ? "rgba(255,77,0,0.4)"
                      : "rgba(255,77,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = isDark
                      ? "#3f3f46"
                      : "#E0D0C0";
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Contact GDG SVCE
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS for accent line animations */}
      <style>{`
        @keyframes drawX { to { transform: scaleX(1) } }
        @keyframes drawY { to { transform: scaleY(1) } }
      `}</style>
    </section>
  );
}
