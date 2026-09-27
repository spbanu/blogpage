export const THEME_STORAGE_KEY = "banu-theme";
export const THEMES = ["dark", "light", "system"] as const;
export type ThemePreference = (typeof THEMES)[number];
export const DEFAULT_THEME: ThemePreference = "dark";

/**
 * Runs before first paint (inlined in <head>) so the correct theme is applied
 * without a flash. Dark is the default when nothing has been stored.
 */
export const themeInitScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}")||"${DEFAULT_THEME}";var d=p==="dark"||(p==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.dataset.theme=p;}catch(e){document.documentElement.classList.add("dark");}})();`;
