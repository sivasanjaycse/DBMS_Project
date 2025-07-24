import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import OrganizerNavbar from "./organizerNavbar";

const OCompletedPrograms = () => {
  const { facultyId } = useParams();
  const [fdps, setFdps] = useState([]);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    const fetchCompletedFdps = async () => {
      try {
        const res = await axios.get(
          `https://fdpms-webservice.onrender.com/organizer/coompleted/${facultyId}`
        );
        setFdps(res.data.data);
      } catch (err) {
        console.error("Error fetching completed FDPs:", err);
      }
    };

    fetchCompletedFdps();
  }, [facultyId]);
  const handleIssueCertificates = async (fdpId) => {
    try {
      const res = await axios.get(
        `https://fdpms-webservice.onrender.com/organizer/issue-certificates/${fdpId}`
      );
      alert(res.data.message);
    } catch (error) {
      console.error("Error issuing certificates:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong while issuing certificates.");
      }
    }
  };

  return (
    <>
      <OrganizerNavbar />
      <div className="page">
        <div className="container bigtable" id="og-container">
          <h1 className="heading">Completed FDP Programs</h1>
          <table className="fdp-list">
            <thead>
              <tr>
                <th>FDP ID</th>
                <th>Title</th>
                <th>Participant Count</th>
                <th>More Details</th>
                <th>Funding Agencies</th>
                <th>Certificates</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {fdps.map((fdp) => (
                <tr key={fdp.fdp_id}>
                  <td>{fdp.fdp_id}</td>
                  <td>{fdp.title}</td>
                  <td>{fdp.participation_count}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(
                          `/organizer/fdpdetails/` +
                            facultyId +
                            `/` +
                            fdp.fdp_id
                        );
                      }}
                      className="blue-button"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate("/organizer/funding/" + fdp.fdp_id)
                      }
                      className="blue-button"
                    >
                     View
                    </button>
                  </td>
                  <td>
                    <button
                      className="blue-button"
                      id="myButton"
                      disabled={isDisabled}
                      onClick={() => {
                        handleIssueCertificates(fdp.fdp_id);
                        setIsDisabled(true);
                      }}
                    >
                      Issue
                    </button>
                  </td>
                  <td>
  <button
    className="blue-button"
    onClick={() => navigate(`/organizer/feedback-list/${fdp.fdp_id}`)}
  >
    Feedback
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
};

export default OCompletedPrograms;
