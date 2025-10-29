import React from 'react';

const Privacidad = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Política de Privacidad</h1>
      <div className="space-y-4">
        <p>Recopilamos datos básicos (nombre, correo, teléfono) solo para el funcionamiento de la plataforma.</p>
        <p>No compartimos tu información con terceros sin tu consentimiento.</p>
        <p>Puedes solicitar la eliminación de tus datos escribiendo a: <a href="mailto:soporte@chambitas.com" className="text-primary-500">soporte@chambitas.com</a>.</p>
        <p>Usamos sistemas de seguridad para proteger la información de nuestros usuarios.</p>
      </div>
    </div>
  );
};

export default Privacidad;