import { urlValidator } from "./validator";

describe("Test URL validaator", () => {
  it("should accept valid URL", () => {
    const result = urlValidator("https://gagahpangeran.com/");
    expect(result).toBe(true);
  });

  it("should reject invalid URL", () => {
    const result = urlValidator("something");
    expect(result).toBe(false);
  });
});
