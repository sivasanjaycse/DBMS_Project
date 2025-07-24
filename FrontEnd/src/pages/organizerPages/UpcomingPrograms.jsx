import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import OrganizerNavbar from "./organizerNavbar";

export default function UpcomingPrograms() {
  const { facultyId } = useParams();
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(
          `https://fdpms-webservice.onrender.com/fdp/upcoming/${facultyId}`
        );
        if (res.data.success) {
          setPrograms(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching upcoming FDPs:", err);
      }
    };

    fetchPrograms();
  }, [facultyId]);
  const transferToParticipation = async (fdpId) => {
    try {
      const res = await axios.post(
        `https://fdpms-webservice.onrender.com/transfer-to-participation/${fdpId}`
      );
      if (res.data.success) {
        alert(`✅ ${res.data.message}`);
      } else {
        alert(`⚠️ ${res.data.message}`);
      }
      window.location.reload();
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("❌ Server error during transfer.");
    }
  };
  return (
    <>
      <OrganizerNavbar />
      <div className="page">
        <div className="container bigtable">
          <h2 className="heading">Upcoming FDPs</h2>
          <table className="fdp-list">
            <thead>
              <tr>
                <th>FDP Name</th>
                <th>Registered Count</th>
                <th>More Details</th>
                <th>Funding Agencies</th>
                <th>Transfer Registrations</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((fdp) => (
                <tr key={fdp.fdp_id}>
                  <td>{fdp.fdp_name}</td>
                  <td>{fdp.registered_count}</td>
                  <td>
                    <button
                      className="blue-button"
                      onClick={() => {
                        navigate(
                          `/organizer/fdpdetails/` +
                            facultyId +
                            `/` +
                            fdp.fdp_id
                        );
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="blue-button"
                      onClick={() => {
                        navigate("/organizer/funding/" + fdp.fdp_id);
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="blue-button"
                      onClick={() => transferToParticipation(fdp.fdp_id)}
                    >
                      Transfer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
