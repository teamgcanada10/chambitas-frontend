import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('Verificando tu cuenta, por favor espera...');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setVerificationStatus('error');
            setMessage('No se encontró un token de verificación. Por favor, revisa el enlace.');
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
                    setMessage(data.message);
                } else {
                    setVerificationStatus('error');
                    setMessage(data.message || 'Ocurrió un error al verificar tu cuenta.');
                }
            } catch (error) {
                setVerificationStatus('error');
                setMessage('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
            }
        };

        verifyToken();
    }, [searchParams]);

    return (
        <div className="max-w-md mx-auto mt-10 text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
            {verificationStatus === 'verifying' && <p className="text-lg text-slate-600 dark:text-slate-300">{message}</p>}
            {verificationStatus === 'success' && (
                <>
                    <h1 className="text-2xl font-bold text-green-600 mb-4">¡Verificación Exitosa!</h1>
                    <p className="text-slate-700 dark:text-slate-200 mb-6">{message}</p>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Ir a Iniciar Sesión
                    </Link>
                </>
            )}
            {verificationStatus === 'error' && (
                <>
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error de Verificación</h1>
                    <p className="text-slate-700 dark:text-slate-200">{message}</p>
                </>
            )}
        </div>
    );
};

export default VerifyEmail;