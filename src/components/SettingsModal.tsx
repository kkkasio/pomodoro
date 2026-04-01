import React, { useState, useEffect } from "react";
import type { PresetType, TimerSettings } from "../types";
import { X } from "lucide-react";
import { useStore } from "../store/useStore";

const PRESETS: Record<string, TimerSettings> = {
  Popular: { work: 20 * 60, rest: 5 * 60, long: 15 * 60 },
  Médio: { work: 40 * 60, rest: 8 * 60, long: 20 * 60 },
  Extendido: { work: 60 * 60, rest: 10 * 60, long: 25 * 60 },
};

export const SettingsModal: React.FC = () => {
  const activeOverlay = useStore((s) => s.activeOverlay);
  const setActiveOverlay = useStore((s) => s.setActiveOverlay);
  const storePreset = useStore((s) => s.preset);
  const storeSettings = useStore((s) => s.settings);
  const setSettings = useStore((s) => s.setSettings);

  const [selectedPreset, setSelectedPreset] = useState<PresetType>(storePreset);
  const [customSettings, setCustomSettings] = useState<TimerSettings>(
    storePreset === "Personalizado"
      ? storeSettings
      : { work: 38 * 60, rest: 6 * 60, long: 10 * 60 },
  );

  // Sync local state when modal opens
  useEffect(() => {
    if (activeOverlay === "settings") {
      setSelectedPreset(storePreset);
      if (storePreset === "Personalizado") {
        setCustomSettings(storeSettings);
      }
    }
  }, [activeOverlay, storePreset, storeSettings]);

  if (activeOverlay !== "settings") return null;

  const handleSelect = (preset: PresetType) => {
    setSelectedPreset(preset);
  };

  const handleSliderChange = (key: keyof TimerSettings, value: number) => {
    setCustomSettings((prev) => ({ ...prev, [key]: value * 60 }));
  };

  const handleSave = () => {
    const settingsToSave =
      selectedPreset === "Personalizado"
        ? customSettings
        : PRESETS[selectedPreset]!;
    setSettings(selectedPreset, settingsToSave);
    setActiveOverlay(null);
  };

  return (
    <div className="modal-overlay" onClick={handleSave}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={handleSave}
            style={{ cursor: "pointer" }}
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="modal-title">Tempo de concentração</span>
          <button className="config-btn" onClick={handleSave}>
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        {Object.entries({
          Popular: "20 min pomodoro\n5 min descanso\n15 min longo descanso",
          Médio: "40 min pomodoro\n8 min descanso\n20 min longo descanso",
          Extendido: "60 min pomodoro\n10 min descanso\n25 min longo descanso",
        }).map(([key, desc]) => (
          <div
            className="config-option"
            key={key}
            onClick={() => handleSelect(key as PresetType)}
            style={{ cursor: "pointer" }}
          >
            <input
              type="radio"
              className="config-radio"
              checked={selectedPreset === key}
              readOnly
            />
            <div className="config-details">
              <span className="config-label-text">{key}</span>
              <div className="config-desc" style={{ whiteSpace: "pre-line" }}>
                {desc}
              </div>
            </div>
          </div>
        ))}

        <div
          className="config-option"
          onClick={() => handleSelect("Personalizado")}
          style={{ cursor: "pointer" }}
        >
          <input
            type="radio"
            className="config-radio"
            checked={selectedPreset === "Personalizado"}
            readOnly
          />
          <div className="config-details">
            <span className="config-label-text">Personalizado</span>
            <div
              className="slider-group"
              style={{
                opacity: selectedPreset === "Personalizado" ? 1 : 0.5,
                pointerEvents:
                  selectedPreset === "Personalizado" ? "auto" : "none",
              }}
            >
              <div className="slider-row">
                <div className="slider-info">
                  <span>{customSettings.work / 60} min</span>
                  <span>Pomodoro</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={customSettings.work / 60}
                  onChange={(e) =>
                    handleSliderChange("work", parseInt(e.target.value))
                  }
                />
              </div>

              <div className="slider-row">
                <div className="slider-info">
                  <span>{customSettings.rest / 60} min</span>
                  <span>Descanso</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={customSettings.rest / 60}
                  onChange={(e) =>
                    handleSliderChange("rest", parseInt(e.target.value))
                  }
                />
              </div>

              <div className="slider-row">
                <div className="slider-info">
                  <span>{customSettings.long / 60} min</span>
                  <span>Longo descanso</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={customSettings.long / 60}
                  onChange={(e) =>
                    handleSliderChange("long", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
