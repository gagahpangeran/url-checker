import React, { useState } from "react";
import { urlValidator } from "../utils/validator";

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
  const [urlState, setUrlState] = useState<UrlState>(UrlState.Idle);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    if (url === "") {
      setUrlState(UrlState.Idle);
      return;
    }

    if (urlValidator(url)) {
      setUrlState(UrlState.NotExist);
    } else {
      setUrlState(UrlState.Invalid);
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">URL Checker</h1>
      <input
        className="app__input"
        type="text"
        placeholder="Enter your URL here"
        onChange={handleOnChange}
      />
      <div className="app__description">{description[urlState]}</div>
    </div>
  );
}

export default App;
