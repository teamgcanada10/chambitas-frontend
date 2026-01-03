import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, Label, Input, Button } from '../components/ui';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Token no proporcionado. Link inválido o expirado.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!newPassword || !confirmPassword) {
            setError('Por favor completa todos los campos.');
            return;
        }

        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Error resetando contraseña');
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('Error conectando con el servidor');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Card className="rounded-2xl shadow-xl">
                    <CardHeader className="text-center">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Resetear Contraseña</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Ingresa tu nueva contraseña.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 dark:text-red-400">
                                <AlertCircle size={18} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 dark:text-green-400">
                                <CheckCircle size={18} />
                                <span className="text-sm">Contraseña reseteada exitosamente. Redirigiendo al login...</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Nueva Contraseña</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm">Confirmar Contraseña</Label>
                                <Input 
                                    id="confirm" 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading || !token}>
                                {loading ? (
                                    <>
                                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                                        Procesando...
                                    </>
                                ) : (
                                    'Resetear Contraseña'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                            <Link to="/login" className="underline font-medium hover:text-primary-600 dark:hover:text-primary-400">
                                Volver al Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
