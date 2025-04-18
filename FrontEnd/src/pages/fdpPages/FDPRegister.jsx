import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FDPRegister = () => {
  const { facultyId, fdpId } = useParams();
  const navigate = useNavigate();
  const [fdpDetails, setFdpDetails] = useState(null);
  const [loading, setLoading] = useState(true);

console.log('facultyId:', facultyId); // Should print value
console.log('fdpId:', fdpId); // Should NOT be undefined!


  useEffect(() => {
    const fetchFdpDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/fdp/${fdpId}`);
        if (response.data.success) {
          setFdpDetails(response.data.data);
        } else {
          alert('Failed to fetch FDP details.');
        }
      } catch (error) {
        console.error('Error fetching FDP details:', error);
        alert('An error occurred while fetching FDP details.');
      } finally {
        setLoading(false);
      }
    };

    fetchFdpDetails();
  }, [fdpId]);

  const handleRegister = async () => {
    const confirmRegister = window.confirm('Are you sure you want to register for this FDP?');
    if (!confirmRegister) return;

    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const response = await axios.post('http://localhost:3000/register', {
        faculty_id: parseInt(facultyId),
        fdp_id: parseInt(fdpId),
        payment_status: 'success',
        date: currentDate,
      });

      if (response.data.success) {
        alert('Registration successful!');
        navigate(`/dashboard/${facultyId}`);
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };

  if (loading) {
    return <p>Loading FDP details...</p>;
  }

  if (!fdpDetails) {
    return <p>No FDP details available.</p>;
  }

  return (
    <div>
      <h2>FDP Details</h2>
      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td><strong>Title</strong></td>
            <td>{fdpDetails.title}</td>
          </tr>
          <tr>
            <td><strong>Venue</strong></td>
            <td>{fdpDetails.venue}</td>
          </tr>
          <tr>
            <td><strong>Start Date</strong></td>
            <td>{fdpDetails.start_date.split('T')[0]}</td>
          </tr>
          <tr>
            <td><strong>End Date</strong></td>
            <td>{fdpDetails.end_date.split('T')[0]}</td>
          </tr>
          <tr>
            <td><strong>Organizing Department</strong></td>
            <td>{fdpDetails.organizing_department}</td>
          </tr>
          <tr>
            <td><strong>Organizing College</strong></td>
            <td>{fdpDetails.organizing_college}</td>
          </tr>
          <tr>
            <td><strong>Organizer Name</strong></td>
            <td>{fdpDetails.organizer_name}</td>
          </tr>
          <tr>
            <td><strong>Organizer Phone</strong></td>
            <td>{fdpDetails.organizer_phone}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default FDPRegister;
