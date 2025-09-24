import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '../components/ui';

// Mock Data
const client = {
    name: "Valeria R.",
    imageUrl: `https://images.unsplash.com/photo-1529688373733-d395a1d7c364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80`,
    address: "Calle Los Jazmines 325, San Miguel"
};

const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

export default function Confirmation() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className={`rounded-2xl shadow-xl ${glass}`}>
                <CardHeader className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-emerald-500 dark:text-emerald-400"><CheckCircle2/> ¡Felicidades! Fuiste elegido</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Revisa los detalles finales de la chamba y contacta al cliente.</p>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                          <p className="text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Cliente a contactar:</p>
                          <div className="flex items-center gap-3">
                            <img src={client.imageUrl} alt={client.name} className="h-10 w-10 rounded-full object-cover" />
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-slate-100">{client.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Dirección: {client.address}</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Fecha y hora</div>
                            <div className="text-sm text-slate-700 dark:text-slate-300">31/08/2025 – 10:00 am</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Resumen de pago</div>
                            <div className="text-sm text-slate-700 dark:text-slate-300">S/ 80 (Comisión 10% → recibes S/ 72)</div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Chat interno</div>
                            <div className="text-sm text-slate-700 dark:text-slate-300">Comunícate seguro dentro de la app.</div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    <Button variant="secondary" className="rounded-2xl">Ver políticas</Button>
                    <Button className="rounded-2xl">Ir al chat</Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}