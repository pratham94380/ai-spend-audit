import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App";

import AuditDetails from "./AuditDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/audit/:auditId" element={<AuditDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
