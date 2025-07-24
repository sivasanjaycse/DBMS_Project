import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./fdp-list-register.css";

const FeedbackForm = () => {
  const { facultyId, fdpId } = useParams();
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://fdpms-webservice.onrender.com/feedback", {
        faculty_id: parseInt(facultyId),
        fdp_id: parseInt(fdpId),
        rating: parseInt(rating),
        comments,
      });

      if (res.data.success) {
        alert("✅ Feedback submitted successfully!");
        setRating("");
        setComments("");
        navigate(`/fdp/completed/${facultyId}`);
      } else {
        setMessage("❌ Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("❌ Already Gave Feedback!");
      navigate(`/fdp/completed/${facultyId}`);
    }
  };

  return (
    <>
      <div className="page">
        <div className="container" id="feedback-container">
          <h2 className="blackText">Give Feedback for FDP</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <label>
              Rating (1 to 5):
              <br />
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
              />
            </label>
            <br />
            <label>
              Comments:
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </label>
            <br />
            <button className="blue-button" type="submit">
              Submit Feedback
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
