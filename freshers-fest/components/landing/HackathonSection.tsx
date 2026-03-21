"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Code2, Trophy, Clock, Users, ArrowRight, Zap } from "lucide-react";
import {
  HACKATHON_DOMAINS,
  JUDGING_CRITERIA,
  HACKATHON_TIMELINE,
} from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";

export default function HackathonSection() {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Particle effect
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
      v: Math.random() * 0.15 + 0.03,
      o: Math.random() * 0.25 + 0.08,
    });

    const init = () => {
      parts = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const count = Math.floor((w * h) / 20000);
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
          p.v = Math.random() * 0.15 + 0.03;
          p.o = Math.random() * 0.25 + 0.08;
        }
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${p.o})`
          : `rgba(0,0,0,${p.o * 0.35})`;
        ctx.fillRect(p.x, p.y, 0.6, 1.6);
      });
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      setSize();
      init();
    });
    ro.observe(canvas.parentElement || document.body);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isDark]);

  const domainIcons = [
    <Zap key="1" className="w-5 h-5" />,
    <Users key="2" className="w-5 h-5" />,
    <Code2 key="3" className="w-5 h-5" />,
    <Trophy key="4" className="w-5 h-5" />,
  ];

  return (
    <section
      id="hackathon"
      className="relative overflow-hidden isolate"
      style={{
        backgroundColor: isDark ? "#0b0b0c" : "#FFF8F0",
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
            top: "12%",
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
            top: "88%",
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
            left: "15%",
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
            left: "85%",
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
            ? "radial-gradient(80% 50% at 50% 20%, rgba(255,77,0,0.04), transparent 60%)"
            : "radial-gradient(80% 50% at 50% 20%, rgba(255,77,0,0.03), transparent 60%)",
        }}
      />

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.35 }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{
              backgroundColor: isDark
                ? "rgba(255,77,0,0.1)"
                : "rgba(255,77,0,0.08)",
              color: "#FF4D00",
              border: `1px solid ${isDark ? "rgba(255,77,0,0.2)" : "rgba(255,77,0,0.15)"}`,
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            April 10, 12:00 PM — April 11, 12:00 PM
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 gradient-text">
            24-Hour Hackathon
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: isDark ? "#a0a0a8" : "#4A4A5A" }}
          >
            Build. Ship. Demo. Four domains, one epic sprint.
          </p>
        </motion.div>

        {/* Domain Cards — 4 in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {HACKATHON_DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
              style={{
                backgroundColor: isDark
                  ? "rgba(24,24,27,0.7)"
                  : "rgba(255,255,255,0.85)",
                border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 0 30px rgba(255,77,0,0.12), 0 16px 48px rgba(0,0,0,0.4)"
                  : "0 0 30px rgba(255,77,0,0.08), 0 16px 48px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = isDark
                  ? "rgba(255,77,0,0.3)"
                  : "rgba(255,77,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = isDark
                  ? "#27272a"
                  : "#F0E0D0";
              }}
            >
              <div className="p-5 flex flex-col flex-1">
                {/* Domain number + icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                      color: isDark ? "#d4d4d8" : "#4A4A5A",
                    }}
                  >
                    {domainIcons[i]}
                  </div>
                  <span
                    className="text-xs font-bold font-heading px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                      color: isDark ? "#71717a" : "#8A8A9A",
                    }}
                  >
                    #{domain.number}
                  </span>
                </div>

                <h3
                  className="font-heading font-bold text-base mb-3"
                  style={{ color: isDark ? "#ffffff" : "#1A1A2E" }}
                >
                  {domain.title}
                </h3>

                <div className="space-y-1.5 flex-1">
                  {domain.areas.map((area) => (
                    <p
                      key={area}
                      className="text-sm flex items-start gap-2"
                      style={{ color: isDark ? "#a0a0a8" : "#4A4A5A" }}
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: isDark ? "#52525b" : "#C0B0A0" }}
                      />
                      {area}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── 24-Hour Journey Timeline — Center Piece ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3
              className="font-heading font-bold text-2xl md:text-3xl flex items-center justify-center gap-3"
              style={{ color: isDark ? "#ffffff" : "#1A1A2E" }}
            >
              <Clock className="w-6 h-6" style={{ color: isDark ? "#d4d4d8" : "#4A4A5A" }} />
              The 24-Hour Journey
            </h3>
          </div>

          {/* Timeline */}
          <div
            className="relative rounded-2xl overflow-hidden p-6 md:p-8"
            style={{
              backgroundColor: isDark
                ? "rgba(24,24,27,0.5)"
                : "rgba(255,255,255,0.7)",
              border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Vertical line */}
            <div
              className="absolute left-8 md:left-10 top-20 bottom-8"
              style={{
                width: "2px",
                background: isDark
                  ? "linear-gradient(to bottom, #FF4D00, #FF4D0033, transparent)"
                  : "linear-gradient(to bottom, #FF4D00, #FF4D0022, transparent)",
              }}
            />

            <div className="space-y-0">
              {HACKATHON_TIMELINE.map((item, i) => {
                const isKeyMoment =
                  item.label.includes("Official Launch") ||
                  item.label.includes("Hackathon Ends") ||
                  item.label.includes("Night");
                const isBreak =
                  item.label.includes("Dinner") ||
                  item.label.includes("Snack");

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-start gap-4 md:gap-6 py-3 group"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isKeyMoment
                            ? "#FF4D00"
                            : isDark
                              ? "rgba(24,24,27,1)"
                              : "rgba(255,255,255,1)",
                          border: isKeyMoment
                            ? "2px solid #FF4D00"
                            : `2px solid ${isDark ? "#3f3f46" : "#E0D0C0"}`,
                          boxShadow: isKeyMoment
                            ? "0 0 12px rgba(255,77,0,0.4)"
                            : "none",
                        }}
                      >
                        {isKeyMoment && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                        {!isKeyMoment && (
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: isDark ? "#52525b" : "#C0B0A0",
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 rounded-xl px-4 py-2.5 -ml-1 transition-all duration-200"
                      style={{
                        backgroundColor: isKeyMoment
                          ? isDark
                            ? "rgba(255,77,0,0.08)"
                            : "rgba(255,77,0,0.05)"
                          : "transparent",
                        borderLeft: isKeyMoment
                          ? "none"
                          : "none",
                      }}
                    >
                      <span
                        className="font-heading font-bold text-sm w-20 shrink-0"
                        style={{
                          color: isKeyMoment
                            ? "#FF4D00"
                            : isDark
                              ? "#F59E0B"
                              : "#E65100",
                        }}
                      >
                        {item.time}
                      </span>
                      <p
                        className="text-sm"
                        style={{
                          color: isKeyMoment
                            ? isDark
                              ? "#ffffff"
                              : "#1A1A2E"
                            : isBreak
                              ? isDark
                                ? "#71717a"
                                : "#8A8A9A"
                              : isDark
                                ? "#d4d4d8"
                                : "#4A4A5A",
                          fontWeight: isKeyMoment ? 600 : 400,
                        }}
                      >
                        {item.label}
                      </p>
                      {isKeyMoment && (
                        <span
                          className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: isDark
                              ? "rgba(255,77,0,0.15)"
                              : "rgba(255,77,0,0.1)",
                            color: "#FF4D00",
                          }}
                        >
                          KEY
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Judging Criteria — Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h3
              className="font-heading font-semibold text-lg flex items-center justify-center gap-2"
              style={{ color: isDark ? "#d4d4d8" : "#1A1A2E" }}
            >
              <Trophy className="w-5 h-5" style={{ color: isDark ? "#d4d4d8" : "#4A4A5A" }} />
              Judging Criteria
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {JUDGING_CRITERIA.map((criteria, i) => (
              <motion.div
                key={criteria.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.65 + i * 0.05 }}
                className="text-center rounded-xl p-4 transition-all duration-200"
                style={{
                  backgroundColor: isDark
                    ? "rgba(24,24,27,0.5)"
                    : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
                }}
              >
                <div
                  className="text-2xl font-heading font-bold mb-1"
                  style={{ color: isDark ? "#ffffff" : "#1A1A2E" }}
                >
                  {criteria.percentage}%
                </div>
                <p
                  className="text-xs leading-tight"
                  style={{ color: isDark ? "#a0a0a8" : "#4A4A5A" }}
                >
                  {criteria.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom info + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center space-y-5"
        >
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
            style={{ color: isDark ? "#a0a0a8" : "#4A4A5A" }}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> 2–5 members per team
            </span>
            <span
              className="hidden sm:inline"
              style={{ color: isDark ? "#3f3f46" : "#E0D0C0" }}
            >
              |
            </span>
            <span>Cross-college teams allowed</span>
            <span
              className="hidden sm:inline"
              style={{ color: isDark ? "#3f3f46" : "#E0D0C0" }}
            >
              |
            </span>
            <span>~500 slots (limited)</span>
          </div>

          <p
            className="text-sm"
            style={{ color: isDark ? "#71717a" : "#8A8A9A" }}
          >
            Hackathon fee: +&#8377;100 &middot; Prizes: Cash + Trophies +
            Internship offers from Gold sponsors
          </p>

          <button
            onClick={() =>
              document
                .getElementById("register")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full gradient-cta text-white font-heading font-semibold hover:opacity-90 transition-all cursor-pointer group pulse-glow"
          >
            Register for Hackathon
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes drawX { to { transform: scaleX(1) } }
        @keyframes drawY { to { transform: scaleY(1) } }
      `}</style>
    </section>
  );
}
