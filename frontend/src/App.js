import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HierarchyView from './pages/HierarchyView';
import EmployeeList from './pages/EmployeeList';
import Profile from './pages/Profile';

import { hash } from './requests/read'

function NotFound() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default'}}>
      <Typography variant="h1" color="primary.main">404</Typography>
      <Typography variant="h6" >The page you are looking for does not exist :/</Typography>
    </Box>
  );
}

export default function App() {
  function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkSession = async () => {
        try {
          const email = sessionStorage.getItem('email');
          const access = sessionStorage.getItem('access'); 

          if (!email || !access) {
            setIsAuthenticated(false);
            return;
          }
          const check = await hash(email); 

          if (access === check) {
            setIsAuthenticated(true);
          } 
          else {
            setIsAuthenticated(false);
          }
        } 
        catch {
          setIsAuthenticated(false);
        } 
        finally {
          setLoading(false);
        }
      };

      checkSession();
    }, []);

    if (loading) return null; 

    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }

  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* protected */}
        <Route path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route path="/hierarchy"
          element={<ProtectedRoute><HierarchyView /></ProtectedRoute>}
        />
        <Route path="/employees"
          element={<ProtectedRoute><EmployeeList /></ProtectedRoute>}
        />
        <Route path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}