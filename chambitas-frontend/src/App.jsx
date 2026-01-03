// Trigger new deployment
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
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile'; // Import the new page

import Anuncios from './pages/Anuncios';
import Chambas from './pages/Chambas';
import TopChamberos from './pages/TopChamberos';
import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';
import Cookies from './pages/Cookies';
import Contacto from './pages/Contacto';
import ChambiSubastas from './pages/ChambiSubastas';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import TestTailwind from './pages/TestTailwind';

function App() {
  return (
    <Routes>
      {/* Public and Protected routes that share the main layout */}
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route index element={<Home />} />
        <Route path="anuncios" element={<Anuncios />} />
        <Route path="chambas" element={<Chambas />} />
        <Route path="chambi-subastas" element={<ChambiSubastas />} />
        <Route path="top-chamberos" element={<TopChamberos />} />
        <Route path="terminos" element={<Terminos />} />
        <Route path="privacidad" element={<Privacidad />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="test-tailwind" element={<TestTailwind />} />

        {/* Protected Routes for standard users */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} /> {/* Add the new route */}
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
      <Route path="/forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default App;
