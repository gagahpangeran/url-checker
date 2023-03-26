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

export function getUrlType(url: string): UrlType {
  if (url === "") {
    return UrlType.Empty;
  }

  const isValid = urlValidator(url);
  if (!isValid) {
    return UrlType.Invalid;
  }

  try {
    const { type } = getUrl(url);
    switch (type) {
      case "file":
        return UrlType.File;

      case "folder":
        return UrlType.Folder;

      default:
        return UrlType.NotFound;
    }
  } catch (err) {
    if (err instanceof Error && err.message === "Not Found") {
      return UrlType.NotFound;
    }
  }

  return UrlType.NotFound;
}
