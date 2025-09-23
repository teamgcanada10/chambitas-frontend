import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent, Button, Input, Label } from '../components/ui';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
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
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Profile</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={user.imageUrl} alt={user.name} className="w-24 h-24 rounded-full" />
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="picture">Profile Picture</Label>
              <Input id="picture" type="file" onChange={handleFileChange} />
              <p className="text-xs text-slate-500 mt-1">Upload a new profile picture.</p>
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}