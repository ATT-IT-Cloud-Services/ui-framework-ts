import { describe, it, expect } from "vitest";
import enMessages from "../src/i18n/messages/en.json";
import deMessages from "../src/i18n/messages/de.json";
import frMessages from "../src/i18n/messages/fr.json";
import esMessages from "../src/i18n/messages/es.json";
import arMessages from "../src/i18n/messages/ar.json";

describe("I18n Catalogs Parity Test", () => {
  const enKeys = Object.keys(enMessages).sort();

  it("English catalog has non-empty keys", () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  it("German catalog matches English keys exactly", () => {
    const deKeys = Object.keys(deMessages).sort();
    expect(deKeys).toEqual(enKeys);
  });

  it("French catalog matches English keys exactly", () => {
    const frKeys = Object.keys(frMessages).sort();
    expect(frKeys).toEqual(enKeys);
  });

  it("Spanish catalog matches English keys exactly", () => {
    const esKeys = Object.keys(esMessages).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it("Arabic catalog matches English keys exactly", () => {
    const arKeys = Object.keys(arMessages).sort();
    expect(arKeys).toEqual(enKeys);
  });
});
