import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'; // Base URL for our backend API

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeRole, setActiveRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('chambitas-token');
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`${API_URL}/auth/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('chambitas-token');
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                    localStorage.removeItem('chambitas-token');
                }
            };
            fetchUser();
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
                const { token, user } = data;
                
                // ✅ VALIDACIÓN DE SEGURIDAD
                if (!user.isActive) {
                    return { success: false, message: 'Tu cuenta ha sido desactivada. Contacta al administrador.' };
                }
                if (user.isBlocked) {
                    return { success: false, message: 'Tu cuenta ha sido bloqueada por violación de políticas.' };
                }
                
                localStorage.setItem('chambitas-token', token);
                setUser(user);
                setIsAuthenticated(true);

                if (user.roles.length > 1) {
                    navigate("/dashboard");
                } else {
                    setActiveRole(user.roles[0]);
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

    // Helpers
    const getToken = () => localStorage.getItem('chambitas-token');

    // Refresh current user from backend
    const refreshUser = async () => {
        const token = getToken();
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error refreshing user:", error);
        }
    };

    // Update profile basic data (dni, phone, location, bio, name)
    const updateProfile = async (updates) => {
        const token = getToken();
        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await response.json();
            if (response.ok) {
                // data.user is the updated user from server
                setUser(data.user ?? user);
                return { success: true, data };
            }
            return { success: false, message: data.message || 'No se pudo actualizar el perfil.' };
        } catch (error) {
            console.error("updateProfile error:", error);
            return { success: false, message: 'Error de conexión con el servidor.' };
        }
    };

    // Switch active profile between worker/advertiser
    const switchProfile = async (profile) => {
        const token = getToken();
        try {
            const response = await fetch(`${API_URL}/profile/switch`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ profile })
            });
            const data = await response.json();
            if (response.ok) {
                await refreshUser();
                return { success: true, data };
            }
            return { success: false, message: data.message || 'No se pudo cambiar el perfil.' };
        } catch (error) {
            console.error("switchProfile error:", error);
            return { success: false, message: 'Error de conexión con el servidor.' };
        }
    }

    const value = { 
        user,
        setUser,
        token: getToken(),
        isAuthenticated,
        isAdmin: user?.roles.includes('admin') || false,
        activeRole,
        login,
        logout,
        register,
        selectRole,
        refreshUser,
        updateProfile,
        switchProfile
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