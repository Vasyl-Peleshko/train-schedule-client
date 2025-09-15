'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '@/services/auth.service';
import Layout from './Layout';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
        router.push('/');
      } else {
        await register(username, email, password);
        router.push('/');
      }
    } catch (err) {
      alert(`${mode === 'login' ? 'Login' : 'Registration'} failed`);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh] bg-floralwhite">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 capitalize">{mode}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`w-full px-4 py-3 rounded text-white font-semibold ${
                mode === 'login' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AuthForm;
