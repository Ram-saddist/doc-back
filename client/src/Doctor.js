import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors data from the backend
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/doctors'); // Replace with your actual endpoint
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    // Call the fetchDoctors function
    fetchDoctors();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      <h2>Doctors</h2>
        {
            doctors.map(doctor => (
            <div key={doctor.id}>
                <p><strong>{doctor.name}</strong> - {doctor.specialization}</p>
                <p>Doctor ID: {doctor.id}</p>
            </div>
            ))
        }
    
    </div>
  );
};

export default Doctor;
