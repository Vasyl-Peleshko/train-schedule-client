import { api } from './api';
import { ITokenPair, User } from '../types/user';

export const register = async (username: string, email: string, password: string): Promise<ITokenPair> => {
  const { data } = await api.post('/user/register', { username, email, password });
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
  }
  return data;
};

export const login = async (email: string, password: string): Promise<ITokenPair> => {
  const { data } = await api.post('/user/login', { email, password });
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
  }
  return data;
};

export const getUser = async (): Promise<User> => {
  const { data } = await api.get('/user/getUser');
  return data;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};
