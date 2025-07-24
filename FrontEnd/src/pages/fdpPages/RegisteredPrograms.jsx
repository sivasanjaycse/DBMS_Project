import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from '../generalPages/Navbar';
import './fdp-list-register.css';

const RegisteredPrograms = () => {
  const { facultyId } = useParams();
  const [fdps, setFdps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fdpms-webservice.onrender.com/faculty/${facultyId}/registered-fdps`)
      .then(res => {
        if (res.data.success) setFdps(res.data.fdps);
        else console.error('Failed to load registered FDPs');
      })
      .catch(err => {
        console.error('Error fetching registered FDPs:', err);
      });
  }, [facultyId]);
  const handleRegister = (fdpId) => {
    navigate(`/fdp/details/${facultyId}/${fdpId}`);
  };

  return (
    <>
      <Navbar />
      <div className='page'>
        <div className='container' id='reg-prgm-container'>
          <h2 className='blackText'>Registered FDP Programs</h2>
          {fdps.length === 0 ? (
            <p>No registered FDPs...</p>
          ) : (
            <table className='fdp-list'>
              <thead>
                <tr>
                  <th>FDP Title</th>
                  <th>Payment Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {fdps.map((fdp, index) => (
                  <tr key={index}>
                    <td>{fdp.fdp_title}</td>
                    <td>{fdp.payment_status}</td>
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

export default RegisteredPrograms;
