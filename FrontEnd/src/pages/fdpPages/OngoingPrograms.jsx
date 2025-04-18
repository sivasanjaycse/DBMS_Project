import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Navbar from '../generalPages/Navbar';
import './fdp-list-register.css';

const OngoingPrograms = () => {
  const { facultyId } = useParams();
  const [ongoingFdps, setOngoingFdps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/fdp/ongoing/${facultyId}`)
      .then(res => {
        if (res.data.success) setOngoingFdps(res.data.data);
        else console.error('Failed to fetch ongoing FDPs');
      })
      .catch(err => {
        console.error('Error fetching ongoing FDPs:', err);
      });
  }, [facultyId]);
  const handleRegister = (fdpId) => {
    navigate(`/fdp/details/${facultyId}/${fdpId}`);
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container" id="ongoing-container">
          <h2 className="blackText">Ongoing FDP Programs</h2>
          {ongoingFdps.length === 0 ? (
            <p>No ongoing FDPs...</p>
          ) : (
            <table className="fdp-list">
              <thead>
                <tr>
                  <th>FDP Name</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody>
                {ongoingFdps.map((fdp, index) => (
                  <tr key={index}>
                    <td>{fdp.title}</td>
                    <td>
                    <button className='blue-button' onClick={() => handleRegister(fdp.fdp_id)}>More Details</button>
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

export default OngoingPrograms;
