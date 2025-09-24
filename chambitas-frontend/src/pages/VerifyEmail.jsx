import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('Estamos verificando tu cuenta... ¡Un momento!');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setVerificationStatus('error');
            setMessage('Parece que el enlace no es válido. Por favor, revisa tu correo o solicita uno nuevo.');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (response.ok) {
                    setVerificationStatus('success');
                    setMessage(data.message || '¡Perfecto! Tu cuenta ha sido verificada exitosamente. Ya puedes acceder a todas las funciones de Chambitas.');
                } else {
                    setVerificationStatus('error');
                    setMessage(data.message || 'No pudimos verificar tu cuenta. El enlace podría haber expirado o ya fue usado. Solicita uno nuevo desde tu perfil.');
                }
            } catch (error) {
                setVerificationStatus('error');
                setMessage('Hubo un problema de conexión. Por favor, verifica tu internet e intenta de nuevo.');
            }
        };

        verifyToken();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                {/* Logo/Brand */}
                <div className="mb-6">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Chambitas</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Verificación de Cuenta</p>
                </div>

                {/* Loading State */}
                {verificationStatus === 'verifying' && (
                    <div className="space-y-4">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
                        <p className="text-lg text-slate-700 dark:text-slate-300">{message}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Esto solo tomará unos segundos...</p>
                    </div>
                )}

                {/* Success State */}
                {verificationStatus === 'success' && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">¡Verificación Exitosa!</h2>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{message}</p>
                        </div>
                        <div className="space-y-3">
                            <Link
                                to="/login"
                                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                            >
                                Iniciar Sesión
                            </Link>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                ¿Necesitas ayuda? <a href="mailto:soporte@chambitas.com" className="text-indigo-600 hover:text-indigo-700">Contáctanos</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {verificationStatus === 'error' && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Verificación Pendiente</h2>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{message}</p>
                        </div>
                        <div className="space-y-3">
                            <Link
                                to="/register"
                                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                            >
                                Solicitar Nuevo Enlace
                            </Link>
                            <Link
                                to="/login"
                                className="block w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                            >
                                Ir a Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
