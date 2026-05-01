'use client';

import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
}

export function useAuth() {
  const STORAGE_KEY = 'JuntosNaAventura:user';

  // ✅ SEM acessar localStorage aqui
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStorageData = useCallback(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      loadStorageData();
    }, 0);

    return () => clearTimeout(id);
  }, [loadStorageData]);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    window.location.href = '/login';
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    refreshAuth: loadStorageData
  };
}