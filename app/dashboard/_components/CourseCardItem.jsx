import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RefreshCw, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

function CourseCardItem({ course }) {
  // Error handling for missing course data
  if (!course) {
    return (
      <div className='border-2 border-gray-300 rounded-lg p-4 shadow-sm bg-gray-100'>
        <div className='animate-pulse flex flex-col space-y-3'>
          <div className='h-6 bg-gray-300 rounded w-3/4'></div>
          <div className='h-4 bg-gray-300 rounded w-full'></div>
          <div className='h-4 bg-gray-300 rounded w-5/6'></div>
          <div className='h-8 bg-gray-300 rounded w-1/3 mt-4'></div>
        </div>
      </div>
    )
  }

  // Handle missing courseLayout gracefully
  const courseTitle = course?.courseLayout?.courseTitle || 'Untitled Course'
  const summary = course?.courseLayout?.summary || 'No description available'
  const courseId = course?.courseId || ''
  const status = course?.status || 'unknown'
  const createdAt = course?.createdAt ? new Date(course.createdAt) : new Date()

  // Generate dynamic route with creation timestamp
  const courseRoute = `/course/${courseId}?created=${createdAt.getTime()}`

  return (
    <div className='relative border-2 border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-400 group'>
      {/* Background gradient (isolated to card only) */}
      <div className='absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-lg opacity-100 group-hover:opacity-95 -z-10' />
      
      {/* Header with date badge */}
      <div className='flex justify-between items-start mb-3'>
        <div className='flex items-center gap-2'>
          <Image 
            src={course?.imageUrl || '/knowledge.png'}
            alt={courseTitle}
            width={80} 
            height={80}
            className='rounded-lg object-cover'
            onError={(e) => {
              e.target.src = '/knowledge.png' // Fallback image
            }}
          />
        </div>
        
        <div className='flex items-center gap-1 text-xs text-gray-500'>
          <Clock className='h-3 w-3' />
          <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
        </div>
      </div>
      
      {/* Course content */}
      <div className='relative z-10'>
        <h2 className='font-medium text-lg line-clamp-1 text-gray-800' title={courseTitle}>
          {courseTitle}
        </h2>
        <p className='text-sm line-clamp-2 text-gray-600 mt-1 mb-4' title={summary}>
          {summary}
        </p>
      
        {/* Footer with status */}
        <div className='flex justify-between items-center relative z-10'>
          <div className='text-xs text-gray-500'>
            {status === 'Generating' && 'Processing...'}
          </div>
          
          {status === 'Generating' ? (
            <div className='text-sm px-3 py-1.5 flex gap-2 items-center rounded-full bg-gray-200 border border-gray-300 text-gray-700'>
              <RefreshCw className='h-4 w-4 animate-spin' />
              Generating...
            </div>
          ) : (
            <Link href={courseRoute}>
              <Button 
                className='px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white border border-blue-700'
                disabled={status !== 'Ready'}
              >
                {status === 'Ready' ? 'View Course' : 'Processing'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCardItem