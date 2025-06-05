"use client";
import React, { useState } from 'react';
import { LayoutDashboard, Shield, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

function SideBar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

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
    <div className={classNames(
      "h-screen shadow-md p-4 flex flex-col bg-blue-100 transition-all duration-300",
      {
        "w-64": !collapsed,
        "w-20": collapsed
      }
    )}>
      {/* Collapse Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="self-end p-2 rounded-full hover:bg-blue-200 mb-4"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Menu Section */}
      <div className="flex-1 flex flex-col">
        <Link href={'/create'}>
          <button className="w-full h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-6 flex items-center justify-center gap-2">
            {!collapsed ? (
              <>
                <span>+</span>
                <span>Create New</span>
              </>
            ) : (
              <span>+</span>
            )}
          </button>
        </Link>

        <div className="space-y-2">
          {MenuList.map((menu, index) => (
            <Link href={menu.link} key={index}>
              <div
                className={classNames(
                  'flex items-center p-3 rounded-md cursor-pointer transition-colors',
                  {
                    'bg-slate-300': pathname === menu.link,
                    'hover:bg-blue-200': pathname !== menu.link,
                    'justify-center': collapsed
                  }
                )}
              >
                <menu.icon size={20} />
                {!collapsed && <span className="ml-3 text-sm">{menu.name}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;