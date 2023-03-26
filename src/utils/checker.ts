import getUrl from "../server/mockServer";

type ResultType = "file" | "folder" | "not found" | undefined;

export default function urlChecker(url: string): ResultType {
  try {
    const { type } = getUrl(url);
    return type;
  } catch (err) {
    if (err instanceof Error && err.message === "Not Found") {
      return "not found";
    }
  }
}
