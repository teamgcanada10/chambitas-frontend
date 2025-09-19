import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import PublishJob from './pages/PublishJob';
import ViewJob from './pages/ViewJob';
import ViewOffers from './pages/ViewOffers';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <Routes>
      {/* Public and Protected routes that share the main layout */}
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route index element={<Home />} />

        {/* Protected Routes for standard users */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="publicar" element={<PublishJob />} />
          <Route path="chamba/:id" element={<ViewJob />} />
          <Route path="chamba/:id/ofertas" element={<ViewOffers />} />
          <Route path="confirmacion" element={<Confirmation />} />
        </Route>

        {/* Protected Route for admins */}
        <Route 
          path="admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Route>

      {/* Standalone routes (no main layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

    </Routes>
  );
}

export default App;
