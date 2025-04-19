import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrganizerNavbar from "./organizerNavbar";
import "./organizerPage.css";
const FdpForm = () => {
  const { facultyId } = useParams();
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [organizingDepartment, setOrganizingDepartment] = useState("");
  const [organizingCollege, setOrganizingCollege] = useState("");
  const [departments, setDepartments] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/departments").then((res) => {
      setDepartments(res.data.departments.map((d) => d.dname));
    });
    axios.get("http://localhost:3000/colleges").then((res) => {
      setColleges(res.data.colleges.map((c) => c.name));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const today = new Date().toISOString().split("T")[0];
    if (startDate <= today) {
      setError("Start date must be in the future.");
      return;
    }

    if (endDate <= startDate) {
      setError("End date must be after start date.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/organizer/insert", {
        title,
        venue,
        startDate,
        endDate,
        organizerId: facultyId,
        organizingDepartment,
        organizingCollege,
      });

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      setError("Failed to insert FDP. Try again.");
    }
  };

  return (
    <>
      <OrganizerNavbar />
      <div className="page">
        <div id="fdp-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Add FDP Program</h2>

            {error && <div>{error}</div>}

            <div className="form-group">
              <label htmlFor="title">FDP Program Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="venue">Venue:</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Venue"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="organizingCollege"
                className="block text-sm font-medium text-gray-700"
              >
                Organizing College:
              </label>
              <select
                value={organizingCollege}
                onChange={(e) => setOrganizingCollege(e.target.value)}
                required
              >
                <option value="">Select College</option>
                {colleges.map((college, i) => (
                  <option key={i} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="organizingDepartment">
                Organizing Department:
              </label>
              <select
                value={organizingDepartment}
                onChange={(e) => setOrganizingDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, i) => (
                  <option key={i} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="blue-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FdpForm;
