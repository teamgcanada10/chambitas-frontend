import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'; // Base URL for our backend API

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeRole, setActiveRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // On initial load, check for a token in localStorage
        const token = localStorage.getItem('chambitas-token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                // Check if token is expired
                if (decodedUser.exp * 1000 > Date.now()) {
                    setUser(decodedUser);
                    setIsAuthenticated(true);
                } else {
                    // Token is expired, remove it
                    localStorage.removeItem('chambitas-token');
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem('chambitas-token');
            }
        }
    }, []);

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, data: { message: 'Error de conexión con el servidor.' } };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token } = data;
                localStorage.setItem('chambitas-token', token);
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                setIsAuthenticated(true);

                if (decodedUser.roles.length > 1) {
                    navigate("/dashboard");
                } else {
                    setActiveRole(decodedUser.roles[0]);
                    navigate("/");
                }
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor.' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setActiveRole(null);
        localStorage.removeItem('chambitas-token');
        navigate("/login");
    };

    const selectRole = (role) => {
        if (user && user.roles.includes(role)) {
            setActiveRole(role);
            navigate("/");
        } else {
            console.error("Invalid role selected");
        }
    }

    const value = { 
        user,
        isAuthenticated,
        isAdmin: user?.roles.includes('admin') || false,
        activeRole,
        login,
        logout,
        register,
        selectRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};