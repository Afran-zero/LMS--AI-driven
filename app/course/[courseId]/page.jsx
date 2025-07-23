"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import { useParams } from 'next/navigation'
import axios from 'axios';
import React, { useEffect , useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';


function Course() {
  const{courseId} =useParams();

 const [course,setCourse]=useState();


  useEffect(()=>{
    GetCourse()
  },[])
  const GetCourse=async()=>{
   const result = await axios.get('/api/courses?courseId='+courseId) 
   console.log(result.data.result)
   setCourse(result.data.result)
}
    return (
    <div>
      
      <div>
      <CourseIntroCard course ={course}/>
      <StudyMaterialSection courseId={courseId}/>
      <ChapterList COURSE={course}/>
      </div>
    </div>

  )
}

export default Course