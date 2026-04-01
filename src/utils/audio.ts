export function playFocusCompleteSound() {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Energetic rising arpeggio (Work -> Rest)
    const playNote = (
      time: number,
      freq: number,
      type: OscillatorType = "sine",
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.3, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.4);
    };

    const now = ctx.currentTime;
    playNote(now, 523.25, "triangle");
    playNote(now + 0.15, 659.25, "triangle");
    playNote(now + 0.3, 783.99, "triangle");
    playNote(now + 0.45, 1046.5, "triangle");
  } catch (e) {
    console.error("Audio playback failed", e);
  }
}

export function playRestCompleteSound() {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Classic alarm clock beep (Rest -> Work)
    const playBeep = (time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 880;

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.3, time + 0.02);
      gain.gain.setValueAtTime(0.3, time + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.15);
    };

    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      playBeep(now + i * 0.2);
    }
    for (let i = 0; i < 4; i++) {
      playBeep(now + 1.2 + i * 0.2);
    }
  } catch (e) {
    console.error("Audio playback failed", e);
  }
}
