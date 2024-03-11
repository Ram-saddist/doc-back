// EditPatient.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPatient = ({ patientId, onClose, onUpdate }) => {
  const [patientData, setPatientData] = useState({});
  
  useEffect(() => {
    // Fetch the patient data based on the patientId
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`/patients/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data for editing:', error);
      }
    };

    // Call the fetchPatientData function
    fetchPatientData();
  }, [patientId]);

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the patient data
      await axios.put(`/patients/${patientId}`, patientData);
      // Close the edit modal and trigger an update in the parent component
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div>
      <h2>Edit Patient</h2>
      {/* Render input fields for editing patient data */}
      <label>Name: </label>
      <input type="text" value={patientData.name} onChange={(e) => setPatientData({ ...patientData, name: e.target.value })} />
      {/* Add more input fields for other patient data */}
      
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPatient;
