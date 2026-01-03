import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Sparkles, Coins } from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from '../ThemeToggle';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui';

import Footer from './Footer';

// Enhanced NavLink component with better styling
const TabLink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 transform ${
                    isActive 
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 scale-105" 
                    : "text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105"
                }`
            }
        >
            {children}
        </NavLink>
    );
};

export default function Layout() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen font-sans relative overflow-hidden">
            {/* Premium animated background */}
            <div className="fixed inset-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-primary-50/30 to-purple-50/20 dark:from-slate-950 dark:via-primary-950/30 dark:to-purple-950/20"></div>
                
                {/* Animated floating orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-float"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-primary-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
                
                {/* Grid pattern overlay using Tailwind */}
                <div className="absolute inset-0 opacity-5" 
                     style={{
                         backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
                         backgroundSize: '50px 50px'
                     }}>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4 }} 
                className="max-w-7xl mx-auto relative z-10 p-4 sm:p-6 md:p-10"
            >
                <header className="mb-8 relative">
                    {/* Premium header card */}
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-primary-600/20 rounded-2xl blur-2xl"></div>
                        
                        {/* Main header content - fondo más claro */}
                        <div className="relative bg-white/95 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700/50 p-6">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                                {/* Logo */}
                                <Link to="/" className="group relative">
                                    <div className="absolute -inset-3 bg-white/20 dark:bg-white/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img 
                                        src="/Chambitas.png" 
                                        alt="Chambitas Logo" 
                                        className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain group-hover:scale-105 transition-transform duration-300 shrink-0" 
                                    />
                                </Link>

                                {/* Navigation and Auth Section */}
                                <div className="flex flex-col lg:flex-row items-center gap-6">
                                    {/* Navigation Links */}
                                    <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                                        <TabLink to="/">Inicio</TabLink>
                                        <TabLink to="/chambas">Galería de Chambas</TabLink>
                                        <TabLink to="/chambi-subastas">Subastas</TabLink>
                                        <TabLink to="/anuncios">Chambitas Disponibles</TabLink>
                                        <TabLink to="/top-chamberos">Top</TabLink>
                                    </nav>

                                    <div className="flex items-center gap-3">
                                        {/* Theme Toggle */}
                                        <div className="p-2 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 shadow-inner">
                                            <ThemeToggle />
                                        </div>

                                        {/* Auth Section */}
                                        {isAuthenticated ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="relative group">
                                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-75 blur transition-all duration-300"></div>
                                                        <img 
                                                            src={user.imageUrl} 
                                                            alt={user.name} 
                                                            className="relative w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-lg cursor-pointer transition-transform hover:scale-110" 
                                                        />
                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                                                            <Sparkles className="w-3 h-3 text-white" />
                                                        </div>
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
                                                    <DropdownMenuItem className="flex flex-col items-start p-3">
                                                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {isAdmin ? '👑 Administrador' : '⭐ Usuario Premium'}
                                                        </div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                                                    <DropdownMenuItem 
                                                        onClick={() => navigate('/dashboard')} 
                                                        className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-950/50"
                                                    >
                                                        <span className="mr-2">📊</span> Dashboard
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => navigate('/profile')} 
                                                        className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-950/50"
                                                    >
                                                        <span className="mr-2">👤</span> Mi Perfil
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                                                    <DropdownMenuItem 
                                                        onClick={logout} 
                                                        className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                                                    >
                                                        <LogOut size={16} className="mr-2" />
                                                        Cerrar Sesión
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    asChild 
                                                    variant="outline"
                                                    className="rounded-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/50 font-semibold shadow-md hover:shadow-lg transition-all"
                                                >
                                                    <Link to="/login">Iniciar Sesión</Link>
                                                </Button>
                                                <Button 
                                                    asChild
                                                    className="rounded-full bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 shadow-lg hover:shadow-xl shadow-primary-500/25 font-semibold transition-all"
                                                >
                                                    <Link to="/registro" className="flex items-center gap-2">
                                                        <Sparkles className="w-4 h-4" />
                                                        Registrarse
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
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
