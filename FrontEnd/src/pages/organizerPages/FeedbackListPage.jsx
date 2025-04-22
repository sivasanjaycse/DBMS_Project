import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import OrganizerNavbar from "./organizerNavbar";

const FeedbackListPage = () => {
  const { fdpId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/fdp/${fdpId}/feedback`);
        setFeedbackList(res.data.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, [fdpId]);

  return (
    <>
      <OrganizerNavbar />
      <div className="page">
        <div className="container bigtable">
          <h1 className="heading">Feedback Received</h1>
          <table className="fdp-list">
            <thead>
              <tr>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.length === 0 ? (
                <tr>
                  <td colSpan="2">No feedback available.</td>
                </tr>
              ) : (
                feedbackList.map((f, index) => (
                  <tr key={index}>
                    <td>{f.rating}</td>
                    <td>{f.comments}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <br />
          <button className="blue-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedbackListPage;
