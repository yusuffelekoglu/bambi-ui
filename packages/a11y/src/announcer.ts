export type AnnounceOptions = {
  politeness?: "polite" | "assertive";
  /** ms before the announcement is cleared — default 7000 */
  clearAfter?: number;
};

let regionA: HTMLElement | null = null;
let regionB: HTMLElement | null = null;
let toggle = false;

function buildRegion(politeness: "polite" | "assertive"): HTMLElement {
  const el = document.createElement("div");
  el.setAttribute("aria-live", politeness);
  el.setAttribute("aria-atomic", "true");
  return el;
}

function ensureRegions() {
  if (regionA && regionB) return;

  const container = document.createElement("div");
  container.style.cssText =
    "position:absolute;width:1px;height:1px;padding:0;margin:-1px;" +
    "overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";

  regionA = buildRegion("polite");
  regionB = buildRegion("polite");
  container.appendChild(regionA);
  container.appendChild(regionB);
  document.body.appendChild(container);
}

/**
 * Announces a message to screen readers via an aria-live region.
 * Uses a double-buffer rotation so rapid announcements are never dropped.
 */
export function announce(message: string, options: AnnounceOptions = {}) {
  if (typeof document === "undefined") return;

  const { politeness = "polite", clearAfter = 7000 } = options;

  ensureRegions();
  toggle = !toggle;
  const region = (toggle ? regionA : regionB)!;

  region.setAttribute("aria-live", politeness);
  region.textContent = "";

  requestAnimationFrame(() => {
    region.textContent = message;
    if (clearAfter > 0) {
      setTimeout(() => {
        region.textContent = "";
      }, clearAfter);
    }
  });
}
