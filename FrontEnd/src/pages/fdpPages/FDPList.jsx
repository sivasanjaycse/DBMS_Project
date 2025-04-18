import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../generalPages/Navbar';
import './fdp-list-register.css';

const FdpList = () => {
  const [fdps, setFdps] = useState([]);
  const { facultyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/all-fdp')
      .then(res => {
        const today = new Date();
        const upcomingFdps = res.data.data.filter(fdp => new Date(fdp.start_date) > today);
        setFdps(upcomingFdps);
      })
      .catch(err => {
        console.error('Error fetching FDPs:', err);
      });
  }, []);

  const handleRegister = (fdpId) => {
    navigate(`/fdp/register/${facultyId}/${fdpId}`);
  };

  return (
    <>
    <Navbar/>
    <div className='page'>
    <div className='container' id='fdp-list-container'>
      <h2 className='blackText'>Upcoming FDP Programs</h2>
      {fdps.length === 0 ? (
        <p>No upcoming FDPs...</p>
      ) : (
        <table className='fdp-list'>
          <thead>
            <tr>
              <th>FDP ID</th>
              <th>Title</th>
              <th>Venue</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Department</th>
              <th>College</th>
              <th>Organizer</th>
              <th>Contact</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            {fdps.map(fdp => (
              <tr key={fdp.fdp_id}>
                <td>{fdp.fdp_id}</td>
                <td>{fdp.title}</td>
                <td>{fdp.venue}</td>
                <td>{fdp.start_date.split('T')[0]}</td>
                <td>{fdp.end_date.split('T')[0]}</td>
                <td>{fdp.organizing_department}</td>
                <td>{fdp.organizing_college}</td>
                <td>{fdp.organizer_name}</td>
                <td>{fdp.organizer_phone}</td>
                <td>
                  <button className='blue-button' onClick={() => handleRegister(fdp.fdp_id)}>Register</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </>
  );
};

export default FdpList;
