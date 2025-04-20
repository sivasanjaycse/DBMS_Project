import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SessionUpdateForm = () => {
  const { facultyId, fdpId, sessId } = useParams();

  const [formData, setFormData] = useState({
    topic: "",
    mode: "",
    duration: "",
    handlingFacultyId: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/organizer/session/${sessId}`)
      .then((res) => {
        const data = res.data.data;

        // 🎯 FILLING DEFAULT VALUES FROM DB RESPONSE
        setFormData({
          topic: data.topic || "",
          mode: data.mode || "",
          duration: data.duration || "",
          handlingFacultyId: data.handling_fac_id || "",
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [sessId]);

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
      const res = await axios.put(
        `http://localhost:3000/organizer/session/update/${sessId}`,
        {
          topic: formData.topic,
          mode: formData.mode,
          duration: formData.duration,
          facultyId: formData.handlingFacultyId,
        }
      );
      alert(res.data.message);
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="page">
      <div id="fdp-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Update Session</h2>

          <div className="form-group">
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Session Topic"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mode">Mode:</label>
            <input
              type="text"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              placeholder="Online/Offline"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ex: 2 Hours"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="handlingFacultyId">Handling Faculty ID:</label>
            <input
              type="text"
              name="handlingFacultyId"
              value={formData.handlingFacultyId}
              onChange={handleChange}
              placeholder="Faculty ID"
              required
            />
          </div>

          <button type="submit" className="blue-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionUpdateForm;
