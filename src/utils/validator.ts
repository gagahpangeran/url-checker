export function urlValidator(url: string) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch (err) {
    return false;
  }
}