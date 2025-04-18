import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./FacultyDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard({ facultyId }) {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/faculty/${facultyId}`
        );
        setFaculty(res.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch faculty:", err);
      }
    };

    fetchFaculty();
  }, [facultyId]);

  if (loading) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container" id="DashboardContainer">
          <h1 className="heading">
            Welcome, {faculty.name}{" "}
            <FontAwesomeIcon icon={faUserGraduate} className="icon" />
          </h1>

          <table className="faculty-table">
            <tbody>
              <tr>
                <td>Faculty ID:</td>
                <td>{faculty.faculty_id}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{faculty.email}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{faculty.phone}</td>
              </tr>
              <tr>
                <td>Department:</td>
                <td>{faculty.dname}</td>
              </tr>
              <tr>
                <td>College:</td>
                <td>{faculty.college_name}</td>
              </tr>
            </tbody>
          </table>
          <button className="blue-button" onClick={() => navigate(`/update/${facultyId}`)}>
  Change My Details
</button>
        </div>
      </div>
    </>
  );
}
