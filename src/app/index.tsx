import React from "react";
import logo from "../assets/logo.jpg";

function App() {
  return (
    <div className="app">
      <img className="app__logo" src={logo} alt="gpr" />
      <h1 className="app__title">GPR's CRA Template</h1>
      <a
        className="app__link"
        href="https://github.com/gagahpangeran/gpr-cra"
        target="_blank"
        rel="nofollow noreferrer"
      >
        Use this template on Github
      </a>
    </div>
  );
}

export default App;
