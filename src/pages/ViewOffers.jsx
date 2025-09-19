import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Star, Coins, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, Button, Badge } from '../components/ui';

// Mock data
const workers = [
    {name:"Carlos J.", stars:4, jobs:15, price:80, imageUrl: `https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80`},
    {name:"Ana M.", stars:3, jobs:8, price:75, imageUrl: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80`},
    {name:"Luis P.", stars:5, jobs:25, price:95, imageUrl: `https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80`}
];

const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

export default function ViewOffers() {
    const navigate = useNavigate();
    const { id } = useParams(); // Job ID

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className={`rounded-2xl shadow-xl ${glass}`}>
                <CardHeader>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Ofertas recibidas</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Elige por reputación y precio. La etiqueta "Precio justo" te ayuda a decidir.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    {workers.map((p, i)=> (
                        <div key={i} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <img src={p.imageUrl} alt={p.name} className="h-12 w-12 rounded-full object-cover flex-shrink-0"/>
                                <div>
                                    <div className="flex items-center flex-wrap gap-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                                        <User size={16}/> {p.name} 
                                        <Badge variant="secondary" className="flex items-center gap-1"><Star size={14}/> {p.stars}.0 · {p.jobs} trabajos</Badge>
                                    </div>
                                    <div className="text-xs text-emerald-500 dark:text-emerald-400 font-medium mt-1">Precio justo recomendado ✅</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 ml-auto">
                                <Badge className="text-base font-bold">S/ {p.price}</Badge>
                                <Button className="rounded-2xl" onClick={() => navigate(`/confirmacion`)}>Elegir <ChevronRight size={16} className="ml-1" /></Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="justify-between flex-wrap gap-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Tus datos se compartirán solo con la persona elegida.</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Coins size={14}/> Pago seguro (Yape/Plin/Transferencia)</div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}