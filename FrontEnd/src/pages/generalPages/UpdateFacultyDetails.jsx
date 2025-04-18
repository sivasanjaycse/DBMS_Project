import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateFacultyDetails.css'; 
import Navbar from "./Navbar";
function UpdateFacultyDetails() {
  const { facultyId } = useParams(); // faculty_id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    faculty_id: facultyId,
    name: "",
    phone: "",
    email: "",
    dname: "",
    college_name: "",
    password: "",
  });

  // Load existing details first
  useEffect(() => {
    axios.get(`http://localhost:3000/faculty/${facultyId}`)
      .then((res) => {
        setFormData(res.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching faculty details", err);
      });
  }, [facultyId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/update-faculty", formData);
      if (res.data.success) {
        alert("Updated successfully!");
        navigate(`/dashboard/${facultyId}`);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Server error during update!");
      console.error(err);
    }
  };

  return (
    <> 
    <div className="page">
      <div className="container" id="UpdateContainer">
      <h2 className="blackText">Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <table className="faculty-table">
            <tbody>
        {["name", "phone", "email", "dname", "college_name", "password"].map((field) => (
            <tr>
                <td>{field.charAt(0).toUpperCase() + field.slice(1)}:</td>
          <td>
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData[field] || ""}
            onChange={handleChange}
            className="pro-textbox facUpdate"
            required
            disabled={field === "dname" || field === "college_name"}
            
          />
          </td>
          </tr>
        ))}
        </tbody>
        </table>
        <button type="submit" className="blue-button">Update</button>
      </form>
    </div>
    </div></>
  );
}

export default UpdateFacultyDetails;
