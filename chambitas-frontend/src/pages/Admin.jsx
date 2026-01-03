import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, Button, Input, Badge } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export default function Admin() {
  const glass = "backdrop-blur-lg bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50";
  const { isAdmin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');

  const token = useMemo(() => localStorage.getItem('chambitas-token'), []);

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }), [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/users`, { headers });
      const data = await res.json();
      if (res.ok) setUsers(data);
      else alert(data.message || 'No se pudieron obtener los usuarios.');
    } catch (e) {
      console.error(e);
      alert('Error de red al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const toggleActive = async (u) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${u._id}/activate`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ isActive: !u.isActive })
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.map(x => x._id === data._id ? data : x));
      } else {
        alert(data.message || 'No se pudo actualizar estado activo.');
      }
    } catch (e) {
      console.error(e);
      alert('Error al actualizar estado activo.');
    }
  };

  const toggleBlocked = async (u) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${u._id}/block`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ isBlocked: !u.isBlocked })
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.map(x => x._id === data._id ? data : x));
      } else {
        alert(data.message || 'No se pudo actualizar bloqueo.');
      }
    } catch (e) {
      console.error(e);
      alert('Error al actualizar bloqueo.');
    }
  };

  const toggleAdminRole = async (u) => {
    try {
      const newRoles = Array.isArray(u.roles) ? [...u.roles] : ['user'];
      const isAdminNow = newRoles.includes('admin');
      const next = isAdminNow ? newRoles.filter(r => r !== 'admin') : [...newRoles, 'admin'];
      if (!next.includes('user')) next.push('user');

      const res = await fetch(`${API_URL}/admin/users/${u._id}/roles`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ roles: next })
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.map(x => x._id === data._id ? data : x));
      } else {
        alert(data.message || 'No se pudieron actualizar los roles.');
      }
    } catch (e) {
      console.error(e);
      alert('Error al actualizar roles.');
    }
  };

  const deleteUser = async (u) => {
    if (!confirm(`¿Eliminar al usuario ${u.name}? Esta acción es irreversible.`)) return;
    try {
      const res = await fetch(`${API_URL}/admin/users/${u._id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.filter(x => x._id !== u._id));
      } else {
        alert(data.message || 'No se pudo eliminar el usuario.');
      }
    } catch (e) {
      console.error(e);
      alert('Error al eliminar usuario.');
    }
  };

  const filtered = users.filter(u => {
    const text = `${u.name} ${u.email} ${u.dni || ''}`.toLowerCase();
    return text.includes(q.toLowerCase());
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className={`rounded-2xl shadow-xl ${glass}`}>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Panel de Administración</h2>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Buscar por nombre, email o DNI..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-64"
              />
              <Button onClick={fetchUsers} className="rounded-full">{loading ? 'Actualizando...' : 'Actualizar'}</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 text-xs font-semibold text-slate-500 px-3 py-2">
            <div className="col-span-3">Usuario</div>
            <div className="col-span-2">Contacto</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2">Roles</div>
            <div className="col-span-3">Acciones</div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filtered.map(u => (
              <div key={u._id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 px-3 py-3">
                {/* Usuario */}
                <div className="md:col-span-3 flex items-center gap-3">
                  <img src={u.imageUrl} alt={u.name} className="w-10 h-10 rounded-full border" />
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-slate-500">DNI: {u.dni || '-'}</div>
                  </div>
                </div>

                {/* Contacto */}
                <div className="md:col-span-2 text-sm">
                  <div>{u.email}</div>
                  <div className="text-xs text-slate-500">{u.phone || '-'}</div>
                </div>

                {/* Estado */}
                <div className="md:col-span-2 flex flex-wrap gap-2">
                  <Badge variant={u.isActive ? 'default' : 'secondary'}>
                    {u.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                  <Badge variant={u.isBlocked ? 'outline' : 'secondary'} className={u.isBlocked ? 'border-red-500 text-red-600' : ''}>
                    {u.isBlocked ? 'Bloqueado' : 'No bloqueado'}
                  </Badge>
                </div>

                {/* Roles */}
                <div className="md:col-span-2 flex flex-wrap gap-2">
                  {(u.roles || []).map(r => (
                    <Badge key={r} variant="secondary">{r}</Badge>
                  ))}
                </div>

                {/* Acciones */}
                <div className="md:col-span-3 flex flex-wrap gap-2">
                  <Button className="rounded-full px-3 py-1" onClick={() => toggleActive(u)}>
                    {u.isActive ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button className="rounded-full px-3 py-1" onClick={() => toggleBlocked(u)}>
                    {u.isBlocked ? 'Desbloquear' : 'Bloquear'}
                  </Button>
                  <Button className="rounded-full px-3 py-1" onClick={() => toggleAdminRole(u)}>
                    {(u.roles || []).includes('admin') ? 'Quitar admin' : 'Hacer admin'}
                  </Button>
                  <Button className="rounded-full px-3 py-1 bg-red-600 hover:bg-red-600/90 text-white" onClick={() => deleteUser(u)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-slate-500 py-8">No hay usuarios que coincidan con el filtro.</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
