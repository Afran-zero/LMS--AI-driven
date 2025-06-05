import React from 'react'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'

function CourseViewLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default CourseViewLayout