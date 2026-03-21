"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { DAY1_SCHEDULE, DAY2_SCHEDULE } from "@/lib/constants";
import type { ScheduleItem } from "@/types";
import { MapPin, Calendar, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const categoryConfig: Record<
  string,
  { accent: string; label: string }
> = {
  hackathon: { accent: "#FF4D00", label: "Hackathon" },
  tech: { accent: "#F59E0B", label: "Tech" },
  general: { accent: "#FF6B2B", label: "General" },
  break: { accent: "#71717a", label: "Break" },
  cultural: { accent: "#A855F7", label: "Cultural" },
};

function ScheduleCard({
  item,
  index,
  isDark,
}: {
  item: ScheduleItem;
  index: number;
  isDark: boolean;
}) {
  const config = categoryConfig[item.category] || categoryConfig.general;
  const isHighlight =
    item.title.includes("OFFICIAL") ||
    item.title.includes("HACKATHON ENDS") ||
    item.title.includes("MUSICAL") ||
    item.title.includes("Inauguration");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="flex gap-3 md:gap-5 group"
    >
      {/* Left: time column with dot */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div
          className="w-3 h-3 rounded-full z-10 transition-all duration-300"
          style={{
            backgroundColor: isHighlight ? config.accent : "transparent",
            border: `2px solid ${config.accent}`,
            boxShadow: isHighlight
              ? `0 0 10px ${config.accent}44`
              : "none",
          }}
        />
        <div
          className="w-px flex-1 mt-1"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, #27272a, transparent)"
              : "linear-gradient(to bottom, #E0D0C0, transparent)",
          }}
        />
      </div>

      {/* Content card */}
      <div
        className="flex-1 rounded-xl px-4 py-3 mb-2 transition-all duration-200"
        style={{
          backgroundColor: isHighlight
            ? isDark
              ? `${config.accent}0D`
              : `${config.accent}08`
            : "transparent",
          borderLeft: `2px solid ${config.accent}${isHighlight ? "" : "44"}`,
        }}
        onMouseEnter={(e) => {
          if (!isHighlight) {
            e.currentTarget.style.backgroundColor = isDark
              ? "rgba(255,255,255,0.02)"
              : "rgba(0,0,0,0.01)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isHighlight) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span
            className="font-heading font-bold text-sm w-20 shrink-0"
            style={{ color: config.accent }}
          >
            {item.time}
          </span>
          <div className="flex-1">
            <h4
              className="text-sm"
              style={{
                color: isDark ? "#f4f4f5" : "#1A1A2E",
                fontWeight: isHighlight ? 700 : 500,
              }}
            >
              {item.title}
            </h4>
            {item.venue && (
              <p
                className="text-xs mt-0.5 flex items-center gap-1"
                style={{ color: isDark ? "#52525b" : "#8A8A9A" }}
              >
                <MapPin className="w-3 h-3" />
                {item.venue}
              </p>
            )}
          </div>
          <span
            className="hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
            style={{
              backgroundColor: `${config.accent}15`,
              color: config.accent,
            }}
          >
            {config.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("day1");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const schedule = activeDay === "day1" ? DAY1_SCHEDULE : DAY2_SCHEDULE;

  return (
    <section
      id="schedule"
      className="relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "var(--bg-primary)" : "var(--bg-primary)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
      ref={ref}
    >
      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          backgroundColor: isDark
            ? "rgba(255,77,0,0.03)"
            : "rgba(255,77,0,0.02)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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
            <Calendar className="w-3.5 h-3.5" />
            April 10–11, 2026
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 gradient-text"
          >
            The Complete Schedule
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: isDark ? "#a0a0a8" : "#4A4A5A" }}
          >
            Every minute planned. Every moment legendary.
          </p>
        </motion.div>

        {/* Day Tabs — animated pill switcher */}
        <div className="flex justify-center mb-10">
          <div
            className="flex rounded-full p-1 relative"
            style={{
              backgroundColor: isDark
                ? "rgba(24,24,27,0.8)"
                : "rgba(0,0,0,0.04)",
              border: `1px solid ${isDark ? "#27272a" : "#F0E0D0"}`,
            }}
          >
            {[
              { id: "day1", label: "Day 1 — Technology" },
              { id: "day2", label: "Day 2 — Celebration" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDay(tab.id)}
                className="relative px-5 md:px-6 py-2.5 text-sm font-heading font-semibold rounded-full transition-colors duration-300 cursor-pointer z-10"
                style={{
                  color:
                    activeDay === tab.id
                      ? "#ffffff"
                      : isDark
                        ? "#a0a0a8"
                        : "#4A4A5A",
                }}
              >
                {activeDay === tab.id && (
                  <motion.div
                    layoutId="schedule-tab"
                    className="absolute inset-0 rounded-full gradient-cta"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-8 text-xs"
          style={{ color: isDark ? "#71717a" : "#8A8A9A" }}
        >
          {Object.entries(categoryConfig).map(([key, config]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: config.accent }}
              />
              {config.label}
            </span>
          ))}
        </div>

        {/* Schedule entries */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl overflow-hidden p-4 md:p-6"
            style={{
              backgroundColor: isDark
                ? "rgba(17,17,19,0.5)"
                : "rgba(255,255,255,0.6)",
              border: `1px solid ${isDark ? "#1a1a1f" : "#F0E0D0"}`,
            }}
          >
            {schedule.map((item, i) => (
              <ScheduleCard
                key={`${activeDay}-${i}`}
                item={item}
                index={i}
                isDark={isDark}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p
            className="text-xs flex items-center justify-center gap-1.5"
            style={{ color: isDark ? "#52525b" : "#8A8A9A" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Schedule subject to minor changes. All times IST.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
