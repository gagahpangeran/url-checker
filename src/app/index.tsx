import React, { useEffect, useState } from "react";
import { UrlType, urlChecker, urlValidator } from "../utils/url";

const description: Record<UrlType, string> = {
  [UrlType.Empty]: "Please enter a valid URL",
  [UrlType.Invalid]: "Invalid URL",
  [UrlType.File]: "This URL is a file",
  [UrlType.Folder]: "This URL is a folder",
  [UrlType.NotFound]: "This URL does not exist"
};

function App() {
  const [url, setUrl] = useState<string>("");
  const [urlState, setUrlState] = useState<UrlType>(UrlType.Empty);

  useEffect(() => {
    const DELAY_TIME = 500;

    const handler = setTimeout(() => {
      if (url === "") {
        setUrlState(UrlType.Empty);
        return;
      }

      if (urlValidator(url)) {
        const type = urlChecker(url);
        switch (type) {
          case "file":
            setUrlState(UrlType.File);
            break;

          case "folder":
            setUrlState(UrlType.Folder);
            break;

          case "not found":
            setUrlState(UrlType.NotFound);
            break;

          default:
            setUrlState(UrlType.NotFound);
            break;
        }
      } else {
        setUrlState(UrlType.Invalid);
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
