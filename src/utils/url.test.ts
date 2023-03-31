import { validateUrl } from "./url";

describe("Test URL validator", () => {
  it("should accept URL starts with https", () => {
    const result = validateUrl("https://gagahpangeran.com/");
    expect(result).toBe(true);
  });

  it("should accept URL starts with http", () => {
    const result = validateUrl("http://gagahpangeran.com/");
    expect(result).toBe(true);
  });

  it("should reject invalid URL", () => {
    const result = validateUrl("something");
    expect(result).toBe(false);
  });

  it("should reject URL other than http or https", () => {
    const result = validateUrl("mailto:gpr@gagahpangeran.com");
    expect(result).toBe(false);
  });
});
