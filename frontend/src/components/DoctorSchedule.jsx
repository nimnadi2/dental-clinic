import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    doctor_name: '',
    day_of_week: 'Monday',
    start_time: '',
    end_time: ''
  });

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost/dental-clinic/backend/api/schedules.php');
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/dental-clinic/backend/api/schedules.php', formData);
      alert('Schedule added successfully!');
      setFormData({ doctor_name: '', day_of_week: 'Monday', start_time: '', end_time: '' });
      fetchSchedules();
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert('Failed to add schedule.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Doctor Schedule Management</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', background: '#f4f4f4', padding: '15px', borderRadius: '5px', maxWidth: '400px' }}>
        <h3>Add New Schedule</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Doctor Name: </label><br />
          <input 
            type="text" 
            value={formData.doctor_name} 
            onChange={(e) => setFormData({...formData, doctor_name: e.target.value})} 
            required 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Day of Week: </label><br />
          <select 
            value={formData.day_of_week} 
            onChange={(e) => setFormData({...formData, day_of_week: e.target.value})} 
            required
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Start Time: </label><br />
          <input 
            type="time" 
            value={formData.start_time} 
            onChange={(e) => setFormData({...formData, start_time: e.target.value})} 
            required 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>End Time: </label><br />
          <input 
            type="time" 
            value={formData.end_time} 
            onChange={(e) => setFormData({...formData, end_time: e.target.value})} 
            required 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 15px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Save Schedule
        </button>
      </form>

      <h3>Existing Schedules</h3>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#ddd' }}>
            <th>ID</th>
            <th>Doctor Name</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((sch) => (
              <tr key={sch.id}>
                <td>{sch.id}</td>
                <td>{sch.doctor_name}</td>
                <td>{sch.day_of_week}</td>
                <td>{sch.start_time}</td>
                <td>{sch.end_time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No schedules found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorSchedule;