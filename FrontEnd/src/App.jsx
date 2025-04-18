import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "/src/pages/generalPages/LoginPage.jsx";
import "./App.css";
import Header from "./pages/generalPages/Header";
import Footer from "./pages/generalPages/Footer";

function App() {
  return (
    <>
     <Router>
        <Header />
        <Routes>
          {/* Route for Intro Page */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
