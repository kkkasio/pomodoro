import React from "react";
import { Pause, RotateCcw, Settings } from "lucide-react";
import { useStore } from "../store/useStore";

export const Controls: React.FC = () => {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const startTimer = useStore((s) => s.startTimer);
  const pauseTimer = useStore((s) => s.pauseTimer);
  const resetTimer = useStore((s) => s.resetTimer);
  const running = useStore((s) => s.running);
  const paused = useStore((s) => s.paused);
  const setActiveOverlay = useStore((s) => s.setActiveOverlay);

  return (
    <>
      <div className="modes">
        <button
          className={`mode-btn ${mode === "work" ? "active" : ""}`}
          onClick={() => setMode("work")}
        >
          FOCO
        </button>
        <button
          className={`mode-btn ${mode === "rest" ? "active" : ""}`}
          onClick={() => setMode("rest")}
        >
          PAUSA
        </button>
        <button
          className={`mode-btn ${mode === "long" ? "active" : ""}`}
          onClick={() => setMode("long")}
        >
          LONGA
        </button>
      </div>

      <div className="controls-row">
        <button className="btn-icon" onClick={resetTimer} title="Reiniciar">
          <RotateCcw size={24} />
        </button>

        {!running || paused ? (
          <button className="btn-main" onClick={startTimer}>
            INICIAR
          </button>
        ) : (
          <button className="btn-pause" onClick={pauseTimer}>
            <Pause size={20} fill="currentColor" /> PAUSA
          </button>
        )}

        <button
          className="btn-icon"
          onClick={() => setActiveOverlay("settings")}
          title="Configurações"
        >
          <Settings size={24} />
        </button>
      </div>
    </>
  );
};
