import React from "react";
import ReactDOM from "react-dom";
import Grid from "./Grid";

// class RssApp extends HTMLElement {
//   connectedCallback() {
//     const mountPoint = document.createElement("span");
//     this.attachShadow({ mode: "open" }).appendChild(mountPoint);

//     ReactDOM.render(
//       <React.StrictMode>
//         <Grid />
//       </React.StrictMode>,
//       mountPoint
//     );
//   }
// }
// customElements.define("rss-app", RssApp);

class RssApp extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.appendChild(mountPoint);

    ReactDOM.render(
      <React.StrictMode>
        <Grid />
      </React.StrictMode>,
      mountPoint
    );
  }
}
customElements.define("rss-app", RssApp);
