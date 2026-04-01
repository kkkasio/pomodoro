import React from "react";
import { Music, X } from "lucide-react";
import { useStore } from "../store/useStore";

export const LofiPlayer: React.FC = () => {
  const activeOverlay = useStore((s) => s.activeOverlay);
  const setActiveOverlay = useStore((s) => s.setActiveOverlay);

  if (activeOverlay !== "lofi") {
    return (
      <button
        onClick={() => setActiveOverlay("lofi")}
        style={{
          position: "fixed",
          bottom: 32,
          right: 40,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--muted)",
          borderRadius: 100,
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 50,
          transition: "all 0.2s",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        title="Lofi Radio"
      >
        <Music size={20} />
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        right: 40,
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
        zIndex: 50,
        width: 320,
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "var(--text)",
            fontWeight: "bold",
            letterSpacing: "0.05em",
          }}
        >
          <Music size={14} /> LOFI RADIO
        </div>
        <button
          onClick={() => setActiveOverlay(null)}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
          }}
        >
          <X size={18} />
        </button>
      </div>
      <iframe
        width="100%"
        height="180"
        src="https://www.youtube.com/embed/jfKfPfyJRdk?enablejsapi=1&autoplay=0"
        title="Lofi Radio"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ display: "block" }}
      ></iframe>
    </div>
  );
};
