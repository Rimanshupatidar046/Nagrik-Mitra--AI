import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ShieldAlert } from 'lucide-react';

export const OfficerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOfficer={true} />
      {/* Official administrative strip */}
      <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <span className="font-medium">District Officer Administrative Terminal — Authorized Personnel Only</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-amber-800">
          ID: NIC-OFF-8472 (Varanasi Division)
        </span>
      </div>

      <div className="flex-1 flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isOfficer={true} />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficerLayout;
