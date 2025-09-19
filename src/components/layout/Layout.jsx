import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, LogOut } from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui';

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
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover -z-10 filter blur-sm scale-110"
                src="https://videos.pexels.com/video-files/4782135/4782135-hd_1920_1080_25fps.mp4" // Example video, recommend hosting locally
            />

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto relative z-10">
                <header className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                                <Building className="text-purple-500" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Chambitas</h1>
                                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Tu marketplace de confianza</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        {isAuthenticated ? (
                            <>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{isAdmin ? 'Admin' : 'Usuario'}</div>
                                </div>
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

                {/* Navigation Tabs are now conditional */}
                {isAuthenticated && (
                    <nav className="inline-flex h-auto sm:h-10 items-center justify-center rounded-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 w-full mb-4">
                        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                            <TabLink to="/">Inicio</TabLink>
                            <TabLink to="/dashboard">Dashboard</TabLink>
                            <TabLink to="/publicar">Publicar Chamba</TabLink>
                            {/* Add more role-specific links here */}
                            {isAdmin && <TabLink to="/admin">Admin</TabLink>}
                        </div>
                    </nav>
                )}

                <main>
                    <Outlet />
                </main>

                <footer className="mt-8 text-xs text-slate-500 dark:text-slate-400 text-center">
                    *Mockup interactivo (v2.5 con Admin View).
                </footer>
            </motion.div>
        </div>
    );
}
