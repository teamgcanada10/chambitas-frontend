import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';

export default function Admin() {
    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className={`rounded-2xl shadow-xl ${glass}`}>
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Panel de Administración</h2>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 dark:text-slate-400">Aquí irían las herramientas para administrar usuarios, trabajos, disputas, etc.</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
