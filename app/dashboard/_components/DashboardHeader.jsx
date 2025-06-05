import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-4 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 sticky top-0 z-50'>
      <div className='w-full flex items-center'>
        {/* Logo with glossy effect and hover, explicitly aligned left */}
        <div className='flex items-center mr-auto'>
          <span className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-md'>
            LerNen
          </span>
          <span className='ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
            Beta
          </span>
        </div>

        {/* Enhanced UserButton with darker border, larger circle, and effects */}
        <div className='relative group'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300'></div>
          <div className='relative p-1 rounded-full bg-white/90 backdrop-blur-sm border-2 border-gray-400 group-hover:border-transparent transition-all duration-300'>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-12 h-12 rounded-full",
                  userButtonPopoverCard: "shadow-xl rounded-xl"
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader