export const OPEN_SEARCH_EVENT = "banu:open-search";

export function openSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
}
