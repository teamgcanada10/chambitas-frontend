import React from 'react';
import { Coins } from 'lucide-react';

// Componente para mostrar monedas con fallback
export default function CoinIcon({ className = "", size = 24, useEmoji = false }) {
  // Intentar usar emoji primero, pero con fallback a icono
  if (useEmoji) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <span className="font-emoji">💰</span>
      </span>
    );
  }
  
  // Usar el icono de Lucide como fallback principal
  return <Coins size={size} className={`text-yellow-500 ${className}`} />;
}

// Componente de moneda 3D premium animada
export function AnimatedCoin({ delay = 0, className = "" }) {
  return (
    <div 
      className={`absolute ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animation: 'float 6s ease-in-out infinite, spin 8s linear infinite'
      }}
    >
      {/* Moneda con efecto 3D y sombras */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur-xl opacity-50"></div>
        
        {/* Moneda principal */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-full shadow-2xl border-2 border-yellow-600/30 flex items-center justify-center">
          {/* Inner circle for depth */}
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full"></div>
          
          {/* Dollar sign or S/ */}
          <span className="relative text-2xl sm:text-3xl font-bold text-yellow-900/80 drop-shadow-lg">
            S/
          </span>
          
          {/* Shine effect */}
          <div className="absolute top-1 right-2 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
        </div>
      </div>
    </div>
  );
}

// Componente de moneda estática premium
export function PremiumCoin({ size = "medium" }) {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-24 h-24"
  };
  
  return (
    <div className="relative inline-block">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur-lg opacity-40"></div>
      
      {/* Moneda principal */}
      <div className={`relative ${sizeClasses[size]} bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-full shadow-xl border-2 border-yellow-600/30 flex items-center justify-center`}>
        {/* Inner circle for depth */}
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full"></div>
        
        {/* Currency symbol */}
        <span className={`relative font-bold text-yellow-900/80 drop-shadow-lg ${
          size === 'large' ? 'text-4xl' : size === 'medium' ? 'text-2xl' : 'text-lg'
        }`}>
          S/
        </span>
        
        {/* Shine effect */}
        <div className="absolute top-1 right-2 w-3 h-3 bg-white/50 rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
