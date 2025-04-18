// File: App.jsx
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
import SessionList from './pages/fdpPages/SessionList'; 
import RegisteredPrograms from './pages/fdpPages/RegisteredPrograms';
import FDPDetails from './pages/fdpPages/FDPDetails';
import OngoingPrograms from './pages/fdpPages/OngoingPrograms';
import CompletedPrograms from './pages/fdpPages/CompletedPrograms';


<Route path="/fdp/ongoing/:facultyId" element={<OngoingPrograms />} />

function App() {
  return (
    <>
      <Router>
         <Header /> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/:facultyId" element={<FacultyDashboardWrapper />} />
          <Route path="/update/:facultyId" element={<UpdateFacultyDetails />} />
          <Route path="/register" element={<FacultyRegister />} />
          <Route path="/fdp-list/:facultyId" element={<FdpList />} />
          <Route path="/fdp/register/:facultyId/:fdpId" element={<FDPRegister />} />   
          <Route path="/fdp/details/:facultyId/:fdpId" element={<FDPDetails />} />  
<Route path="/fdp/session/:facultyId/:fdpId" element={<SessionList />} />
<Route path="/fdp/ongoing/:facultyId" element={<OngoingPrograms />} />
<Route path="/fdp/registered/:facultyId" element={<RegisteredPrograms />} />

<Route path="/fdp/completed/:facultyId" element={<CompletedPrograms />} />


        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
