import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FacultyRegister.css"; // Assuming you have some CSS for styling

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dname: "",
    college: "",
    password: "",
  });

  const [departments, setDepartments] = useState([]);
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/departments").then((res) => {
      setDepartments(res.data.departments.map((d) => d.dname));
    });
    axios.get("http://localhost:3000/colleges").then((res) => {
      setColleges(res.data.colleges.map((c) => c.name));
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/add-faculty", formData);
      alert(`Faculty registered! ID: ${res.data.faculty_id}
Please Login To Continue`);
      navigate(`/`);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed!");
    }
  };

  return (
    <>
    <div className="page">
      <div className="container" id="RegisterContainer">
        <h2 className="blackText">Faculty Registration</h2>
    <form onSubmit={handleRegister}>
      <table className="faculty-table">
        <tbody>
          <tr>
            <td>Name</td>
            <td><input name="name" className="pro-textbox facUpdate facInsert" value={formData.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><input name="phone" className="pro-textbox facUpdate facInsert" value={formData.phone} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input name="email" className="pro-textbox facUpdate facInsert" value={formData.email} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td>Department</td>
            <td>
              <select name="dname" className="pro-textbox facUpdate facInsert" value={formData.dname} onChange={handleChange} required>
                <option value="">Select</option>
                {departments.map((dept, i) => (
                  <option key={i} value={dept}>{dept}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>College</td>
            <td>
              <select name="college" className="pro-textbox facUpdate facInsert" value={formData.college} onChange={handleChange} required>
                <option value="">Select</option>
                {colleges.map((clg, i) => (
                  <option key={i} value={clg}>{clg}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td><input type="password" name="password" value={formData.password} className="pro-textbox facUpdate facInsert" onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td colSpan="2">
              <center><button type="submit" className="blue-button">Register</button></center>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    </div>
    </div>
    </>
  );
};

export default FacultyRegister;
