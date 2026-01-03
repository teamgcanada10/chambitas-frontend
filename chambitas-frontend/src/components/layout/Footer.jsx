import React from 'react';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900/50 glassmorphism mt-12 rounded-lg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src="/Chambitas.png" alt="Chambitas Logo" className="w-32 h-32 hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/terminos" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Política de Privacidad</Link></li>
              <li><Link to="/cookies" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Política de Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contáctanos</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="mailto:soporte@chambitas.com" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">soporte@chambitas.com</a></li>
              <li><Link to="/preguntas-frecuentes" className="text-slate-600 dark:text-slate-400 hover:text-primary-500">Preguntas Frecuentes</Link></li>
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
