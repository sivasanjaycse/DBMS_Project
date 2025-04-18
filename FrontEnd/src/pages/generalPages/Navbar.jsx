import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Navbar.css"; // Import the CSS

const Navbar = () => {
  const { facultyId,} = useParams();
  return (
    <nav className="navbar">
      <NavLink to={"/dashboard/" + facultyId} className="nav-item">
        Dashboard
      </NavLink>
      <NavLink to={"/fdp-list/"+facultyId} className="nav-item">
        Upcoming Programs
      </NavLink>
      <NavLink to={"/fdp/registered/"+facultyId} className="nav-item">
        Registered Programs
      </NavLink>
      <NavLink to={"/fdp/ongoing/"+facultyId} className="nav-item">
        Ongoing Programs
      </NavLink>
      <NavLink to={"/fdp/completed/"+facultyId} className="nav-item">
        Completed Programs
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
