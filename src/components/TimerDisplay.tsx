import React from "react";
import { useStore } from "../store/useStore";

const CIRCUMFERENCE = 2 * Math.PI * 150;

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const COLORS = { work: "#e84393", rest: "#00f0ff", long: "#a78bfa" };
const LABELS = { work: "MODO FOCO", rest: "PAUSA CURTA", long: "PAUSA LONGA" };

export const TimerDisplay: React.FC = () => {
  const mode = useStore((s) => s.mode);
  const remaining = useStore((s) => s.remaining);
  const settings = useStore((s) => s.settings);
  const setActiveOverlay = useStore((s) => s.setActiveOverlay);

  const totalSecs = settings[mode];
  const color = COLORS[mode];
  const modeLabel = LABELS[mode];

  const ratio = totalSecs > 0 ? remaining / totalSecs : 0;
  const offset = CIRCUMFERENCE * (1 - ratio);

  return (
    <div
      className="timer-wrap"
      onClick={() => setActiveOverlay("settings")}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <svg
        className="timer-ring"
        viewBox="0 0 320 320"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 320,
          height: 320,
          pointerEvents: "none",
        }}
      >
        <circle
          cx="160"
          cy="160"
          r="150"
          style={{
            fill: "none",
            stroke: "rgba(255,255,255,0.05)",
            strokeWidth: 3,
          }}
        />
        <circle
          cx="160"
          cy="160"
          r="150"
          style={{
            fill: "none",
            stroke: color,
            strokeWidth: 3,
            strokeLinecap: "round",
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: offset,
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 1s linear, stroke 0.5s",
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      <div
        className="timer-display"
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(96px, 20vw, 140px)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          color: "var(--text)",
          textShadow: `0 0 60px rgba(255,255,255,0.15), 0 0 120px ${color}`,
          padding: "60px 0",
          minWidth: 340,
          textAlign: "center",
          transition: "color 0.3s",
          userSelect: "none",
        }}
      >
        {fmt(remaining)}
      </div>
      <div
        className="mode-label"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: color,
          textShadow: `0 0 20px ${color}`,
          marginTop: -8,
        }}
      >
        {modeLabel}
      </div>
    </div>
  );
};
