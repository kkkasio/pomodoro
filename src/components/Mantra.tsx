import React, { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import frasesData from "../assets/frases.json";
import type { DailyMantra } from "../types";

export const Mantra: React.FC = () => {
  const [mantra, setMantra] = useState<DailyMantra | null>(null);

  useEffect(() => {
    loadMantra();
  }, []);

  const loadMantra = (forceNew = false) => {
    const list = frasesData as DailyMantra[];
    if (!list || list.length === 0) return;

    const todayStr = new Date().toISOString().split("T")[0];

    let savedDaily = null;
    try {
      savedDaily = JSON.parse(localStorage.getItem("daily_mantra") || "null");
    } catch (e) {}

    let usedIds: number[] = [];
    try {
      usedIds = JSON.parse(localStorage.getItem("used_mantras") || "[]");
    } catch (e) {}

    // Reset used list if we exhausted them all
    if (usedIds.length >= list.length) {
      usedIds = [];
    }

    if (!forceNew && savedDaily && savedDaily.date === todayStr) {
      setMantra(savedDaily.mantra);
      return;
    }

    // Pick new unused phrase
    const available = list.filter((m) => !usedIds.includes(m.id));
    const toPickFrom = available.length > 0 ? available : list;
    const chosen = toPickFrom[Math.floor(Math.random() * toPickFrom.length)];

    setMantra(chosen);

    // Save states
    localStorage.setItem(
      "daily_mantra",
      JSON.stringify({ date: todayStr, mantra: chosen }),
    );
    const newUsedIds = Array.from(new Set([...usedIds, chosen.id]));
    localStorage.setItem("used_mantras", JSON.stringify(newUsedIds));
  };

  if (!mantra) return null;

  return (
    <div
      style={{
        maxWidth: 500,
        textAlign: "center",
        fontSize: 14,
        lineHeight: 1.6,
        color: "var(--muted)",
        fontStyle: "italic",
        marginTop: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <span>"{mantra.frase}"</span>
      <button
        onClick={() => loadMantra(true)}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: 6,
          borderRadius: 100,
          transition: "all 0.2s",
        }}
        title="Novo mantra"
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
};
