import { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
export default function LoginPage() {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        faculty_id: facultyId,
        password,
      });

      setMessage(res.data.message);

      if (res.data.success) {
        window.location.href = `/dashboard/${facultyId}`;
        console.log("Logged in successfully!");
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Backend Server error. Try again later.");
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <h2>FDP LOGIN</h2>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input
              type="text"
              placeholder="Faculty ID"
              value={facultyId}
              className="pro-textbox"
              onChange={(e) => setFacultyId(e.target.value)}
              required
            />
            <br />
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="pro-textbox"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="blue-button">
              Login
            </button>
            {message && <p className="warn-message">{message}</p>}
          </form>
          <br/><br/>
          <a href="/register" className="register-link">
            Don't have an account? Register here
            </a>
        </div>
      </div>
    </>
  );
}
