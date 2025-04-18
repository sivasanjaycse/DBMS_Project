import { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import Navbar from "./Navbar";
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
        // Redirect or store token here
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
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <h2>FDP LOGIN</h2>

            <input
              type="text"
              placeholder="Faculty ID"
              value={facultyId}
              className="pro-textbox"
              onChange={(e) => setFacultyId(e.target.value)}
              required
            />
            <br />
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
        </div>
      </div>
    </>
  );
}
