import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FundingInsertForm = () => {
  const { facultyId, fdpId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    fundingAgency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fdpms-webservice.onrender.com/organizer/funding/insert",
        {
          amount: formData.amount,
          fundingAgency: formData.fundingAgency,
          fdpId: fdpId,
        }
      );
      alert(res.data.message);
      navigate(-1);
    } catch (err) {
      console.error("Funding insertion error:", err);
      alert("Funding insertion failed!");
    }
  };

  return (
    <div className="page">
      <div id="fdp-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Insert Funding</h2>

          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter funding amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fundingAgency">Funding Agency:</label>
            <input
              type="text"
              name="fundingAgency"
              value={formData.fundingAgency}
              onChange={handleChange}
              placeholder="Enter funding agency name"
              required
            />
          </div>

          <button type="submit" className="blue-button">
            Insert Funding
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundingInsertForm;
