import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GymPage from "./components/GymPage";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gym/:id" element={<GymPage />} />
      </Routes>
    </Router>
  );
};

export default App;
