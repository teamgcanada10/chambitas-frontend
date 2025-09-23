import React from 'react';
import { Building } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900/50 glassmorphism mt-12 rounded-lg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <Building className="text-primary-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Chambitas</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tu marketplace de confianza</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Términos y Condiciones</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Política de Privacidad</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Política de Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contáctanos</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:soporte@chambitas.com" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">soporte@chambitas.com</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Misión y Visión</h3>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Nuestra misión es conectar a las personas que necesitan ayuda con trabajadores de confianza, de forma rápida y segura. Aspiramos a ser la plataforma líder de servicios locales en Latinoamérica.</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} Chambitas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;