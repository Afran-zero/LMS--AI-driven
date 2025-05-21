import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

function CourseCardItem({course}) {
  return (
    <div className='relative border-2 border-gray-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-400 group'>
      {/* Background gradient (isolated to card only) */}
      <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-lg opacity-100 group-hover:opacity-95 -z-10' />
      
      {/* Header with date badge */}
      <div className='flex justify-between items-start mb-3'>
        <div className='flex items-center gap-2'>
          <Image 
            src='/knowledge.png'
            alt='course image' 
            width={80} 
            height={80}
           
          />
        </div>
        <span className='text-xs font-medium text-black bg-gray-500/90 px-3 py-1 rounded-full border border-gray-300'>
          20 Dec 2024
        </span>
      </div>
      
      {/* Course content */}
      <div className='relative z-10'> {/* Ensure content stays above gradient */}
        <h2 className='font-medium text-lg line-clamp-1 text-gray-800'>{course?.courseLayout?.courseTitle}</h2>
        <p className='text-sm line-clamp-2 text-gray-600 mt-1 mb-4'>{course?.courseLayout?.summary}</p>
        
        {/* Progress bar */}
        <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden border border-gray-600'>
          <div 
            className='bg-blue-500 h-2.5 rounded-full transition-all duration-500' 
            style={{ width: '0%' }}
          ></div>
        </div>
      </div>
      
      {/* Footer with status */}
      <div className='flex justify-end relative z-10'>
        {course?.status === 'Genarating' ? (
          <div className='text-sm px-3 py-1.5 flex gap-2 items-center rounded-full bg-gray-300 border border-gray-400 text-gray-800'>
            <RefreshCw className='h-4 w-4 animate-spin' />
            Generating...
          </div>
        ) : (
          <Button className='px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white border border-blue-700'>
            View
          </Button>
        )}
      </div>
    </div>
  )
}

export default CourseCardItem