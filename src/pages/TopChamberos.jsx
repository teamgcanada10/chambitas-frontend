import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';
import { Star } from 'lucide-react';

const topWorkersData = [
  {
    id: 1,
    name: "Ana G.",
    specialty: "Limpieza del hogar",
    jobsDone: 50,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    id: 2,
    name: "Pedro M.",
    specialty: "Electricista",
    jobsDone: 45,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    id: 3,
    name: "Sofia R.",
    specialty: "Clases de idiomas",
    jobsDone: 60,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1580489944761-15ad79f37653?w=80&h=80&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Carlos S.",
    specialty: "Fontanero",
    jobsDone: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507003211169-e695c6add61b?w=80&h=80&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Laura P.",
    specialty: "Diseñadora Gráfica",
    jobsDone: 55,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1573496359142-b8d877340b58?w=80&h=80&fit=crop&q=80",
  },
];

export default function TopChamberos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white">Top Chamberos de la Semana</h2>
      <p className="text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Conoce a los trabajadores más destacados y mejor valorados de nuestra plataforma.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topWorkersData.map((worker) => (
          <Card key={worker.id} className="glassmorphism flex flex-col items-center text-center p-6">
            <img src={worker.image} alt={worker.name} className="w-24 h-24 rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{worker.name}</h3>
            <p className="text-slate-700 dark:text-slate-300">{worker.specialty}</p>
            <div className="flex items-center gap-1 text-amber-400 mt-2">
              <Star size={20} fill="currentColor" />
              <span className="font-bold text-lg">{worker.rating.toFixed(1)}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">({worker.jobsDone} trabajos)</span>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}