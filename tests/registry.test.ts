import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { NAVIGATION_MATRIX } from "../src/config/allowed-combinations";
import { LOCALES_METADATA } from "../src/i18n/provider";
import type { SupportedLocale } from "../src/i18n/types";

describe("Framework Registry Demo Coverage Test", () => {
  const demoDir = path.resolve(__dirname, "../demo");

  it("every Navigation mode in src/config has a matching demo folder with README.md", () => {
    const navModes = Object.keys(NAVIGATION_MATRIX);

    for (const mode of navModes) {
      const folder = path.join(demoDir, "navigation", mode);
      expect(fs.existsSync(folder), `Missing demo folder for navigation mode: ${mode}`).toBe(true);

      const readme = path.join(folder, "README.md");
      expect(fs.existsSync(readme), `Missing README.md in navigation demo: ${mode}`).toBe(true);
    }
  });

  it("every Layout template has a matching demo folder with README.md", () => {
    const layoutTemplates = [
      "single-pane",
      "master-detail",
      "three-pane",
      "split-info-panel",
      "full-split",
      "object-page",
      "settings-layout",
      "focus-layout",
    ];

    for (const tpl of layoutTemplates) {
      const folder = path.join(demoDir, "layouts", tpl);
      expect(fs.existsSync(folder), `Missing demo folder for layout template: ${tpl}`).toBe(true);

      const readme = path.join(folder, "README.md");
      expect(fs.existsSync(readme), `Missing README.md in layout demo: ${tpl}`).toBe(true);
    }
  });

  it("every feedback topic has a matching demo folder with README.md", () => {
    const topics = [
      "confirm-dialogs",
      "action-bars",
      "states",
      "toasts",
      "popovers",
      "notifications",
    ];

    for (const topic of topics) {
      const folder = path.join(demoDir, "feedback", topic);
      expect(fs.existsSync(folder), `Missing demo folder for feedback topic: ${topic}`).toBe(true);

      const readme = path.join(folder, "README.md");
      expect(fs.existsSync(readme), `Missing README.md in feedback demo: ${topic}`).toBe(true);
    }
  });

  it("every service topic has a matching demo folder with README.md", () => {
    const services = ["i18n-rtl", "permissions", "shortcuts", "url-state"];

    for (const s of services) {
      const folder = path.join(demoDir, "services", s);
      expect(fs.existsSync(folder), `Missing demo folder for service topic: ${s}`).toBe(true);

      const readme = path.join(folder, "README.md");
      expect(fs.existsSync(readme), `Missing README.md in service demo: ${s}`).toBe(true);
    }
  });

  it("realtime operator console demo exists with README.md", () => {
    const folder = path.join(demoDir, "realtime", "operator-console");
    expect(fs.existsSync(folder)).toBe(true);
    expect(fs.existsSync(path.join(folder, "README.md"))).toBe(true);
  });

  it("combined enterprise showcase demo exists with README.md", () => {
    const folder = path.join(demoDir, "combined", "enterprise-showcase");
    expect(fs.existsSync(folder)).toBe(true);
    expect(fs.existsSync(path.join(folder, "README.md"))).toBe(true);
  });

  it("all 5 supported locales have message files in src/i18n/messages/", () => {
    const locales = Object.keys(LOCALES_METADATA) as SupportedLocale[];
    for (const loc of locales) {
      const file = path.resolve(__dirname, `../src/i18n/messages/${loc}.json`);
      expect(fs.existsSync(file), `Missing catalog file for locale: ${loc}`).toBe(true);
    }
  });
});
