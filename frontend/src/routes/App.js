import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; // Context provider for authentication
import Login from './components/Login'; // Login page component
import Register from './components/Register'; // Registration page component
import Dashboard from './components/Dashboard'; // Dashboard component
import CreateDisease from './components/CreateDisease'; // Component for creating a new disease entry
import UpdateDisease from './components/UpdateDisease'; // Component for updating an existing disease entry

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-disease" element={<CreateDisease />} />
          <Route path="/update-disease/:id" element={<UpdateDisease />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
