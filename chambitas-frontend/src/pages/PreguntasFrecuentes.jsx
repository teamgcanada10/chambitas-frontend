import React from 'react';

const PreguntasFrecuentes = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Preguntas Frecuentes (FAQ)</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">1. ¿Qué es Chambitas?</h2>
          <p>Es una plataforma que conecta a personas que necesitan resolver tareas rápidas con trabajadores que ofrecen sus servicios.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">2. ¿Cómo publico una chamba?</h2>
          <p>Regístrate, ingresa al panel y selecciona “Publicar chamba”.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">3. ¿Cómo contrato a alguien?</h2>
          <p>Busca el servicio que necesitas, revisa el perfil del trabajador y contáctalo directamente desde la plataforma.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">4. ¿Chambitas cobra comisión?</h2>
          <p>Actualmente el uso es gratuito (puedes cambiarlo si decides monetizar después).</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">5. ¿Qué hago si tengo un problema con un trabajador o cliente?</h2>
          <p>Puedes reportar el incidente en la sección de soporte o escribirnos a <a href="mailto:soporte@chambitas.com" className="text-primary-500">soporte@chambitas.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;