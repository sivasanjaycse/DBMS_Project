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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <a href={`/organizer/fdpdetails/` + facultyId + `/` + fdpId}>
            <button className="blue-button">Back</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default OSessionList;
