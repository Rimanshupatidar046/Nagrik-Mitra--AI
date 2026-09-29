import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOfficer={false} />
      <div className="flex-1 flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isOfficer={false} />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
