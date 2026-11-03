import { describe, it, expect } from "vitest";
import { isAllowedCombination, getAllowedPositions } from "../src/config/allowed-combinations";
import { Z_INDEX } from "../src/config/z-index";

describe("Navigation Configuration & Allowed Combinations Matrix", () => {
  it("sidebar-full allows start and end positions", () => {
    expect(isAllowedCombination("sidebar-full", "start")).toBe(true);
    expect(isAllowedCombination("sidebar-full", "end")).toBe(true);
    expect(isAllowedCombination("sidebar-full", "top")).toBe(false);
    expect(isAllowedCombination("sidebar-full", "bottom")).toBe(false);
  });

  it("topnav allows only top position", () => {
    expect(isAllowedCombination("topnav", "top")).toBe(true);
    expect(isAllowedCombination("topnav", "start")).toBe(false);
    expect(isAllowedCombination("topnav", "end")).toBe(false);
  });

  it("bottom-nav allows bottom position", () => {
    expect(isAllowedCombination("bottom-nav", "bottom")).toBe(true);
  });

  it("getAllowedPositions returns valid array", () => {
    expect(getAllowedPositions("sidebar-rail")).toContain("start");
    expect(getAllowedPositions("sidebar-rail")).toContain("end");
  });

  it("z-index scale maintains correct hierarchy", () => {
    expect(Z_INDEX.nav).toBeLessThan(Z_INDEX.header);
    expect(Z_INDEX.header).toBeLessThan(Z_INDEX.sheet);
    expect(Z_INDEX.sheet).toBeLessThan(Z_INDEX.dialog);
    expect(Z_INDEX.dialog).toBeLessThan(Z_INDEX.popover);
    expect(Z_INDEX.popover).toBeLessThan(Z_INDEX.toast);
    expect(Z_INDEX.toast).toBeLessThan(Z_INDEX.tooltip);
  });
});
