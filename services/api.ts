import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    console.log('Login response:', response.data); 

    if (response.data && response.data.token && response.data.user) {
      return {
        token: response.data.token,
        user: response.data.user,
      };
    } else {
      throw new Error('Eksik token veya kullanıcı verileri');
    }
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    if (response.data && response.data.token && response.data.user) {
      return {
        token: response.data.token,
        user: response.data.user,
      };
    } else {
      throw new Error('Eksik token veya kullanıcı verileri');
    }
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    console.log('Token:', token);
    
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Kullanıcı verileri alınırken hata oluştu:', error);
    if (axios.isAxiosError(error)) {
      console.error('Request config:', error.config);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
    }
    throw error;
  }
};