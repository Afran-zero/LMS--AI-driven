"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react';
import classNames from 'classnames';

function SideBar() {
  const pathname = usePathname();

  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      link: '/dashboard',
    },
    {
      name: 'Upgrade',
      icon: Shield,
      link: '/dashboard/upgrade',
    },
    {
      name: 'Profile',
      icon: UserCircle,
      link: '/dashboard/profile',
    },
  ];

  return (
    <div className="relative h-screen shadow-md p-5 flex flex-col bg-blue-100 mr-1">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Image src="/jjj-removebg-preview.png" alt="logo" width={40} height={40} priority />
        <h2
          className="text-xl font-bold text-blue-600 transition-transform duration-300 hover:scale-110 hover:text-blue-800"
        >
          LerNen
        </h2>
      </div>

      {/* Menu Section */}
      <div className="mt-10 flex-1">
        <button className="w-full h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          + Create New
        </button>
        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <Link href={menu.link} key={index}>
              <div
                className={classNames(
                  'flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors',
                  {
                    'bg-slate-300': pathname === menu.link,
                    'hover:bg-gray-200': pathname !== menu.link,
                  }
                )}
              >
                <menu.icon size={20} />
                <h2 className="text-sm">{menu.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Credits Section */}
      <div className="border p-3 bg-slate-500 rounded-lg w-[90%] mx-auto absolute bottom-10 left-0 right-0">
        <h2 className="text-lg mb-2 text-white">Available Credit: 5</h2>
        <progress value={1} max={5} className="w-full h-2" />
        <h2 className="text-sm text-white mt-1">1 out of 5 credits used</h2>
        <Link href="/dashboard/upgrade" className="text-xs text-blue-300 hover:text-blue-100 mt-3 inline-block">
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
}

export default SideBar;