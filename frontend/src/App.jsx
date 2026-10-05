import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Services from './Services';
import BookingForm from './BookingForm';
import MyAppointments from './MyAppointments';
import Contact from './Contact';
import Login from './Login';
import AdminPanel from './AdminPanel';
import DoctorSchedule from './components/DoctorSchedule';
import PatientManagement from './components/PatientManagement'; // 1. Component එක import කිරීම

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="brand">
          <span>🦷</span>
          <span>Dental Clinic</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/book">Book Appointment</Link>
          <Link to="/my-appointments">My Appointments</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin/schedules" style={{ color: '#ffeb3b', fontWeight: 'bold' }}>Doctor Schedules</Link>
          <Link to="/admin/patients" style={{ color: '#28a745', fontWeight: 'bold' }}>Patients</Link> {/* 2. Navbar එකට Link එකක් දැම්මා */}
          <Link to="/login">Admin Login</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/schedules" element={<DoctorSchedule />} />
        <Route path="/admin/patients" element={<PatientManagement />} /> {/* 3. Route එකක් හැදුවා */}
      </Routes>
    </Router>
  );
}

export default App;