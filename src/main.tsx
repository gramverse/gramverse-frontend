import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "@asset/styles/index.css";
import { Toaster } from "./components/toaster.tsx";
import { createPortal } from "react-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {createPortal(<Toaster />, document.body)}
    </BrowserRouter>
  </React.StrictMode>,
);
