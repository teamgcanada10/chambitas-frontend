import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent } from '../components/ui';
import { User, Briefcase } from 'lucide-react';

export default function Dashboard() {
    const { user, selectRole } = useAuth();

    if (!user) {
        return null; // Or a loading spinner
    }

    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    const RoleCard = ({ role, icon, title, description }) => (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectRole(role)}
            className="cursor-pointer"
        >
            <Card className={`rounded-2xl shadow-xl text-center h-full ${glass}`}>
                <CardHeader>
                    {icon}
                    <h3 className="text-xl font-semibold mt-4 text-slate-900 dark:text-slate-50">{title}</h3>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );

    return (
        <div className="flex items-center justify-center min-h-[70vh] p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">¡Bienvenido, {user.name}!</h1>
                <p className="mt-2 mb-8 text-slate-600 dark:text-slate-400">¿Qué quieres hacer hoy?</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {user.roles.includes('client') && (
                        <RoleCard 
                            role="client"
                            icon={<User size={40} className="mx-auto text-purple-500"/>}
                            title="Soy Cliente"
                            description="Quiero contratar a un profesional para una chamba."
                        />
                    )}
                    {user.roles.includes('worker') && (
                        <RoleCard 
                            role="worker"
                            icon={<Briefcase size={40} className="mx-auto text-purple-500"/>}
                            title="Soy Trabajador"
                            description="Estoy buscando oportunidades de trabajo y chambitas."
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
}
