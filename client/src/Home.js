import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPatient from './EditPatient'; // Adjust the import path accordingly

const Home = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [editPatientId, setEditPatientId] = useState(null);

  useEffect(() => {
    // Fetch patients and doctors data from the backend
    const fetchPatientsAndDoctors = async () => {
      try {
        const patientsResponse = await axios.get('/patients'); // Replace with your actual endpoint
        const doctorsResponse = await axios.get('/doctors'); // Replace with your actual endpoint
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchPatientsAndDoctors function
    fetchPatientsAndDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const selectedDoctorId = parseInt(event.target.value);
    setSelectedDoctorId(selectedDoctorId);
  };
  const filteredPatients = selectedDoctorId
        ? patients.filter(patient => patient.doctor.id === selectedDoctorId)
        : patients;

  const handleEdit = (patientId) => {
    setEditPatientId(patientId);
  };

  const handleCloseEdit = () => {
    setEditPatientId(null);
  };

  const handleUpdate = () => {
    // Trigger a re-fetch of patients data after editing
    setEditPatientId(null);
    // You can add additional logic here if needed
    // For example, if you want to refresh the patients list after editing
  };

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`/patients/${patientId}`);
      // Update the state or perform any necessary actions after deletion
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <h2>Patients</h2>
      <label>Select Doctor: </label>
      <select onChange={handleDoctorChange}>
        <option value={null}>All Doctors</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - {doctor.specialization}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.weight}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.disease}</td>
              <td>{patient.doctor.name} - {patient.doctor.specialization}</td>
              <td>
                <button onClick={() => handleEdit(patient.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the EditPatient component if editPatientId is not null */}
      {editPatientId !== null && (
        <EditPatient
          patientId={editPatientId}
          onClose={handleCloseEdit}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Home;
