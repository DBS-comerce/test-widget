import React from "react";
import ReactDOM from "react-dom";
import Grid from "./Grid";

class RssApp extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    ReactDOM.render(
      <React.StrictMode>
        <Grid />
      </React.StrictMode>,
      mountPoint
    );
  }
}
customElements.define("rss-app", RssApp);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
