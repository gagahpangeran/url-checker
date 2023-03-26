import getUrl from "../server/mockServer";

export enum UrlType {
  Empty,
  Invalid,
  File,
  Folder,
  NotFound
}

export function urlValidator(url: string) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch (err) {
    return false;
  }
}

type ResultType = "file" | "folder" | "not found" | undefined;

export function urlChecker(url: string): ResultType {
  try {
    const { type } = getUrl(url);
    return type;
  } catch (err) {
    if (err instanceof Error && err.message === "Not Found") {
      return "not found";
    }
  }
}
