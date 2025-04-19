import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const OrganizerNavbar = () => {
  const { facultyId } = useParams();
  return (
    <nav className="navbar">
      <NavLink to={"/organizer/dashboard/" + facultyId} className="nav-item">
        Dashboard
      </NavLink>
      <NavLink to={"/" + facultyId} className="nav-item">
        New FDP Program
      </NavLink>
      <NavLink to={"/organizer/upcoming/" + facultyId} className="nav-item">
        Upcoming Programs
      </NavLink>
      <NavLink to={"/organizer/ongoing/" + facultyId} className="nav-item">
        Ongoing Programs
      </NavLink>
      <NavLink to={"/organizer/completed/" + facultyId} className="nav-item">
        Completed Programs
      </NavLink>
      <NavLink
        to={"/dashboard/" + facultyId}
        className="nav-item"
        id="spl-nav-item"
      >
        Normal
      </NavLink>
      <NavLink to="/" className="nav-item">
        Logout
      </NavLink>
    </nav>
  );
};

export default OrganizerNavbar;
