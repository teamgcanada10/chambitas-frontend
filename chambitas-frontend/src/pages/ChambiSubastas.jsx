import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, Button } from '../components/ui';
import { Tag, Users, Clock } from 'lucide-react';

const auctionData = [
  {
    id: 1,
    title: "Diseño de logo para cafetería",
    description: "Busco un diseñador creativo para crear un logo moderno y amigable para mi nueva cafetería. El concepto es rústico y acogedor.",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&h=500&fit=crop&q=60",
    user: "Ana P.",
    userImage: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    offersReceived: 8,
    priceRange: [150, 250],
    deadline: "2 días restantes",
  },
  {
    id: 2,
    title: "Reparación de laptop que no enciende",
    description: "Mi laptop no da señales de vida. Necesito un técnico que pueda diagnosticarla y, si es posible, repararla. Es una HP Pavilion.",
    image: "https://images.unsplash.com/photo-1589422332093-3c2175a83823?w=500&h=500&fit=crop&q=60",
    user: "Carlos V.",
    userImage: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    offersReceived: 5,
    priceRange: [100, 180],
    deadline: "5 días restantes",
  },
  {
    id: 3,
    title: "Creación de video corto para redes sociales",
    description: "Necesito un editor de video para un reel de 30 segundos para Instagram. El material ya está grabado, solo falta la magia de la edición.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=500&fit=crop&q=60",
    user: "Mariela F.",
    userImage: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    offersReceived: 12,
    priceRange: [80, 150],
    deadline: "1 día restante",
  },
    {
    id: 4,
    title: "Pintar una habitación de 4x4 metros",
    description: "Quiero renovar mi estudio. Necesito a alguien que pueda pintar las 4 paredes de un color nuevo. Yo pongo la pintura, tú la mano de obra.",
    image: "https://images.unsplash.com/photo-1597586124394-31d3d9b3d29a?w=500&h=500&fit=crop&q=60",
    user: "Jorge L.",
    userImage: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    offersReceived: 4,
    priceRange: [120, 200],
    deadline: "6 días restantes",
  },
  {
    id: 5,
    title: "Transcripción de una entrevista de 1 hora",
    description: "Tengo una grabación de audio de una entrevista importante y necesito que alguien la transcriba a texto con la mayor fidelidad posible.",
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=500&h=500&fit=crop&q=60",
    user: "Lucía M.",
    userImage: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    offersReceived: 15,
    priceRange: [60, 100],
    deadline: "3 días restantes",
  },
  {
    id: 6,
    title: "Armado de mueble de TV tipo rack",
    description: "Compré un mueble en caja y las instrucciones parecen en otro idioma. Busco a alguien paciente y con herramientas para que lo arme por mí.",
    image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?w=500&h=500&fit=crop&q=60",
    user: "David S.",
    userImage: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
    offersReceived: 7,
    priceRange: [70, 120],
    deadline: "4 días restantes",
  },
];

export default function ChambiSubastas() {
  useEffect(() => {
    document.title = 'Chambi Subastas | Chambitas';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Chambi Subastas</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-2">
          ¿No sabes cuánto cobrar? Publica tu chamba y deja que los chamberos te envíen sus mejores ofertas. ¡Tú eliges la que más te convenga!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionData.map((auction) => (
          <Card key={auction.id} className="glassmorphism flex flex-col">
            <CardHeader>
              <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{auction.title}</h3>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">{auction.description}</p>
              
              <div className="flex items-center gap-3 my-4">
                <img src={auction.userImage} alt={auction.user} className="w-10 h-10 rounded-full"/>
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Publicado por {auction.user}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Rango de oferta: S/{auction.priceRange[0]} - S/{auction.priceRange[1]}</p>
                </div>
              </div>

              <div className="flex-grow" />

              <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex items-center gap-1.5">
                      <Users size={16} />
                      <span>{auction.offersReceived} ofertas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>{auction.deadline}</span>
                  </div>
              </div>

              <Button className="w-full mt-4">¡Manda tu oferta ya!</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
