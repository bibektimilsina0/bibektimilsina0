"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const SRC =
  "https://cdn.jsdelivr.net/gh/clashrelated/nepal-relief-banner@1.0.1/banner.min.js";
const INTEGRITY =
  "sha384-ho2P9tyM1ZVoVX96zkFRkCYyJRGoXCjXpSS1a9KFnTyCUXAf1mVz3HAjQJSST1wN";

// The banner reads its data-theme once at load, so it can't follow next-themes
// on its own. Re-run it whenever the resolved theme changes.
export function ReliefBanner() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    window.NepalReliefBanner?.remove();

    let observer: ResizeObserver | undefined;

    const script = document.createElement("script");
    script.src = SRC;
    script.integrity = INTEGRITY;
    script.crossOrigin = "anonymous";
    script.dataset.position = "bottom";
    script.dataset.theme = resolvedTheme === "dark" ? "dark" : "light";

    // The banner is position:fixed at the bottom, so publish its height as a
    // CSS variable and let the page reserve room for it (footer, toasts).
    script.addEventListener("load", () => {
      const el = window.NepalReliefBanner?.element;
      if (!el) return;

      const publish = () => {
        const { height } = el.getBoundingClientRect();
        document.documentElement.style.setProperty(
          "--relief-banner-height",
          `${Math.round(height)}px`,
        );
      };

      publish();
      observer = new ResizeObserver(publish);
      observer.observe(el);
    });

    document.body.appendChild(script);

    return () => {
      observer?.disconnect();
      document.documentElement.style.removeProperty("--relief-banner-height");
      window.NepalReliefBanner?.remove();
      script.remove();
    };
  }, [resolvedTheme]);

  return null;
}
