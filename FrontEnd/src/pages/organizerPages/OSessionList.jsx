import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OSessionList = () => {
  const { facultyId, fdpId } = useParams();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/fdp/${fdpId}/sessions`)
      .then((res) => {
        if (res.data.success) setSessions(res.data.sessions);
        else console.error("Error loading sessions");
      })
      .catch((err) => {
        console.error("Error fetching session data:", err);
      });
  }, [fdpId]);

  const handleDelete = (sessionId) => {
    if (!window.confirm("Are You Sure to Delete ?")) return;

    axios
      .delete(`http://localhost:3000/organizer/session/delete/${sessionId}`)
      .then((res) => {
        if (res.data.success) {
          alert("Session deleted ✅");
          window.location.reload(); // Reload the page to reflect changes
        } else {
          alert("Deletion failed ❌");
        }
      })
      .catch((err) => {
        console.error("Error deleting session:", err);
        alert("Server error while deleting ❌");
      });
  };

  return (
    <>
      <div className="page">
        <div className="container" id="session-list-container">
          <h2 className="blackText">Sessions</h2>
          {sessions.length === 0 ? (
            <p>No sessions available...</p>
          ) : (
            <table className="fdp-list">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Mode</th>
                  <th>Duration (hrs)</th>
                  <th>Handled By</th>
                  <th>Modify</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={index}>
                    <td>{session.topic}</td>
                    <td>{session.mode}</td>
                    <td>{session.duration}</td>
                    <td>{session.faculty_name}</td>
                    <td>
                      <button
                        className="blue-button"
                        onClick={() => {
                          navigate(
                            "/organizer/update-session/" +
                              facultyId +
                              "/" +
                              fdpId +
                              "/" +
                              session.session_id
                          );
                        }}
                      >
                        Modify
                      </button>
                    </td>
                    <td>
                    <button
                      className="red-button"
                      onClick={() => handleDelete(session.session_id)}
                    >
                      Delete
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <button className="blue-button" onClick={()=>navigate(`/organizer/add-session/${facultyId}/${fdpId}`)}>Add New Session</button>
            <button className="blue-button" onClick={()=>navigate(`/organizer/fdpdetails/` + facultyId + `/` + fdpId)}>Back</button>
        </div>
      </div>
    </>
  );
};

export default OSessionList;
