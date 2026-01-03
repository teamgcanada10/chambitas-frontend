import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, Button } from '../components/ui';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { completedJobsData } from '../data/jobs';
import { jobAnnouncementsData } from '../data/announcements';

const CompletedJobCard = ({ job }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden rounded-xl glassmorphism hover:shadow-lg transition-all duration-300"
  >
    <div className="relative h-40 overflow-hidden">
      <img src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">{job.title}</h4>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{job.worker}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{job.jobsDone} trabajos</p>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={14} fill="currentColor" />
          <span className="font-bold text-xs">{job.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const JobAnnouncementCard = ({ announcement }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden rounded-xl glassmorphism hover:shadow-lg transition-all duration-300"
  >
    <div className="relative h-40 overflow-hidden">
      <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">{announcement.title}</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{announcement.description}</p>
      <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mt-3">{announcement.payment}</p>
    </div>
  </motion.div>
);


export default function Chambas() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* CHAMBITAS TERMINADAS SECTION */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Galería de Chambas</h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8">
            Aquí puedes ver el excelente trabajo de nuestros chamberos. ¡Inspírate con los resultados!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {completedJobsData.map((job) => (
              <CompletedJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* JOB ANNOUNCEMENTS SECTION */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Chambitas Disponibles</h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8">
            Conoce las chambitas que están disponibles en este momento. ¡Postúlate y gana dinero!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobAnnouncementsData.map((announcement) => (
              <JobAnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="pt-8 text-center">
          <Button 
            className="rounded-full px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 shadow-lg"
            onClick={() => navigate('/publicar')}
          >
            Quiero Publicar una Chambita
          </Button>
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