import React, { useEffect, useState } from "react";
import { urlChecker, urlValidator } from "../utils/url";

enum UrlState {
  Idle,
  Invalid,
  File,
  Folder,
  NotFound
}

const description: Record<UrlState, string> = {
  [UrlState.Idle]: "Please enter a valid URL",
  [UrlState.Invalid]: "Invalid URL",
  [UrlState.File]: "This URL is a file",
  [UrlState.Folder]: "This URL is a folder",
  [UrlState.NotFound]: "This URL does not exist"
};

function App() {
  const [url, setUrl] = useState<string>("");
  const [urlState, setUrlState] = useState<UrlState>(UrlState.Idle);

  useEffect(() => {
    const DELAY_TIME = 500;

    const handler = setTimeout(() => {
      if (url === "") {
        setUrlState(UrlState.Idle);
        return;
      }

      if (urlValidator(url)) {
        const type = urlChecker(url);
        switch (type) {
          case "file":
            setUrlState(UrlState.File);
            break;

          case "folder":
            setUrlState(UrlState.Folder);
            break;

          case "not found":
            setUrlState(UrlState.NotFound);
            break;

          default:
            setUrlState(UrlState.NotFound);
            break;
        }
      } else {
        setUrlState(UrlState.Invalid);
      }
    }, DELAY_TIME);

    return () => {
      clearTimeout(handler);
    };
  }, [url]);

  return (
    <div className="app">
      <h1 className="app__title">URL Checker</h1>
      <input
        className="app__input"
        type="text"
        placeholder="Enter your URL here"
        onChange={e => setUrl(e.target.value)}
      />
      <div className="app__description">{description[urlState]}</div>
    </div>
  );
}

export default App;
