import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Container } from "reactstrap";

import  {Spinner} from "./components/Spinner/Spinner";
import NavBar from   "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {Images} from "./pages/Images";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import { MapPage } from "./pages/Map";

initFontAwesome();

const App = () => {
  const { isSpinner, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isSpinner) {
    return <Spinner />;
  }

  return (
    <BrowserRouter history= {history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/map" element={<MapPage/>} />
            <Route path="/img" element={<Images/>} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
      </div>
    </ BrowserRouter>
  );
};

export default App;
