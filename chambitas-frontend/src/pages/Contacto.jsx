import React from 'react';

const Contacto = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contáctanos</h1>
      <div className="space-y-4">
        <p>📩 Correo: <a href="mailto:soporte@chambitas.com" className="text-primary-500">soporte@chambitas.com</a></p>
        <p>📱 WhatsApp: (aquí colocarías tu número oficial de soporte)</p>
        <p>📍 Dirección: (si decides poner una dirección física o dejarlo solo digital).</p>
      </div>
    </div>
  );
};

export default Contacto;