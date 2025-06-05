import { Progress } from '@radix-ui/react-progress'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

function CourseIntroCard({ course }) {
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Simulate progress animation
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className={`relative flex gap-6 items-center p-6 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${isHovered ? 'scale-[1.01]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glossy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-purple-50/30 opacity-80"></div>
      {/* Animated shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 ${isHovered ? 'animate-shimmer' : ''}`}></div>
      {/* Border glow effect */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${isHovered ? 'border-blue-200/50' : 'border-gray-200'}`}></div>
      
      <div className="relative z-10 flex-shrink-0">
        <Image 
          src="/knowledge.png" 
          alt="course image" 
          width={90} 
          height={90}
          className={`transition-transform duration-300 ${isHovered ? 'rotate-6' : ''}`}
        />
      </div>
      
      <div className="relative z-10 space-y-2 flex-1">
        <h2 className='font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          {course?.courseLayout.courseTitle}
        </h2>
        <p className='text-gray-600'>{course?.courseLayout.summary}</p>
        
        <div className="pt-2 space-y-1">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Course Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-200 rounded-full overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {course?.courseLayout.difficulty || 'Intermediate'}
          </span>
          <span className="text-gray-600">
            {course?.courseLayout?.chapters?.length || 0} Chapters
          </span>
        </div>
      </div>
    </div>
  )
}

export default CourseIntroCard