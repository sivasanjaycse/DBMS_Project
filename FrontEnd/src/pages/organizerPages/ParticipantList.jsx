import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ParticipantList = () => {
  const { facultyId, fdpId } = useParams();
  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(
          `https://fdpms-webservice.onrender.com/organizer/${fdpId}/participants`
        );
        setParticipants(res.data.data);
      } catch (err) {
        console.error("Error fetching participants:", err);
      }
    };

    fetchParticipants();
  }, [fdpId]);

  const handleDelete = async (tempfac) => {
    try {
      const res = await axios.delete(
        `https://fdpms-webservice.onrender.com/participation/${tempfac}/${fdpId}`
      );
      alert(res.data.message);
      // Refresh the list after deletion
      setParticipants((prev) => prev.filter((p) => p.faculty_id !== facultyId));
      window.location.reload();
    } catch (err) {
      alert(
        err.response?.data?.message || "Error deleting participation entry"
      );
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="heading">Participants of FDP</h2>
        <table className="fdp-list">
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>College</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.faculty_id}>
                <td>{p.faculty_id}</td>
                <td>{p.name}</td>
                <td>{p.college_name}</td>
                <td>{p.department_name}</td>
                <td>
                  <button
                    className="red-button"
                    onClick={() => handleDelete(p.faculty_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {participants.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No Participants Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <button className="blue-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ParticipantList;
