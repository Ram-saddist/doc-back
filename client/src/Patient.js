// PatientForm.js

import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    weight: '',
    gender: '',
    age: '',
    disease: '',
    doctorId: null, // You may modify this based on how you identify doctors (could be doctor name, id, etc.)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your Node.js server
      const response = await axios.post('/patients', patientData);
      
      console.log('Patient created:', response.data);
      // You may choose to redirect or update state after successful creation
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div>
      <h2>Create New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={patientData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Weight:
          <input type="text" name="weight" value={patientData.weight} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" value={patientData.gender} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Age:
          <input type="text" name="age" value={patientData.age} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Disease:
          <input type="text" name="disease" value={patientData.disease} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Doctor ID:
          <input type="text" name="doctorId" value={patientData.doctorId} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Create Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
