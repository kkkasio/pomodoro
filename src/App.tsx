import React from "react";
import { useTimerEngine } from "./hooks/useTimerEngine";
import { TimerDisplay } from "./components/TimerDisplay";
import { Controls } from "./components/Controls";
import { TopBar } from "./components/TopBar";
import { Mantra } from "./components/Mantra";
import { SettingsModal } from "./components/SettingsModal";
import { LofiPlayer } from "./components/LofiPlayer";
import { useStore } from "./store/useStore";

const COLORS = { work: "#e84393", rest: "#00f0ff", long: "#a78bfa" };

function App() {
  useTimerEngine();

  const counts = useStore((s) => s.counts);
  const paused = useStore((s) => s.paused);
  const mode = useStore((s) => s.mode);

  const color = COLORS[mode];

  React.useEffect(() => {
    document.documentElement.style.setProperty("--mode-color", color);
  }, [color]);

  return (
    <>
      <TopBar />

      <div className="container" style={{ gap: 36 }}>
        <div className="stats" style={{ display: "flex", gap: 16 }}>
          <div
            className="stat"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              padding: "10px 24px",
              fontSize: 14,
              letterSpacing: "0.08em",
              color: "var(--muted)",
            }}
          >
            <span
              className="stat-num"
              style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}
            >
              {counts.work}
            </span>{" "}
            pomodoros
          </div>
          <div
            className="stat"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              padding: "10px 24px",
              fontSize: 14,
              letterSpacing: "0.08em",
              color: "var(--muted)",
            }}
          >
            <span
              className="stat-num"
              style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}
            >
              {counts.rest}
            </span>{" "}
            descansos
          </div>
          <div
            className="stat"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              padding: "10px 24px",
              fontSize: 14,
              letterSpacing: "0.08em",
              color: "var(--muted)",
            }}
          >
            <span
              className="stat-num"
              style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}
            >
              {counts.long}
            </span>{" "}
            longos
          </div>
        </div>

        <TimerDisplay />

        <div
          className="pause-banner"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,200,0,0.08)",
            border: "1px solid rgba(255,200,0,0.25)",
            borderRadius: 100,
            padding: "8px 20px",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "#ffcc00",
            opacity: paused ? 1 : 0,
            transform: paused ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.3s",
            pointerEvents: "none",
          }}
        >
          <div
            className="pause-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ffcc00",
              animation: "blink 1s infinite",
            }}
          ></div>
          PAUSADO — pode voltar quando quiser
        </div>

        <Controls />

        <Mantra />
      </div>

      <SettingsModal />
      <LofiPlayer />
    </>
  );
}

export default App;
