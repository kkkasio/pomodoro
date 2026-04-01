export type TimerMode = "work" | "rest" | "long";

export interface TimerSettings {
  work: number; // in seconds
  rest: number;
  long: number;
}

export type PresetType = "Popular" | "Médio" | "Extendido" | "Personalizado";

export interface DailyMantra {
  id: number;
  frase: string;
}
