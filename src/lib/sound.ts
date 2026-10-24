// Simple Web Audio API sound effects
export const Sound = {
  ctx: null as AudioContext | null,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  },
  playTone(freq: number, duration = 0.1, type: OscillatorType = "sine") {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },
  uiClick() {
    this.playTone(880, 0.05, "square");
  },
  powerup() {
    this.playTone(440, 0.15, "sine");
    setTimeout(() => this.playTone(660, 0.1, "sine"), 80);
  },
  success() {
    this.playTone(523, 0.1);
    setTimeout(() => this.playTone(659, 0.1), 100);
    setTimeout(() => this.playTone(784, 0.15), 200);
  },
};
