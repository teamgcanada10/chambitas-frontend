import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardContent, Label, Input, Button, Badge } from "../components/ui";

// Mock data that would typically be fetched from an API
const mockJob = {
    id: '123',
    title: "Pintar pared 3×2 m en sala",
    location: "San Miguel",
    date: "31/08 – 10:00 am",
    priceRange: [70, 100],
    description: "Necesito pintar una pared de 3x2 m en mi sala. Tengo la pintura y las brochas listas, solo necesito la mano de obra. Es importante proteger el piso y los muebles cercanos antes de empezar.",
    client: {
        name: "Valeria R.",
        imageUrl: `https://images.unsplash.com/photo-1529688373733-d395a1d7c364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80`,
        verified: true
    }
}

export default function ViewJob() {
    const navigate = useNavigate();
    const { id } = useParams(); // In a real app, you'd use this ID to fetch job data
    const [offer, setOffer] = useState(80);

    // For the mockup, we'll just use the mock job data
    const job = mockJob;

    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className={`rounded-2xl shadow-xl ${glass}`}>
                <CardHeader className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><MapPin size={18}/> <span>{job.location}</span></div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{job.title}</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{job.date}</Badge>
                        <Badge>Rango sugerido: S/ {job.priceRange[0]} – S/ {job.priceRange[1]}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-medium mb-2">Publicado por:</p>
                        <div className="flex items-center gap-3">
                            <img src={job.client.imageUrl} alt={job.client.name} className="h-10 w-10 rounded-full object-cover" />
                            <div>
                                <div className="font-semibold text-slate-900 dark:text-slate-100">{job.client.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{job.client.verified ? "Cliente verificado" : "Cliente"}</div>
                            </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50">
                          <p className="text-sm font-medium mb-2">Descripción de la Chamba</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{job.description}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label>Tu oferta (S/)</Label>
                        <div className="flex items-center gap-3">
                            <Input type="number" value={offer} onChange={(e)=>setOffer(parseInt(e.target.value||"0"))} className="max-w-[180px]" />
                            <Badge variant="outline">Precio justo recomendado</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Si ofreces dentro del rango, tu comisión es 10%. Si ofreces menos, sube a 20%.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2"><ShieldCheck size={16}/> Tus verificaciones de perfil</p>
                        <ul className="text-sm list-disc ml-5 space-y-1 text-slate-700 dark:text-slate-300">
                            <li>DNI validado</li>
                            <li>Antecedentes (opcional)</li>
                            <li>CV/Experiencia</li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button className="rounded-2xl w-full" onClick={() => navigate(`/chamba/${id}/ofertas`)}>Enviar oferta</Button>
                      </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}