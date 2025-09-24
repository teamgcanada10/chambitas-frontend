import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';
import { Star } from 'lucide-react';

const completedJobsData = [
  {
    id: 1,
    title: "Instalación de luminarias LED",
    description: "Instalación de 10 luminarias LED en oficina, incluyendo cableado y configuración.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop&q=60",
    worker: "Roberto G.",
    jobsDone: 35,
    rating: 4.8,
    date: "15/09/2025",
    clientReview: "Excelente trabajo, muy profesional y rápido. Las luces quedaron perfectas."
  },
  {
    id: 2,
    title: "Mantenimiento de aire acondicionado",
    description: "Limpieza y revisión completa de 3 unidades de aire acondicionado split.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop&q=60",
    worker: "Ana M.",
    jobsDone: 28,
    rating: 4.9,
    date: "12/09/2025",
    clientReview: "Muy satisfecha con el servicio. El técnico fue muy amable y dejó todo impecable."
  },
  {
    id: 3,
    title: "Diseño y desarrollo de página web",
    description: "Creación de sitio web responsivo para pequeño negocio, con carrito de compras.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop&q=60",
    worker: "Javier L.",
    jobsDone: 18,
    rating: 5.0,
    date: "08/09/2025",
    clientReview: "Superó mis expectativas. El diseño es moderno y la funcionalidad impecable. ¡Recomendado!"
  },
  {
    id: 4,
    title: "Clases de inglés conversacional",
    description: "10 sesiones de clases de inglés online, enfocadas en fluidez y pronunciación.",
    image: "https://images.unsplash.com/photo-1535982805529-16c67711811e?w=500&h=500&fit=crop&q=60",
    worker: "Sofía P.",
    jobsDone: 42,
    rating: 4.7,
    date: "01/09/2025",
    clientReview: "Las clases son muy dinámicas y la profesora tiene mucha paciencia. He mejorado mucho mi inglés."
  },
  {
    id: 5,
    title: "Reparación de lavadora",
    description: "Diagnóstico y reparación de lavadora que no centrifugaba. Se cambió una pieza.",
    image: "https://images.unsplash.com/photo-1582213782179-e0dce3817929?w=500&h=500&fit=crop&q=60",
    worker: "Diego R.",
    jobsDone: 22,
    rating: 4.6,
    date: "28/08/2025",
    clientReview: "Rápido y eficiente. La lavadora funciona como nueva. Muy buen servicio."
  },
  {
    id: 6,
    title: "Instalación de cámaras de seguridad",
    description: "Instalación de 4 cámaras de seguridad con DVR y configuración de acceso remoto.",
    image: "https://images.unsplash.com/photo-1588072432904-aa577836347d?w=500&h=500&fit=crop&q=60",
    worker: "Luis F.",
    jobsDone: 19,
    rating: 4.9,
    date: "20/08/2025",
    clientReview: "Excelente trabajo, muy ordenado y profesional. Me explicó todo el funcionamiento."
  },
  {
    id: 7,
    title: "Pintado de fachada de casa",
    description: "Pintado completo de fachada de casa de dos pisos. Incluye preparación de superficie.",
    image: "https://images.unsplash.com/photo-1596495577881-e615b0e6a7e8?w=500&h=500&fit=crop&q=80",
    worker: "Mariana C.",
    jobsDone: 10,
    rating: 4.7,
    date: "10/08/2025",
    clientReview: "La casa quedó hermosa, el color es vibrante y el acabado impecable. Muy contenta."
  },
  {
    id: 8,
    title: "Reparación de computadora lenta",
    description: "Optimización de sistema operativo, limpieza de virus y actualización de drivers.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop&q=60",
    worker: "Carlos S.",
    jobsDone: 27,
    rating: 4.8,
    date: "05/08/2025",
    clientReview: "Mi computadora vuela ahora, antes era un dolor de cabeza. Gracias por el excelente servicio."
  },
  {
    id: 9,
    title: "Clases de guitarra para principiantes",
    description: "8 clases personalizadas de guitarra acústica, desde cero hasta acordes básicos.",
    image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=500&h=500&fit=crop&q=60",
    worker: "Andrea V.",
    jobsDone: 14,
    rating: 5.0,
    date: "25/07/2025",
    clientReview: "Aprendí muchísimo en poco tiempo. La profesora es muy didáctica y paciente."
  },
  {
    id: 10,
    title: "Servicio de catering para evento",
    description: "Preparación y entrega de bocaditos y bebidas para evento de 30 personas.",
    image: "https://images.unsplash.com/photo-1582213782179-e0dce3817929?w=500&h=500&fit=crop&q=60",
    worker: "Gabriela P.",
    jobsDone: 12,
    rating: 4.9,
    date: "18/07/2025",
    clientReview: "Todo delicioso y muy bien presentado. Mis invitados quedaron encantados. ¡Volveré a contratarla!"
  }
];

export default function Chambas() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white">Trabajos Completados</h2>
        <p className="text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explora una selección de trabajos exitosamente completados por nuestros talentosos chamberos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedJobsData.map((job) => (
            <Card key={job.id} className="glassmorphism">
              <CardHeader>
                <div className="relative cursor-pointer" onClick={() => setSelectedImage(job.image)}>
                  <img src={job.image} alt={job.title} className="w-full h-48 object-cover rounded-md mb-4" />
                  <img src="/Chambitas.png" alt="Watermark" className="absolute bottom-2 right-2 w-12 h-12 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{job.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300">{job.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.worker}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{job.jobsDone} trabajos completados</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold text-sm">{job.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm italic text-slate-600 dark:text-slate-400 mt-2">"{job.clientReview}"</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completado el: {job.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}