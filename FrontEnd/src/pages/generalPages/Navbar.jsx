import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Navbar.css"; // Import the CSS

const Navbar = () => {
  const { id } = useParams();
  return (
    <nav className="navbar">
      <NavLink to={"/dashboard/" + id} className="nav-item">
        Dashboard
      </NavLink>
      <NavLink to="/" className="nav-item">
        Feature
      </NavLink>
      <NavLink to="/" className="nav-item">
        Feature
      </NavLink>
      <NavLink to="/" className="nav-item">
        Feature
      </NavLink>
      <NavLink to="/" className="nav-item">
        Feature
      </NavLink>
      <NavLink to="/" className="nav-item">
        Feature
      </NavLink>
      <NavLink to="/" className="nav-item">
        Logout
      </NavLink>
    </nav>
  );
};

export default Navbar;
