import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./organizerPage.css";

export default function FundingDetails() {
  const { fdpId } = useParams();
  const navigate = useNavigate();
  const [funding, setFunding] = useState([]);

  useEffect(() => {
    const fetchFunding = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/fdp/${fdpId}/funding`
        );
        setFunding(res.data);
      } catch (err) {
        console.error("Error fetching funding details:", err);
      }
    };

    fetchFunding();
  }, [fdpId]);

  const handleDelete = async (fundingId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/organizer/funding/delete/${fundingId}`);
      alert(res.data.message);
      window.location.reload(); // Reload the page to reflect changes
    } catch (err) {
      console.error("Error deleting funding:", err);
      alert("Delete failed!");
    }
  };

  return (
    <div className="page">
      <div className="container" id="funding-container">
        <h2 className="heading">Funding Details</h2>
        <table className="fdp-list">
          <thead>
            <tr>
              <th>Agency</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {funding.map((f) => (
              <tr key={f.funding_id}>
                <td>{f.funding_agency}</td>
                <td>₹{f.amount}</td>
                <td>
                  <button
                    className="red-button"
                    onClick={() => handleDelete(f.funding_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button className="blue-button" onClick={() => navigate(`/organizer/add-funding/${fdpId}`)}>
          Insert Funding
        </button>
        <button className="blue-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
