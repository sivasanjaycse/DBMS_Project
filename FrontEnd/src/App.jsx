import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "/src/pages/generalPages/LoginPage.jsx";
import "./App.css";
import Header from "./pages/generalPages/Header";
import Footer from "./pages/generalPages/Footer";
import FacultyDashboardWrapper from "./pages/generalPages/FacultyDashboardWrapper";
import UpdateFacultyDetails from "./pages/generalPages/UpdateFacultyDetails";
import FacultyRegister from "./pages/generalPages/FacultyRegister";
import FDPRegister from "./pages/fdpPages/FDPRegister";
import FdpList from "./pages/fdpPages/FDPList";
function App() {
  return (
    <>
      <Router>
         <Header /> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/:id" element={<FacultyDashboardWrapper />} />\
          <Route path="/update/:id" element={<UpdateFacultyDetails />} />
          <Route path="/register" element={<FacultyRegister />} />
          <Route path="/fdp-list/:facultyId" element={<FdpList />} />
          <Route path="/fdp/register/:facultyId/:fdpId" element={<FDPRegister />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
