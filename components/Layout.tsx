import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-floralwhite">
      <Navbar />

      <main className="container mx-auto p-6 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
