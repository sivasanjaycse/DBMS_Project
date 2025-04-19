import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OFDPDetails = () => {
  const { facultyId, fdpId } = useParams();
  const navigate = useNavigate();
  const [fdpDetails, setFdpDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFdpDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/fdp/${fdpId}`);
        if (response.data.success) {
          setFdpDetails(response.data.data);
        } else {
          alert("Failed to fetch FDP details.");
        }
      } catch (error) {
        console.error("Error fetching FDP details:", error);
        alert("An error occurred while fetching FDP details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFdpDetails();
  }, [fdpId]);

  const handleRegister = async () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Loading FDP details...</p>;
  }

  if (!fdpDetails) {
    return <p>No FDP details available.</p>;
  }

  return (
    <>
      <div className="page">
        <div className="container" id="fdp-register-container">
          <h2>FDP Details</h2>
          <table className="faculty-table">
            <tbody>
              <tr>
                <td>
                  <strong>Title</strong>
                </td>
                <td>{fdpDetails.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Venue</strong>
                </td>
                <td>{fdpDetails.venue}</td>
              </tr>
              <tr>
                <td>
                  <strong>Start Date</strong>
                </td>
                <td>{fdpDetails.start_date.split("T")[0]}</td>
              </tr>
              <tr>
                <td>
                  <strong>End Date</strong>
                </td>
                <td>{fdpDetails.end_date.split("T")[0]}</td>
              </tr>
              <tr>
                <td>
                  <strong>Organizing Department</strong>
                </td>
                <td>{fdpDetails.organizing_department}</td>
              </tr>
              <tr>
                <td>
                  <strong>Organizing College</strong>
                </td>
                <td>{fdpDetails.organizing_college}</td>
              </tr>
              <tr>
                <td>
                  <strong>Organizer Name</strong>
                </td>
                <td>{fdpDetails.organizer_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Organizer Phone</strong>
                </td>
                <td>{fdpDetails.organizer_phone}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <button className="blue-button" onClick={handleRegister}>
            Back
          </button>
          <br />
          <br />
          <a href={`/organizer/sessionlist/${facultyId}/${fdpId}`}>
            <button className="blue-button">More Details</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default OFDPDetails;
