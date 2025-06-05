import React from 'react';
import SideBar from './_components/SideBar';
import DashboardHeader from './_components/DashboardHeader';

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <DashboardHeader />
      </div>
      <div className="flex flex-1">
        <div className="hidden md:block">
          <SideBar />
        </div>
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;