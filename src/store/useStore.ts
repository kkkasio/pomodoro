import { create } from "zustand";
import type { TimerMode, TimerSettings, PresetType } from "../types";

type ActiveOverlay = "settings" | "lofi" | null;

interface AppState {
  // --- UI State ---
  activeOverlay: ActiveOverlay;
  setActiveOverlay: (overlay: ActiveOverlay) => void;
  userName: string;
  setUserName: (name: string) => void;

  // --- Settings ---
  preset: PresetType;
  settings: TimerSettings;
  setSettings: (preset: PresetType, newSettings: TimerSettings) => void;

  // --- Timer State ---
  mode: TimerMode;
  remaining: number;
  running: boolean;
  paused: boolean;
  counts: { work: number; rest: number; long: number };

  // Timer Actions
  setMode: (mode: TimerMode) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useStore = create<AppState>()((set) => ({
  activeOverlay: null,
  setActiveOverlay: (overlay) => set({ activeOverlay: overlay }),

  userName: localStorage.getItem("pomodoro_name") || "1T (T) Kásio",
  setUserName: (name) => {
    localStorage.setItem("pomodoro_name", name);
    set({ userName: name });
  },

  preset: "Popular",
  settings: { work: 20 * 60, rest: 5 * 60, long: 15 * 60 },
  setSettings: (preset, settings) =>
    set((state) => ({
      preset,
      settings,
      remaining:
        !state.running && !state.paused
          ? settings[state.mode]
          : state.remaining,
    })),

  mode: "work",
  remaining: 20 * 60,
  running: false,
  paused: false,
  counts: { work: 0, rest: 0, long: 0 },

  setMode: (mode) =>
    set((state) => ({
      mode,
      running: false,
      paused: false,
      remaining: state.settings[mode],
    })),

  startTimer: () =>
    set((state) => {
      if (state.running && !state.paused) return state; // already running
      return {
        running: true,
        paused: false,
        remaining: state.paused ? state.remaining : state.settings[state.mode],
      };
    }),

  pauseTimer: () =>
    set((state) => {
      if (!state.running) return state;
      return { paused: true };
    }),

  resetTimer: () =>
    set((state) => ({
      running: false,
      paused: false,
      remaining: state.settings[state.mode],
    })),

  tick: () =>
    set((state) => {
      const prev = state.remaining;
      if (prev <= 1) {
        const newCounts = {
          ...state.counts,
          [state.mode]: state.counts[state.mode] + 1,
        };
        return {
          remaining: 0,
          running: false,
          paused: false,
          counts: newCounts,
        };
      }
      return { remaining: prev - 1 };
    }),
}));
