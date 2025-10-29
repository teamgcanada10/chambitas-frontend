import React from 'react';

const Terminos = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Términos y Condiciones
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
          <p>
            Chambitas es una plataforma digital que conecta a personas que ofrecen y buscan servicios rápidos, seguros y confiables. La empresa no se hace responsable por acuerdos realizados entre usuarios fuera de la plataforma.
          </p>

          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Al registrarse en Chambitas, el usuario acepta:
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Usar la plataforma únicamente para fines legales.</li>
            <li>Respetar a los demás usuarios y cumplir con los acuerdos pactados.</li>
            <li>No publicar servicios falsos, ofensivos o que infrinjan la ley.</li>
          </ul>

          <p>
            Chambitas se reserva el derecho de suspender cuentas que incumplan las reglas.
          </p>
          
          <p>
            Los pagos y acuerdos son responsabilidad directa entre oferente y cliente, salvo que se indique lo contrario en futuras actualizaciones de la plataforma.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terminos;
