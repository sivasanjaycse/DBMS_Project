import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../generalPages/Navbar';
import './fdp-list-register.css';
import jsPDF from 'jspdf';
const CompletedPrograms = () => {
  const { facultyId } = useParams();
  const [fdps, setFdps] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/fdp/completed/${facultyId}`)
      .then(res => {
        if (res.data.success) setFdps(res.data.data);
        else console.error('Failed to fetch completed FDPs');
      })
      .catch(err => {
        console.error('Error fetching completed FDPs:', err);
      });
  }, [facultyId]);

  const handleDownload = (facultyName, fdpTitle) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Certificate of Participation', 60, 30);
    doc.setFontSize(12);
    doc.text(`This is to certify that ${facultyName} has successfully participated in`, 20, 50);
    doc.text(`the FDP titled "${fdpTitle}".`, 20, 60);
  
    const fileName = `${facultyName}-${fdpTitle}.pdf`.replace(/\s+/g, '_');
    doc.save(fileName);
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container" id="fdp-list-container">
          <h2 className="blackText">Completed FDP Programs</h2>
          {fdps.length === 0 ? (
            <p>No completed FDPs...</p>
          ) : (
            <table className="fdp-list">
              <thead>
                <tr>
                  <th>FDP Name</th>
                  <th>Download Certificate</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {fdps.map((fdp, index) => (
                  <tr key={index}>
                    <td>{fdp.fdp_title}</td>
                    <td>
                      <button
                        className="blue-button"
                        onClick={() => handleDownload(fdp.faculty_name, fdp.fdp_title)}
                      >
                        Download Certificate
                      </button>
                     
                    </td>
                    <td> <button
                        className="blue-button"
                        onClick={() => {}}
                      >
                        Feedback
                      </button></td>
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

export default CompletedPrograms;
