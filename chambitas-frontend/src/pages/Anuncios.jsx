import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/ui';
import { jobAnnouncementsData } from '../data/announcements';

export default function Anuncios() {
  useEffect(() => {
    document.title = 'Últimas Chambitas | Chambitas';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white">Últimas Chambitas</h2>
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