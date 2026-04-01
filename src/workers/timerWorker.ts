let intervalId: number | null = null;

self.onmessage = (e: MessageEvent) => {
  const { command } = e.data;

  if (command === "START") {
    if (intervalId) clearInterval(intervalId);
    intervalId = self.setInterval(() => {
      self.postMessage("TICK");
    }, 1000);
  } else if (command === "STOP") {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};
