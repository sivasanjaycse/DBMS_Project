import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const SessionUpdateForm = () => {
  const { facultyId, fdpId, sessId } = useParams();
  const [facultyList, setFacultyList] = useState([]);
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: "",
    mode: "",
    duration: "",
    handlingFacultyId: "",
  });
  useEffect(() => {
    // Fetch the department based on fdpId
    axios
      .get(`https://fdpms-webservice.onrender.com/organizer/fdp-department/${fdpId}`)
      .then((res) => {
        if (res.data.success) {
          setDepartment(res.data.department); // Set department
        } else {
          console.log("Department not found for this FDP");
        }
      })
      .catch((err) => {
        console.error("Error fetching department:", err);
      });
  }, [fdpId]);
  useEffect(() => {
    axios
      .get(`https://fdpms-webservice.onrender.com/organizer/session/${sessId}`)
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

  useEffect(() => {
    if (department) {
      // Fetch faculty list based on department once the department is set
      axios
        .get(`https://fdpms-webservice.onrender.com/faculty/by-department/${department}`)
        .then((res) => {
          if (res.data.success) {
            setFacultyList(res.data.faculty); // Set the list of faculty from response
          } else {
            console.log("No faculty found for this department");
          }

        })
        .catch((err) => {
          console.error("Error fetching faculty:", err);
        });
    }
  }, [department]);


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
        `https://fdpms-webservice.onrender.com/organizer/session/update/${sessId}`,
        {
          topic: formData.topic,
          mode: formData.mode,
          duration: formData.duration,
          facultyId: formData.handlingFacultyId,
        }
      );
      alert(res.data.message);
      navigate(-1);
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
            <label htmlFor="duration">Duration(In hrs):</label>
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
            <select
        name="handlingFacultyId"
        value={formData.handlingFacultyId}
        onChange={handleChange}
        style={{ color: "black", backgroundColor: "white" }}
        required
      >
        <option value="">Select Faculty</option>
        {facultyList&&facultyList.map((faculty) => (
          <option key={faculty.faculty_id} value={faculty.faculty_id}>
            {faculty.faculty_id+" - "+faculty.name}
          </option>
        ))}
      </select>
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
