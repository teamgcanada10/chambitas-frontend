import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';

const jobAnnouncementsData = [
  {
    id: 1,
    title: "Se necesita jardinero",
    description: "Para mantenimiento de jardín pequeño en Miraflores. Pago por hora.",
    payment: "S/ 50 por hora",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Limpieza de departamento",
    description: "Limpieza profunda de departamento de 2 habitaciones en San Isidro.",
    payment: "S/ 120",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Paseador de perros",
    description: "Paseo de 1 hora para perro mediano en Surco.",
    payment: "S/ 25 por paseo",
    image: "https://images.unsplash.com/photo-1537151608828-3b2f2ba24c69?w=500&h=500&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Clases de guitarra",
    description: "Clases particulares de guitarra para principiantes.",
    payment: "S/ 70 por hora",
    image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=500&h=500&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Soporte técnico para laptop",
    description: "Formateo e instalación de programas en laptop.",
    payment: "S/ 150",
    image: "https://images.unsplash.com/photo-1589422332093-3c2175a83823?w=500&h=500&fit=crop&q=60",
  },
];

export default function Anuncios() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white">Anuncios de Trabajos</h2>
      <p className="text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Explora las últimas oportunidades de trabajo publicadas por nuestra comunidad.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobAnnouncementsData.map((announcement) => (
          <Card key={announcement.id} className="glassmorphism">
            <CardHeader>
              <img src={announcement.image} alt={announcement.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{announcement.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">{announcement.description}</p>
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-4">{announcement.payment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}