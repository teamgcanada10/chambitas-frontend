import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter, Label, Input, Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const { success, data } = await register(name, email, password);

        if (success) {
            setMessage(data.message);
        } else {
            setError(data.message);
        }
    };

    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <Card className={`rounded-2xl shadow-xl ${glass}`}>
                        <CardHeader className="text-center">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Crear una Cuenta</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Únete a la comunidad de Chambitas</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {message ? (
                                <p className="text-sm text-green-600 dark:text-green-400 text-center p-4 bg-green-500/10 rounded-md">{message}</p>
                            ) : (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nombre Completo</Label>
                                        <Input 
                                            id="name" 
                                            type="text" 
                                            placeholder="Tu Nombre"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
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
                                        <div className="relative">
                                            <Input 
                                                id="password" 
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>
                                    {error && <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            {!message && <Button type="submit" className="w-full">Registrarse</Button>}
                            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login" className="underline font-medium hover:text-primary-600 dark:hover:text-primary-400">
                                    Inicia sesión
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </motion.div>
        </div>
    );
}