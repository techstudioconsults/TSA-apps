"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Minimal typing for Bunny's player.js (https://docs.bunny.net/docs/playerjs). */
interface PlayerJsPlayer {
  on(event: "ready", cb: () => void): void;
  on(
    event: "timeupdate",
    cb: (data: { seconds: number; duration: number }) => void,
  ): void;
  on(event: "pause" | "ended" | "play", cb: () => void): void;
  setCurrentTime(seconds: number): void;
  off?(event: string): void;
}
declare global {
  interface Window {
    playerjs?: { Player: new (element: HTMLIFrameElement) => PlayerJsPlayer };
  }
}

const SCRIPT_SRC =
  "https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
let scriptPromise: Promise<void> | null = null;

function loadPlayerJs(): Promise<void> {
  if (window.playerjs) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("player.js failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export interface PlayerHandlers {
  onReady?: (player: PlayerJsPlayer) => void;
  onTime?: (seconds: number, duration: number) => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/** Connects to the Bunny iframe. Handlers are read through a ref so they can change freely. */
export function useBunnyPlayer(
  iframeRef: RefObject<HTMLIFrameElement | null>,
  src: string | undefined,
  handlers: PlayerHandlers,
) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !src) return;
    let cancelled = false;
    loadPlayerJs()
      .then(() => {
        if (cancelled || !window.playerjs) return;
        const player = new window.playerjs.Player(iframe);
        player.on("ready", () => {
          if (cancelled) return;
          handlersRef.current.onReady?.(player);
          player.on("timeupdate", (data) =>
            handlersRef.current.onTime?.(data.seconds, data.duration),
          );
          player.on("pause", () => handlersRef.current.onPause?.());
          player.on("ended", () => handlersRef.current.onEnded?.());
        });
      })
      .catch(() => {
        // The video still plays without player.js; only resume and progress are lost
      });
    return () => {
      cancelled = true;
    };
  }, [iframeRef, src]);
}
