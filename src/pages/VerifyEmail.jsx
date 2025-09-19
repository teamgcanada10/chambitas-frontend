import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';
import { Loader, CheckCircle, XCircle } from 'lucide-react';

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('verifying'); // verifying, success, error

    useEffect(() => {
        if (token) {
            // In a real scenario, you'd send this token to your backend API endpoint
            // fetch(`/api/auth/verify?token=${token}`).then(...) 
            // For this mockup, we'll just simulate a delay and success.
            setTimeout(() => {
                setStatus('success');
            }, 2000);
        } else {
            setStatus('error');
        }
    }, [token]);

    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <div className="flex flex-col items-center gap-4">
                        <Loader className="animate-spin" size={48} />
                        <p>Verificando tu cuenta...</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <CheckCircle className="text-green-500" size={48} />
                        <h2 className="text-xl font-semibold">¡Cuenta Verificada!</h2>
                        <p>Tu cuenta ha sido activada exitosamente. Ya puedes iniciar sesión.</p>
                        <Link to="/login" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Ir a Iniciar Sesión</Link>
                    </div>
                );
            case 'error':
            default:
                 return (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <XCircle className="text-red-500" size={48} />
                        <h2 className="text-xl font-semibold">Error de Verificación</h2>
                        <p>El enlace de verificación no es válido o ha expirado. Por favor, intenta registrarte de nuevo.</p>
                        <Link to="/registro" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Volver a Registrarse</Link>
                    </div>
                );
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
                <Card className={`rounded-2xl shadow-xl ${glass}`}>
                    <CardContent className="p-8">
                        {renderContent()}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
