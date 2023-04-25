import React from "react";
import Home from "./pages/home";
import File from "./pages/file";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/top-bar";

function App() {
  return (
    <div className={"app-layout"}>
      <TopBar />

      <Router basename="/">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/:fileId"} element={<File />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
