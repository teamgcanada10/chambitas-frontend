import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, SprayCan, Paintbrush, Sparkles, Loader } from "lucide-react";
import { Card, CardHeader, CardContent, Label, Input, Button, Textarea, Slider } from "../components/ui";

export default function PublishJob() {
    const navigate = useNavigate();
    const [range, setRange] = useState([70, 100]);
    const [jobTitle, setJobTitle] = useState("Pintar pared 3×2 m en sala");
    const [jobDescription, setJobDescription] = useState("Necesito pintar una pared de 3x2 m en mi sala. Tengo la pintura y las brochas listas, solo necesito la mano de obra. Es importante proteger el piso y los muebles cercanos antes de empezar.");
    const [isGenerating, setIsGenerating] = useState(false);

    const generateDescription = async () => {
        if (!jobTitle) return;
        setIsGenerating(true);
        setJobDescription("Generando descripción optimizada...");

        // This is a mocked API call. In a real app, this would be a backend endpoint.
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockResponse = {
                "candidates": [
                    {
                        "content": {
                            "parts": [
                                { "text": `¡Hola! Busco a alguien con buena mano para que me ayude a pintar una pared de 3x2 metros en mi sala y darle un nuevo aire al espacio. 

Ya cuento con la pintura y las herramientas necesarias, así que solo se requiere la mano de obra experta. Sería ideal si me puedes ayudar a proteger los muebles y el piso antes de empezar para que todo quede impecable. 

¿Tienes experiencia en este tipo de trabajos? ¡Espero tu oferta para empezar!` }
                            ]
                        }
                    }
                ]
            };
            setJobDescription(mockResponse.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error("Error generating description:", error);
            setJobDescription("Hubo un error al generar la descripción. Por favor, intenta de nuevo.");
        } finally {
            setIsGenerating(false);
        }
    };

    const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className={`rounded-2xl shadow-xl ${glass}`}>
                <CardHeader className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><SprayCan size={18}/> <span>Nueva Chamba · Pintura</span></div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Publica tu Chamba</h2>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2"><Paintbrush size={16}/> Título de la Chamba</Label>
                            <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Ej: Pintar pared, arreglar caño, etc." />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label className="flex items-center gap-2">Descripción</Label>
                                <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={generateDescription} disabled={isGenerating}>
                                    {isGenerating ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2 text-primary-400" />}
                                    Generar con IA ✨
                                </Button>
                            </div>
                            <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={6} />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2"><Label className="flex items-center gap-2"><Calendar size={16}/> Día</Label><Input defaultValue="31/08/2025" /></div>
                            <div className="grid gap-2"><Label className="flex items-center gap-2"><Clock size={16}/> Hora</Label><Input defaultValue="10:00 am" /></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2"><MapPin size={16}/> Distrito</Label>
                            <Input defaultValue="San Miguel" />
                        </div>
                        <div className="grid gap-2"><Label>Modalidad de precio</Label><div className="flex flex-wrap gap-2"><Button variant="secondary" className="rounded-2xl">Precio fijo</Button><Button className="rounded-2xl" variant="default">No sé el precio, que me coticen</Button></div></div>
                        <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-900/30 border border-amber-500/20 dark:border-amber-800">
                            <p className="text-sm font-medium mb-2 text-amber-800 dark:text-amber-200">Sugerencia del sistema (tu zona):</p>
                            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">S/ {range[0]} – S/ {range[1]}</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Basado en trabajos similares y reputación promedio.</p>
                            <div className="mt-4"><Label className="text-xs">Ajustar rango sugerido (demo)</Label><Slider value={range} min={50} max={150} step={5} onValueChange={setRange} className="mt-2" /></div>
                        </div>
                        <div className="flex items-center justify-end"><Button className="rounded-2xl w-full" onClick={() => navigate('/chamba/123')}>Publicar Chamba</Button></div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}