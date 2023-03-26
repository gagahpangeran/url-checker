import { urlValidator } from "./validator";

describe("Test URL validator", () => {
  it("should accept URL starts with https", () => {
    const result = urlValidator("https://gagahpangeran.com/");
    expect(result).toBe(true);
  });

  it("should accept URL starts with http", () => {
    const result = urlValidator("http://gagahpangeran.com/");
    expect(result).toBe(true);
  });

  it("should reject invalid URL", () => {
    const result = urlValidator("something");
    expect(result).toBe(false);
  });

  it("should reject URL other than http or https", () => {
    const result = urlValidator("mailto:gpr@gagahpangeran.com");
    expect(result).toBe(false);
  });
});
