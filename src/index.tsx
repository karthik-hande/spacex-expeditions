import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import { Router } from "react-router-dom";

import "./styles/styles.scss";
import history from "./history";
import App from "./App";

ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
  document.getElementById("root") || document.createElement("div")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
