import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent, CardFooter, Label, Input, Button } from '../components/ui';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { success, message } = await login(email, password);
        if (!success) {
            setError(message);
        }
        // Navigation is handled by the login function itself
    };

    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <Card className={`rounded-2xl shadow-xl ${glass}`}>
                        <CardHeader className="text-center">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Iniciar Sesión</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Accede a tu cuenta de Chambitas</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="tu@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full">Ingresar</Button>
                            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                ¿No tienes una cuenta? {' '}
                                <Link to="/registro" className="underline font-medium hover:text-purple-600 dark:hover:text-purple-400">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </motion.div>
        </div>
    );
}