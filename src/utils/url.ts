import getUrl from "../server/mockServer";

export enum UrlType {
  Empty,
  Invalid,
  File,
  Folder,
  NotFound,
  Error
}

export function urlValidator(url: string) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch (err) {
    return false;
  }
}

export async function getUrlType(url: string) {
  try {
    const { type } = await getUrl(url);

    switch (type) {
      case "file":
        return UrlType.File;

      case "folder":
        return UrlType.Folder;

      default:
        return UrlType.Error;
    }
  } catch (err) {
    if (err instanceof Error && err.message === "Not Found") {
      return UrlType.NotFound;
    }
  }

  return UrlType.Error;
}
