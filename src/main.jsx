import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { TravelContextProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <TravelContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TravelContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
