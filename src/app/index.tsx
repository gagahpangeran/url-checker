import React, { useEffect, useState } from "react";
import { UrlType, getUrlType, validateUrl } from "../utils/url";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (url === "") {
      setUrlState(UrlType.Empty);
      return;
    }

    if (!validateUrl(url)) {
      setUrlState(UrlType.Invalid);
      return;
    }

    const DELAY_TIME = 300;

    setIsLoading(true);

    const handler = setTimeout(async () => {
      const type = await getUrlType(url);
      setUrlState(type);
      setIsLoading(false);
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
      <div className="app__description">
        {isLoading ? (
          <>
            <div className="app__spinner" /> Checking the URL
          </>
        ) : (
          description[urlState]
        )}
      </div>
    </div>
  );
}

export default App;
