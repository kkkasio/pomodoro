import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { playFocusCompleteSound, playRestCompleteSound } from "../utils/audio";

export function useTimerEngine() {
  const workerRef = useRef<Worker | null>(null);

  const tick = useStore((s) => s.tick);
  const running = useStore((s) => s.running);
  const paused = useStore((s) => s.paused);
  const remaining = useStore((s) => s.remaining);
  const mode = useStore((s) => s.mode);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/timerWorker.ts", import.meta.url),
      { type: "module" },
    );
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (!workerRef.current) return;
    workerRef.current.onmessage = (e) => {
      if (e.data === "TICK") {
        tick();
      }
    };
  }, [tick]);

  const prevRemaining = useRef(remaining);
  // Audio Playback trigger
  useEffect(() => {
    if (prevRemaining.current === 1 && remaining === 0) {
      workerRef.current?.postMessage({ command: "STOP" });
      if (mode === "work") {
        playFocusCompleteSound();
      } else {
        playRestCompleteSound();
      }
    }
    prevRemaining.current = remaining;
  }, [remaining, mode]);

  // Worker controls
  useEffect(() => {
    if (running && !paused) {
      workerRef.current?.postMessage({ command: "START" });
    } else {
      workerRef.current?.postMessage({ command: "STOP" });
    }
  }, [running, paused]);

  // Title effect
  useEffect(() => {
    if (running) {
      const min = Math.floor(remaining / 60);
      const sec = remaining % 60;
      const t = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
      const mStr = mode === "work" ? "Pomodoro" : "Descanso";
      document.title = `${t} ${mStr}`;
    } else {
      document.title = "Pomodoro — Pausável";
    }
  }, [remaining, running, mode]);
}
