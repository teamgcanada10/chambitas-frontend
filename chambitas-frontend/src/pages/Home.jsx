import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ShieldCheck, Star, Coins, HeartHandshake, Briefcase, Quote, Wrench, Paintbrush, BadgeCheck, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, Button } from "../components/ui";
import { GradientCard } from "../components/ui";
import { completedJobsData as completedJobs } from "../data/jobs";
import { jobAnnouncementsData as jobAnnouncements } from "../data/announcements";
import { AnimatedCoin } from "../components/CoinIcon";
import { ParticlesBackground } from "../components/ParticlesBackground";

// Audience images (rotating block)
const AUDIENCE_IMAGE_CLIENT =
  "https://dl.dropboxusercontent.com/scl/fi/5p0rb1lzv2adrxk9djy0i/homeimagen.png?rlkey=jkx94jadtib7q9l8wcy8bwkxo&dl=1";

const AUDIENCE_IMAGE_WORKER =
  "https://dl.dropboxusercontent.com/scl/fi/91c9fxjdhfia4opc6qr32/homeimagen2.png?rlkey=zkrac1sl169253g39oyj23v5z&dl=1";

const carouselImages = [
  "/Visual/1.png",
  "/Visual/2.png",
  "/Visual/3.png",
  "/Visual/4.png",
  "/Visual/5.png",
  "/Visual/6.png"
];

const CompletedJobCard = ({ job, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    className="group relative overflow-hidden rounded-xl glassmorphism hover:shadow-lg transition-all duration-300 cursor-pointer p-6 flex flex-col"
  >
    <div className="flex gap-4 h-full">
      {/* IMAGE */}
      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
        <img src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
      </div>
      
      {/* INFO */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">{job.title}</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{job.description || "Proyecto completado exitosamente"}</p>
        </div>
        
        {/* CALIFICACION */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{job.worker}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{job.jobsDone} trabajos</p>
          </div>
          <div className="flex items-center gap-1 text-amber-400 ml-auto">
            <Star size={14} fill="currentColor" />
            <span className="font-bold text-xs">{job.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const JobAnnouncementCard = ({ announcement, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    className="group relative overflow-hidden rounded-xl glassmorphism hover:shadow-lg transition-all duration-300 cursor-pointer p-6 flex flex-col"
  >
    <div className="flex gap-4 h-full">
      {/* IMAGE */}
      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
        <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
      </div>
      
      {/* INFO */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">{announcement.title}</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{announcement.description}</p>
        </div>
        
        {/* PRICE */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Presupuesto</p>
          </div>
          <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{announcement.payment}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
    const [pagos, setPagos] = useState(9850);
    const [currentJobIndex, setCurrentJobIndex] = useState(0);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const [currentImageIndices, setCurrentImageIndices] = useState([0, 1]);
    const [audienceIndex, setAudienceIndex] = useState(0);
    const navigate = useNavigate();

    const audiences = useMemo(() => ([
      {
        key: "client",
        title: "Contrata con confianza",
        eyebrow: "Para quienes anuncian trabajo",
        image: AUDIENCE_IMAGE_CLIENT,
        bullets: [
          { icon: ShieldCheck, text: "Encuentra ayuda para tus chambitas del dia a dia con perfiles verificados." },
          { icon: BadgeCheck, text: "Perfiles verificados con documento de identidad para mayor tranquilidad." },
          { icon: Coins, text: "Precio justo y pagos seguros con nuestro sistema de comisiones claras." },
        ],
      },
      {
        key: "worker",
        title: "Convierte tu tiempo en dinero",
        eyebrow: "Para quienes buscan trabajo",
        image: AUDIENCE_IMAGE_WORKER,
        bullets: [
          { icon: HeartHandshake, text: "Encuentra chambitas con horarios flexibles cerca de ti." },
          { icon: Star, text: "Construye tu reputacion y accede a mejores oportunidades." },
          { icon: Sparkles, text: "No necesitas inversion. La comision solo se cobra al completar la chamba." },
        ],
      }
    ]), []);

    const currentAudience = audiences[audienceIndex];
    const [audienceLead, ...audienceRest] = currentAudience.title.split(" ");
    const audienceTail = audienceRest.join(" ");

    useEffect(() => {
      const pagosInterval = setInterval(() => {
          setPagos(prev => prev + (Math.floor(Math.random() * 5) + 1));
      }, 5500);

      const jobsInterval = setInterval(() => {
        setCurrentJobIndex(prev => (prev + 1) % completedJobs.length);
      }, 4500);

      const announcementsInterval = setInterval(() => {
        setCurrentAnnouncementIndex(prev => (prev + 1) % jobAnnouncements.length);
      }, 4500);

      const imageCarouselInterval = setInterval(() => {
        setCurrentImageIndices(prev => {
          const nextIndex1 = (prev[0] + 2) % carouselImages.length;
          const nextIndex2 = (prev[1] + 2) % carouselImages.length;
          return [nextIndex1, nextIndex2];
        });
      }, 4500);

      const audienceInterval = setInterval(() => {
        setAudienceIndex(prev => (prev + 1) % audiences.length);
      }, 5000);

      return () => {
        clearInterval(pagosInterval);
        clearInterval(jobsInterval);
        clearInterval(announcementsInterval);
        clearInterval(imageCarouselInterval);
        clearInterval(audienceInterval);
      };
    }, [audiences.length, completedJobs.length, jobAnnouncements.length]);

    return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card>
          {/* HERO SECTION */}
          <CardHeader className="text-center p-8 bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-50 dark:bg-gradient-to-br dark:from-slate-900/20 dark:via-slate-900/30 dark:to-slate-900/20 relative overflow-hidden">
              <ParticlesBackground intensity="high" />
              <div className="absolute -top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400/30 to-purple-400/30 blur-3xl"></div>
              <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 blur-3xl"></div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50"
              >
                <span className="block text-amber-400 dark:text-amber-300">Encuentra lo que buscas</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-indigo-300 dark:to-purple-300">Ofrece lo que sabes</span>
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-3"
              >
                Conectamos necesidades con oportunidades. Rapido, seguro y con perfiles verificados.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative mt-6 flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Button 
                  className="rounded-full px-6 py-6 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-lg hover:from-amber-300 hover:to-yellow-400"
                  onClick={() => navigate('/chambas')}
                >
                  Encuentra una chambita
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-full px-6 py-6 text-base font-semibold border-2 border-indigo-300/70 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  onClick={() => navigate('/publicar')}
                >
                  Ofrece tus servicios
                </Button>
              </motion.div>
          </CardHeader>

          {/* MAIN CONTENT */}
          <CardContent className="space-y-12 p-6 md:p-10">
            {/* CAROUSEL SECTION */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                  <AnimatePresence>
                    <motion.img
                      key={carouselImages[currentImageIndices[0]]}
                      src={carouselImages[currentImageIndices[0]]}
                      alt="Chambitas Carousel 1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                  <AnimatePresence>
                    <motion.img
                      key={carouselImages[currentImageIndices[1]]}
                      src={carouselImages[currentImageIndices[1]]}
                      alt="Chambitas Carousel 2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* MONEY COUNTER */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="relative text-center p-8 rounded-2xl bg-gradient-to-br from-primary-600/10 via-slate-100/50 to-slate-100/50 dark:from-primary-600/20 dark:via-slate-900/50 dark:to-slate-900/50 border border-primary-500/20 dark:border-primary-500/30 shadow-inner overflow-hidden"
              >
                <ParticlesBackground intensity="low" />
                <AnimatedCoin delay={0} className="top-2 left-10 z-20" />
                <AnimatedCoin delay={1.5} className="top-1/3 right-8 z-20" />
                <AnimatedCoin delay={3} className="bottom-10 left-1/4 z-20" />
                <AnimatedCoin delay={4.5} className="bottom-8 right-1/4 z-20" />

                <p className="relative z-10 text-sm font-bold text-primary-700 dark:text-primary-300 tracking-wider uppercase">TOTAL DISTRIBUIDO A NUESTRA COMUNIDAD</p>
                <motion.div
                  className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-tight mt-3 drop-shadow-2xl"
                  transition={{ duration: 1.5 }}
                  key={pagos}
                >
                  S/ {pagos.toLocaleString('es-PE')}
                </motion.div>
                <p className="relative z-10 text-base font-semibold text-slate-600 dark:text-slate-300 mt-3">¡Y seguimos creciendo juntos!</p>
              </motion.div>

            {/* CHAMBAS CAROUSEL SECTION */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* COMPLETED JOBS */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Galería de Chambas</h3>
                  <div className="h-full">
                    <AnimatePresence mode="wait">
                      <CompletedJobCard 
                        key={`completed-${currentJobIndex}`}
                        job={completedJobs[currentJobIndex]}
                        onClick={() => navigate('/chambas')}
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* JOB ANNOUNCEMENTS */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Chambitas Disponibles</h3>
                  <div className="h-full">
                    <AnimatePresence mode="wait">
                      <JobAnnouncementCard 
                        key={`announcement-${currentAnnouncementIndex}`}
                        announcement={jobAnnouncements[currentAnnouncementIndex]}
                        onClick={() => navigate('/chambas')}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DUAL SECTION - CLIENT & WORKER */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-indigo-950/95 to-slate-950/95 shadow-2xl"
              >
                <ParticlesBackground intensity="medium" />
                
                <div className="relative grid gap-8 md:grid-cols-2 items-center p-6 sm:p-10">
                  {/* TEXT SECTION */}
                  <motion.div
                    key={audienceIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200/90">
                      {currentAudience.eyebrow}
                    </span>
                    <h3 className="mt-3 text-4xl sm:text-5xl font-bold text-white leading-tight">
                      <span className="text-amber-300">{audienceLead}</span> {audienceTail}
                    </h3>
                    <p className="mt-4 text-lg text-slate-200/90">
                      {currentAudience.key === "client"
                        ? "Encuentra ayuda confiable para tus chambitas diarias con perfiles verificados y evaluados."
                        : "Convierte tu talento en ingresos con chambitas reales cerca de ti, con horarios flexibles."}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {currentAudience.bullets.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.text} className="flex items-start gap-4">
                            <Icon className="mt-1 text-emerald-300 flex-shrink-0" size={20} />
                            <span className="text-slate-100/90 text-base">{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>

                  {/* IMAGE SECTION */}
                  <motion.div 
                    className="relative"
                    key={`audience-image-${audienceIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute -inset-8 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-purple-400/10 to-indigo-400/20 blur-3xl"></div>
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
                      <img
                        src={currentAudience.image}
                        alt={currentAudience.title}
                        className="w-full h-full object-cover object-[center_35%]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40"></div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/10"></div>
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-950/50 to-transparent backdrop-blur-[2px]"></div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-950/50 to-transparent backdrop-blur-[2px]"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
            {/* TESTIMONIALS */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="pt-8"
              >
                <h3 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100 mb-10 tracking-tight">Lo que dicen nuestros usuarios</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-2xl glassmorphism flex flex-col relative">
                    <Quote className="absolute top-4 left-4 text-primary-500/10 dark:text-primary-500/20" size={48} />
                    <p className="text-slate-700 dark:text-slate-300 text-base italic flex-grow z-10 leading-relaxed">"Con toda esta inseguridad que vivimos, 'Chambitas' nos ofrece saber a qué personas permitimos entrar en nuestra casa. La verificación con RENIEC y las reseñas de otros usuarios me dan la confianza que necesito. ¡Es un cambio total!"</p>
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 z-10">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80" alt="Mariana V." className="h-14 w-14 rounded-full object-cover"/>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">Mariana V.</p>
                        <div className="flex items-center gap-0.5 text-amber-400 mt-2">
                          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 rounded-2xl glassmorphism flex flex-col relative">
                     <Quote className="absolute top-4 left-4 text-primary-500/10 dark:text-primary-500/20" size={48} />
                     <p className="text-slate-700 dark:text-slate-300 text-base italic flex-grow z-10 leading-relaxed">"Gracias a Chambitas, consigo trabajos extra cerca de mi casa y en mis tiempos libres. La app es súper fácil de usar y el sistema de comisiones que baja con mi reputación me motiva a dar siempre lo mejor. ¡Recomendado!"</p>
                     <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 z-10">
                      <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80" alt="Javier L." className="h-14 w-14 rounded-full object-cover"/>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">Javier L.</p>
                        <div className="flex items-center gap-0.5 text-amber-400 mt-2">
                          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            {/* CATEGORIES */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="pt-12"
              >
                <h3 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100 mb-10 tracking-tight">Explora nuestras categorías</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                  <GradientCard className="p-6 hover:scale-110 transition-transform">
                    <Wrench size={36} className="mx-auto text-primary-500 dark:text-primary-400"/>
                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Reparaciones</p>
                  </GradientCard>
                  <GradientCard className="p-6 hover:scale-110 transition-transform">
                    <Paintbrush size={36} className="mx-auto text-primary-500 dark:text-primary-400"/>
                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Pintura</p>
                  </GradientCard>
                  <GradientCard className="p-6 hover:scale-110 transition-transform">
                    <Briefcase size={36} className="mx-auto text-primary-500 dark:text-primary-400"/>
                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Limpieza</p>
                  </GradientCard>
                  <GradientCard className="p-6 hover:scale-110 transition-transform">
                    <Sparkles size={36} className="mx-auto text-primary-500 dark:text-primary-400"/>
                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Mascotas</p>
                  </GradientCard>
                  <GradientCard className="p-6 hover:scale-110 transition-transform">
                    <Coins size={36} className="mx-auto text-primary-500 dark:text-primary-400"/>
                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Clases</p>
                  </GradientCard>
                </div>
              </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    )
  }
