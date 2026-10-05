import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    age: ''
  });

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost/dental-clinic/backend/api/patients.php');
      // දත්ත array එකක් ලෙස ලැබෙන බව තහවුරු කරගැනීම
      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/dental-clinic/backend/api/patients.php', formData);
      alert(response.data.message || 'Patient added successfully!');
      setFormData({ full_name: '', email: '', phone: '', address: '', age: '' });
      fetchPatients(); // වහාම ලැයිස්තුව යාවත්කාලීන කිරීම
    } catch (error) {
      console.error("Error adding patient:", error);
      alert('Failed to add patient.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Patient Management System</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', background: '#f4f4f4', padding: '15px', borderRadius: '5px', maxWidth: '400px' }}>
        <h3>Add New Patient</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name: </label><br />
          <input 
            type="text" 
            value={formData.full_name} 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
            required 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label><br />
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone: </label><br />
          <input 
            type="text" 
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            required 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Address: </label><br />
          <textarea 
            value={formData.address} 
            onChange={(e) => setFormData({...formData, address: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Age: </label><br />
          <input 
            type="number" 
            value={formData.age} 
            onChange={(e) => setFormData({...formData, age: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Save Patient
        </button>
      </form>

      <h3>Registered Patients</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#ddd' }}>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((pat) => (
              <tr key={pat.id}>
                <td>{pat.id}</td>
                <td>{pat.full_name}</td>
                <td>{pat.email}</td>
                <td>{pat.phone}</td>
                <td>{pat.address}</td>
                <td>{pat.age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientManagement;