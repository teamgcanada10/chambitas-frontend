import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, LogOut } from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui';

import Footer from './Footer';

// This is the new NavLink component that mimics the old style
const TabLink = ({ to, children }) => {
    const activeClass = "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-sm";
    const inactiveClass = "text-slate-600 dark:text-slate-400";

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? activeClass : inactiveClass}`
            }
        >
            {children}
        </NavLink>
    );
};


export default function Layout() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    return (
        <div className={`min-h-screen p-4 sm:p-6 md:p-10 font-sans`}>
            

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto relative z-10">
                <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg glassmorphism">
    {/* Logo and Slogan */}
    <div className="flex items-center">
        <img src="/Chambitas.png" alt="Chambitas Logo" className="w-32 h-32" /> {/* Increased size */}
        <div className="ml-4"> {/* Added margin-left for spacing */}
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Conectamos necesidades con oportunidades</p>
        </div>
    </div>

    {/* Main Navigation and Auth/Profile Section */}
    <div className="flex items-center gap-4">
        {/* New Navigation Links */}
        <nav className="flex items-center gap-4">
            <TabLink to="/chambas">Chambas</TabLink>
            <TabLink to="/anuncia">Anuncia</TabLink>
            <TabLink to="/top-chamberos">Top Chamberos</TabLink>
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Auth Buttons or Profile Icon */}
        {isAuthenticated ? (
            <>
                <div className="text-right">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{isAdmin ? 'Admin' : 'Usuario'}</div>
                </div>
                {/* Profile Icon - will be replaced with a proper component later */}
                <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                <Button variant="outline" size="sm" onClick={logout} className="rounded-full w-10 h-10 p-0">
                    <LogOut size={16} />
                </Button>
            </>
        ) : (
            <div className="flex items-center gap-2">
                <Button asChild variant="outline"><Link to="/login">Iniciar Sesión</Link></Button>
                <Button asChild><Link to="/registro">Registrarse</Link></Button>
            </div>
        )}
    </div>
</header>

                <main>
                    <Outlet />
                </main>

                <Footer />
            </motion.div>
        </div>
    );
}
