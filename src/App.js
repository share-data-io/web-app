import React from "react";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/top-bar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={"app-layout"}>
      <TopBar />

      <Router basename="/">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
