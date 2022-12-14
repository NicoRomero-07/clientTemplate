import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Images }from "./pages/Images";
import { MapPage } from "./pages/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wrapper } from "./AppWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/img" element={<Images />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
