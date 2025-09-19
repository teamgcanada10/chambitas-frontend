import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ children }) {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated || !isAdmin) {
        // Redirect them to the home page if they are not an authenticated admin.
        return <Navigate to="/" />;
    }

    return children;
}
