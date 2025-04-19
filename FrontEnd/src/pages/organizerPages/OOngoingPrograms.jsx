import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import OrganizerNavbar from "./organizerNavbar";

const OOngoingPrograms = () => {
  const { facultyId } = useParams();
  const [fdps, setFdps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOngoing = async () => {
      try {
        console.log(
          `Sending request to fetch ongoing FDPs for facultyId: ${facultyId}`
        );
        const res = await axios.get(
          `http://localhost:3000/fdp/oongoing/${facultyId}`
        );
        console.log("Response received:", res.data);
        setFdps(res.data.data);
      } catch (err) {
        console.error("Error fetching ongoing FDPs:", err);
      }
    };

    fetchOngoing();
  }, [facultyId]);

  return (
    <>
      <OrganizerNavbar />
      <div className="page">
        <div className="container bigtable">
          <h1 className="heading">Ongoing FDP Programs</h1>
          <table className="fdp-list">
            <tbody>
              <tr>
                <td>FDP ID</td>
                <td>FDP Name</td>
                <td>Participants</td>
                <td>More Details</td>
                <td>Funding Agencies</td>
                <td>View Participants</td>
              </tr>
              {fdps.map((fdp, idx) => (
                <tr key={idx}>
                  <td>{fdp.fdp_id}</td>
                  <td>{fdp.fdp_title}</td>
                  <td>{fdp.participant_count}</td>
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
                      onClick={() =>
                        navigate(
                          "/organizer/participant-list/" +
                            facultyId +
                            "/" +
                            fdp.fdp_id
                        )
                      }
                      className="blue-button"
                    >
                      View
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

export default OOngoingPrograms;
