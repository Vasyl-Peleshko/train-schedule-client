'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../services/auth.service';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Train Schedule</h1>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          {!isLoggedIn && (
            <>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
              <Link href="/register" className="text-gray-700 hover:text-gray-900">Register</Link>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
