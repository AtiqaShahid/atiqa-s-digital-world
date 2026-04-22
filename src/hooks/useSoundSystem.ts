import { useCallback, useEffect, useRef, useState } from "react";

const createOscillatorSound = (
  ctx: AudioContext,
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine"
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export function useSoundSystem() {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playHover = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 800, 0.08, 0.03, "sine");
    } catch {}
  }, [muted, getCtx]);

  const playClick = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      createOscillatorSound(ctx, 600, 0.1, 0.05, "triangle");
      setTimeout(() => createOscillatorSound(ctx, 900, 0.06, 0.03, "sine"), 30);
    } catch {}
  }, [muted, getCtx]);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  // Attach global hover/click listeners for interactive elements
  useEffect(() => {
    if (muted) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [role='button'], .hover-glow, .glass-panel")) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [role='button']")) {
        playClick();
      }
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [muted, playHover, playClick]);

  return { muted, toggleMute };
}
