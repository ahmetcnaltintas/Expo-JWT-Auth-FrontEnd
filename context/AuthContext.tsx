import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import * as api from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const userData = await api.getCurrentUser(token);  // Token'ı API fonksiyonuna iletin
        setUser(userData);
      } catch (error) {
        console.error('Geçerli kullanıcı alınamadı:', error);
        await AsyncStorage.removeItem('token');
        router.replace('/(auth)/intro');
      }
    } else {
      router.replace('/(auth)/intro');
    }
  };
  
  useEffect(() => {
    checkToken();
  }, []);
  
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/intro');
    } else if (user && inAuthGroup) {
      router.replace('/(app)/(tabs)');
    }
  }, [user, segments]);

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await api.login(email, password);
      if (token && user) {
        await AsyncStorage.setItem('token', token);
        setUser(user);
      } else {
        console.error('Giriş başarısız oldu: Eksik token veya kullanıcı verileri.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      const { token, user } = await api.register(name, email, password, passwordConfirmation);
      if (token && user) {
        await AsyncStorage.setItem('token', token);
        setUser(user);
      } else {
        console.error('Kayıt başarısız oldu: Eksik token veya kullanıcı verileri.');
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth bir AuthProvider içinde kullanılmalıdır');
  }
  return context;
};
