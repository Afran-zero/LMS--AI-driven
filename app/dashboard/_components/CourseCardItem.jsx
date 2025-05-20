import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function CourseCardItem({course}) {
  return (
    <div className='border-2 border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow'>
      <div className='flex justify-between items-start mb-2'>
       
        <div className='flex items-center gap-2'>
          <Image 
            src='/knowledge.png'
            alt='course image' 
            width={80} 
            height={80}
            className='object-cover rounded-full'
          />
           <span className='text-xs text-gray-500 ml-20'>20 Dec 2024</span>
        </div>
      </div>
      
      <h2 className='font-medium text-lg line-clamp-1'>{course?.courseLayout?.courseTitle}</h2>
      <p className='text-xs line-clamp-2 text-gray-500 mt-1 mb-3'>{course?.courseLayout?.summary}</p>
      
      <div className='w-full bg-gray-200 rounded-full h-2 mb-4'>
        <div 
          className='bg-blue-600 h-2 rounded-full' 
          style={{ width: '0%' }}
        ></div>
      </div>
      
      <div className='flex justify-end'>
        <Button className='px-4 py-1 text-sm'>View</Button>
      </div>
    </div>
  )
}

export default CourseCardItem