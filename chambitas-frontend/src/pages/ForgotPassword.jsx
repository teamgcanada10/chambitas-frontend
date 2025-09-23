import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter, Label, Input, Button } from '../components/ui';

export default function ForgotPassword() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Card className="rounded-2xl shadow-xl">
                    <CardHeader className="text-center">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Recuperar Contraseña</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Ingresa tu correo para recuperar tu contraseña.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="tu@correo.com"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full">Enviar</Button>
                        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                            ¿Recordaste tu contraseña? {' '}
                            <Link to="/login" className="underline font-medium hover:text-primary-600 dark:hover:text-primary-400">
                                Inicia Sesión
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
