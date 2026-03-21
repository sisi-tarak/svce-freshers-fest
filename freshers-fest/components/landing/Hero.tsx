"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { EVENT_DATE, TICKET_PRICE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { renderCanvas } from "@/components/ui/canvas";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl border flex items-center justify-center glow-orange-subtle"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-default)",
        }}
      >
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="text-xs sm:text-sm mt-2 font-medium uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function AnimatedCounter({ target, label }: { target: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold gradient-text-orange">
        {target}
      </div>
      <div
        className="text-xs sm:text-sm mt-1"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const countdown = useCountdown(EVENT_DATE);
  const { theme } = useTheme();

  // Initialize cursor-trail canvas animation
  useEffect(() => {
    const cleanup = renderCanvas();
    return cleanup;
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* FlickeringGrid background — subtle warm grid */}
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color={theme === "dark" ? "#FF4D00" : "#FF6B2B"}
        maxOpacity={theme === "dark" ? 0.15 : 0.08}
        flickerChance={0.08}
      />

      {/* Cursor-trail canvas — sits on top of grid */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 z-[1]"
      />

      {/* Soft bottom fade */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 60%, var(--bg-primary) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          FRESHERS FEST
          <br />
          <span className="gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            2026
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl mb-2 font-heading"
          style={{ color: "var(--text-secondary)" }}
        >
          Where SVCE Proves It Is Technical. Cultural. Total.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          April 10-11, 2026 | SVCE Campus, Tirupati
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 mb-10"
        >
          <CountdownBox value={countdown.days} label="Days" />
          <span
            className="text-2xl font-bold mt-[-20px]"
            style={{ color: "var(--text-muted)" }}
          >
            :
          </span>
          <CountdownBox value={countdown.hours} label="Hours" />
          <span
            className="text-2xl font-bold mt-[-20px]"
            style={{ color: "var(--text-muted)" }}
          >
            :
          </span>
          <CountdownBox value={countdown.minutes} label="Minutes" />
          <span
            className="text-2xl font-bold mt-[-20px]"
            style={{ color: "var(--text-muted)" }}
          >
            :
          </span>
          <CountdownBox value={countdown.seconds} label="Seconds" />
        </motion.div>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-center mb-16"
        >
          <button
            onClick={() => scrollTo("register")}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full gradient-cta text-white text-lg font-heading font-semibold hover:opacity-90 transition-all cursor-pointer group pulse-glow"
          >
            Register Now — ₹{TICKET_PRICE}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto"
        >
          <AnimatedCounter target="2,700+" label="Expected Footfall" />
          <AnimatedCounter target="150+" label="Organizers" />
          <AnimatedCounter target="24 HRS" label="Hackathon" />
          <AnimatedCounter target="7+" label="Events" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5"
          style={{ borderColor: "var(--text-muted)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
        </motion.div>
      </motion.div>
    </section>
  );
}
