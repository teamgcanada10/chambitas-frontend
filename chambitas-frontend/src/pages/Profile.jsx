import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent, CardFooter, Button, Input, Label, Textarea, Badge } from '../components/ui';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export default function Profile() {
  const { user, setUser, updateProfile, switchProfile, refreshUser } = useAuth();

  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [switching, setSwitching] = useState(false);

  const [form, setForm] = useState({
    name: '',
    dni: '',
    phone: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        dni: user.dni || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('picture', file);

    const token = localStorage.getItem('chambitas-token');

    try {
      const response = await axios.post(`${API_URL}/profile/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.imageUrl) {
        setUser({ ...user, imageUrl: response.data.imageUrl });
        alert('Foto actualizada.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('No se pudo subir la foto.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { name, dni, phone, location, bio } = form;
    const res = await updateProfile({ name, dni, phone, location, bio });
    setSaving(false);
    if (res.success) {
      alert('Perfil guardado.');
    } else {
      alert(res.message || 'Error guardando perfil.');
    }
  };

  const handleSwitch = async (profile) => {
    if (!user) return;
    if (user.activeProfile === profile) return;
    setSwitching(true);
    const res = await switchProfile(profile);
    setSwitching(false);
    if (!res.success) alert(res.message || 'No se pudo cambiar el perfil.');
  };

  const worker = user?.profiles?.worker || { rating: 0, ratingsCount: 0 };
  const advertiser = user?.profiles?.advertiser || { rating: 0, ratingsCount: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header card */}
      <Card className="rounded-2xl shadow-xl backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
        <CardHeader>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Mi Perfil</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and identity */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img src={user?.imageUrl} alt={user?.name} className="w-24 h-24 rounded-full border-2 border-white dark:border-slate-700 shadow" />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  Modo actual: {user?.activeProfile === 'advertiser' ? 'Publico chambas' : 'Busco chamba'}
                </span>
                {user?.dni && (
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700/60">
                    DNI: {user.dni}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ratings summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-sm text-slate-500 mb-1">Busco chamba (Trabajador)</div>
              <div className="text-lg font-semibold">⭐ {worker.rating?.toFixed(1)} <span className="text-sm text-slate-500">({worker.ratingsCount})</span></div>
            </div>
            <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-sm text-slate-500 mb-1">Publico chambas (Anunciante)</div>
              <div className="text-lg font-semibold">⭐ {advertiser.rating?.toFixed(1)} <span className="text-sm text-slate-500">({advertiser.ratingsCount})</span></div>
            </div>
          </div>

          {/* Switch active profile */}
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm text-slate-600 dark:text-slate-300">Cambiar modo:</span>
            <Button
              type="button"
              className={`rounded-full px-5 ${user?.activeProfile === 'worker' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
              onClick={() => handleSwitch('worker')}
              disabled={switching}
            >
              Busco chamba
            </Button>
            <Button
              type="button"
              className={`rounded-full px-5 ${user?.activeProfile === 'advertiser' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
              onClick={() => handleSwitch('advertiser')}
              disabled={switching}
            >
              Publico chambas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit profile and avatar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal data form */}
        <Card className="rounded-2xl shadow-xl lg:col-span-2">
          <CardHeader>
            <h3 className="text-xl font-semibold">Datos personales</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre completo" />
                </div>
                <div>
                  <Label htmlFor="dni">DNI</Label>
                  <Input id="dni" name="dni" value={form.dni} onChange={handleChange} placeholder="Tu DNI" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Tu celular" />
                </div>
                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" name="location" value={form.location} onChange={handleChange} placeholder="Distrito / Ciudad" />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={form.bio} onChange={handleChange} placeholder="Cuéntanos un poco sobre ti" />
              </div>
              <CardFooter className="p-0">
                <Button type="submit" disabled={saving} className="rounded-full">
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        {/* Avatar uploader */}
        <Card className="rounded-2xl shadow-xl">
          <CardHeader>
            <h3 className="text-xl font-semibold">Foto de perfil</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAvatarSubmit} className="space-y-3">
              <div className="flex items-center gap-4">
                <img src={user?.imageUrl} alt={user?.name} className="w-16 h-16 rounded-full border" />
                <div className="flex-1">
                  <Label htmlFor="picture">Seleccionar imagen</Label>
                  <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
                  <p className="text-xs text-slate-500 mt-1">JPG o PNG, máx. 2MB.</p>
                </div>
              </div>
              <Button type="submit" className="rounded-full">Actualizar foto</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
