import React from 'react';

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Test de Tailwind básico */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Test de Tailwind CSS
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Si puedes ver colores y estilos, Tailwind está funcionando.
          </p>
        </div>

        {/* Test de emojis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Test de Emojis
          </h2>
          <div className="grid grid-cols-4 gap-4 text-4xl">
            <div className="text-center">
              <span>🪙</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Moneda</p>
            </div>
            <div className="text-center">
              <span>💰</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Bolsa dinero</p>
            </div>
            <div className="text-center">
              <span>💵</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Billete</p>
            </div>
            <div className="text-center">
              <span>💎</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Diamante</p>
            </div>
          </div>
        </div>

        {/* Test de animaciones */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Test de Animaciones
          </h2>
          <div className="flex justify-around">
            <div className="animate-bounce text-4xl">🪙</div>
            <div className="animate-pulse text-4xl">🪙</div>
            <div className="animate-spin text-4xl">🪙</div>
            <div className="animate-float text-4xl">🪙</div>
          </div>
        </div>

        {/* Test de glassmorphism */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
          <div className="relative glassmorphism rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Test de Glassmorphism
            </h2>
            <p className="text-white/90">
              Este es un efecto de vidrio esmerilado.
            </p>
          </div>
        </div>

        {/* Test de colores personalizados */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Test de Colores Primary
          </h2>
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-primary-50 rounded"></div>
            <div className="w-12 h-12 bg-primary-100 rounded"></div>
            <div className="w-12 h-12 bg-primary-200 rounded"></div>
            <div className="w-12 h-12 bg-primary-300 rounded"></div>
            <div className="w-12 h-12 bg-primary-400 rounded"></div>
            <div className="w-12 h-12 bg-primary-500 rounded"></div>
            <div className="w-12 h-12 bg-primary-600 rounded"></div>
            <div className="w-12 h-12 bg-primary-700 rounded"></div>
            <div className="w-12 h-12 bg-primary-800 rounded"></div>
            <div className="w-12 h-12 bg-primary-900 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
