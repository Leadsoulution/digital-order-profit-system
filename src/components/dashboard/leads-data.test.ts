import { describe, it, expect } from "vitest";
import { whatsappNumber, whatsappHref, telHref } from "./leads-data";

describe("whatsappNumber", () => {
  it("prefixes a local Moroccan number with the country code", () => {
    expect(whatsappNumber("0612345678")).toBe("212612345678");
  });

  it("keeps a number already in international form", () => {
    expect(whatsappNumber("+212 612 345 678")).toBe("212612345678");
  });

  it("strips separators", () => {
    expect(whatsappNumber("06-12-34-56-78")).toBe("212612345678");
  });
});

describe("hrefs", () => {
  it("builds a wa.me link", () => {
    expect(whatsappHref("0612345678")).toBe("https://wa.me/212612345678");
  });

  it("builds a tel: link", () => {
    expect(telHref("06 12 34 56 78")).toBe("tel:0612345678");
  });
});
