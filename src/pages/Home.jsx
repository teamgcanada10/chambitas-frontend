import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Sparkles, ShieldCheck, Star, Coins, HeartHandshake, Briefcase, Quote } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, GradientCard, Button } from "../components/ui";

export default function Home() {
    const [pagos, setPagos] = useState(9850);
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => {
          setPagos(prev => prev + (Math.floor(Math.random() * 5) + 1));
      }, 5500);
      return () => clearInterval(interval);
    }, []);

    return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card className={`rounded-2xl shadow-xl backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-slate-700/50 border-0 overflow-hidden`}>
          <CardHeader className="text-center p-8 bg-slate-200/50 dark:bg-slate-900/50">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-400"
              >
                Encuentra la ayuda que necesitas.
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-2"
              >
                Conectamos tu necesidad con la persona indicada. Rápido, seguro y con la confianza que solo Chambitas te da.
              </motion.p>
          </CardHeader>
          <CardContent className="space-y-12 p-6 md:p-10">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-600/10 via-slate-100/50 to-slate-100/50 dark:from-purple-600/20 dark:via-slate-900/50 dark:to-slate-900/50 border border-purple-500/20 dark:border-purple-500/30 shadow-inner"
              >
                <p className="text-sm font-medium text-purple-600 dark:text-purple-300 tracking-wider">TOTAL DISTRIBUIDO A NUESTRA COMUNIDAD</p>
                <motion.div 
                  className="text-6xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mt-2"
                  transition={{ duration: 1.5 }}
                  key={pagos}
                >
                  S/ {pagos.toLocaleString('es-PE')}
                </motion.div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">¡Y seguimos creciendo juntos!</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                  >
                    <GradientCard>
                      <h3 className="font-semibold text-2xl flex items-center gap-3 text-slate-900 dark:text-slate-100"><HeartHandshake size={24} className="text-purple-500 dark:text-purple-400" /> Para quienes contratan</h3>
                      <ul className="space-y-4 text-md text-slate-700 dark:text-slate-300 mt-4">
                        <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" /> <span>Encuentra ayuda para esas **chambitas del día a día**.</span></li>
                        <li className="flex items-start gap-3"><ShieldCheck size={20} className="text-emerald-500 mt-1 flex-shrink-0" /> <span>**Perfiles validados con RENIEC** para tu máxima tranquilidad.</span></li>
                        <li className="flex items-start gap-3"><Coins size={20} className="text-emerald-500 mt-1 flex-shrink-0" /> <span>Paga un precio justo con nuestro sistema de sugerencias y pagos seguros.</span></li>
                      </ul>
                    </GradientCard>
                  </motion.div>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                  >
                    <GradientCard>
                        <h3 className="font-semibold text-2xl flex items-center gap-3 text-slate-900 dark:text-slate-100"><Briefcase size={24} className="text-purple-500 dark:text-purple-400" /> Para quienes trabajan</h3>
                        <ul className="space-y-4 text-md text-slate-700 dark:text-slate-300 mt-4">
                          <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" /> <span>Encuentra **chambitas con horarios flexibles** cerca de ti.</span></li>
                          <li className="flex items-start gap-3"><Star size={20} className="text-emerald-500 mt-1 flex-shrink-0" /> <span>Construye tu reputación y accede a mejores oportunidades.</span></li>
                          <li className="flex items-start gap-3"><Sparkles size={20} className="text-emerald-500 mt-1 flex-shrink-0" /> <span>**No necesitas inversión.** Nuestra comisión es justa y solo se aplica al completar el trabajo.</span></li>
                        </ul>
                    </GradientCard>
                  </motion.div>
              </div>
              
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="pt-8"
              >
                <h3 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 tracking-tight">Lo que dicen nuestros usuarios</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50 flex flex-col relative">
                    <Quote className="absolute top-4 left-4 text-purple-500/10 dark:text-purple-500/20" size={48} />
                    <p className="text-slate-700 dark:text-slate-300 text-md italic flex-grow z-10">"Con toda esta inseguridad que vivimos, 'Chambitas' nos ofrece saber a qué personas permitimos entrar en nuestra casa. La verificación con RENIEC y las reseñas de otros usuarios me dan la confianza que necesito para contratar. ¡Es un cambio total!"</p>
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 z-10">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80" alt="Mariana V." className="h-12 w-12 rounded-full object-cover"/>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-lg">Mariana V.</p>
                        <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                          <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50 flex flex-col relative">
                     <Quote className="absolute top-4 left-4 text-purple-500/10 dark:text-purple-500/20" size={48} />
                     <p className="text-slate-700 dark:text-slate-300 text-md italic flex-grow z-10">"Gracias a Chambitas, consigo trabajos extra cerca de mi casa y en mis tiempos libres. La app es súper fácil de usar y el sistema de comisiones que baja con mi reputación me motiva a dar siempre lo mejor. ¡Recomendado!"</p>
                     <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 z-10">
                      <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80" alt="Javier L." className="h-12 w-12 rounded-full object-cover"/>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-lg">Javier L.</p>
                         <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                          <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
          </CardContent>
          <CardFooter className="justify-center p-8 bg-slate-200/50 dark:bg-slate-900/50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2, type: 'spring', stiffness: 200 }}
              >
                <Button 
                  className="rounded-full w-full sm:w-auto text-lg font-bold py-8 px-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transform hover:scale-105 transition-transform" 
                  onClick={() => navigate('/publicar')}
                >
                  ¡Publica tu primera chamba gratis!
                </Button>
              </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
    )
  }