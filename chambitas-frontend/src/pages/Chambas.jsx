import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';
import { Star } from 'lucide-react';
import { completedJobsData } from '../data/jobs';


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
        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white">Chambitas Terminadas</h2>
        <p className="text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Aquí puedes ver el excelente trabajo de nuestros chamberos. ¡Inspírate con los resultados!
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