import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './Components/ContactForm';
AdminLogin
import Dashboard from './Components/Dasboard';
import AdminLogin from './Components/LoginForm';


Dashboard



const App = () => {
  return (
    <Router>
      <Routes>
     
       <Route path="/" element={<ContactForm/>} /> 
       
      <Route path="/admin/login" element={<AdminLogin/>} />
      <Route path="/admin/dashboard" element={<Dashboard/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
