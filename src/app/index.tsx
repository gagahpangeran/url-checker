import React, { useEffect, useState } from "react";
import { UrlType, getUrlType } from "../utils/url";

const description: Record<UrlType, string> = {
  [UrlType.Empty]: "Please enter a valid URL",
  [UrlType.Invalid]: "Invalid URL",
  [UrlType.File]: "This URL is a file",
  [UrlType.Folder]: "This URL is a folder",
  [UrlType.NotFound]: "This URL does not exist",
  [UrlType.Error]: "There is something wrong"
};

function App() {
  const [url, setUrl] = useState<string>("");
  const [urlState, setUrlState] = useState<UrlType>(UrlType.Empty);

  useEffect(() => {
    const DELAY_TIME = 500;

    const handler = setTimeout(() => {
      const type = getUrlType(url);
      setUrlState(type);
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
