"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/ui/Icons";

const LABELS: Record<ThemePreference, string> = { dark: "Dark", light: "Light", system: "System" };
const ICONS = { dark: MoonIcon, light: SunIcon, system: MonitorIcon } as const;

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (THEMES as readonly string[]).includes(stored ?? "") ? (stored as ThemePreference) : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyPreference(preference: ThemePreference) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = preference === "dark" || (preference === "system" && prefersDark);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.dataset.theme = preference;
}

/** Dark / Light / System switcher. The preference is persisted in localStorage. */
export function ThemeToggle({ className }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync with the value the inline head script already applied.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreference(readPreference());
  }, []);

  // Follow OS changes while "system" is selected.
  useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyPreference("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = useCallback((next: ThemePreference) => {
    setPreference(next);
    applyPreference(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the choice still applies for this visit.
    }
    setOpen(false);
  }, []);

  const current = preference ?? DEFAULT_THEME;
  const CurrentIcon = ICONS[current];

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Theme: ${LABELS[current]}. Change theme`}
        className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
      >
        <CurrentIcon className="size-4" />
      </button>
      {open && (
        <div
          role="group"
          aria-label="Choose theme"
          className="absolute right-0 top-11 z-50 w-36 overflow-hidden rounded-md border border-border bg-elevated p-1 shadow-lg shadow-black/10"
        >
          {THEMES.map((theme) => {
            const ThemeIcon = ICONS[theme];
            return (
              <button
                key={theme}
                type="button"
                onClick={() => choose(theme)}
                aria-pressed={current === theme}
                className={cn(
                  "flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-subtle",
                  current === theme ? "text-accent" : "text-muted",
                )}
              >
                <ThemeIcon className="size-4" />
                {LABELS[theme]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
