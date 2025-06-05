import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
function MaterialCardItem({ item, studyTypeContent ,course }) {
 const[loading,setLoading]=React.useState(false)


const GenerateContent= async()=>{
  setLoading(true)
  //console.log(course)
   let chapters = '';
  course?.courseLayout?.chapters?.forEach((chapter) => {
    if (chapter.chapterTitle) {
      chapters = chapters ? `${chapters}, ${chapter.chapterTitle}` : chapter.chapterTitle;
    }
  });
  console.log(chapters)
  
  
   const result =await axios.post('/api/study-type-content', {
    
    courseId: course.courseId,
     type: item.name,
     chapters: chapters
   })
   setLoading(false);
   console.log(result)
 }




  return (
    <div className={`flex flex-col rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 border border-gray-200 ${studyTypeContent?.[item.type]?.length == null ? 'bg-gray-200' : 'bg-gray-50'}`}>
      <div className='flex justify-between items-start mb-3'>
        {studyTypeContent?.[item.type]?.length == null ? (
          <span className='p-1 px-3 bg-gray-400 rounded-full text-gray-50 text-xs font-medium'>
            Generate
          </span>
        ) : (
          <span className='p-1 px-3 bg-green-400 rounded-full text-gray-50 text-xs font-medium'>
            Ready
          </span>
        )}
      </div>
        
      <div className='flex flex-col items-center gap-4 flex-grow'>
        <Image 
          src={item.icon} 
          alt={item.name} 
          width={50} 
          height={50}
          className={`object-contain transition-transform duration-300 hover:scale-105 ${studyTypeContent?.[item.type]?.length == null ? 'grayscale' : ''}`}
        />
        
        <div className='text-center space-y-2'>
          <h2 className='font-semibold text-lg text-gray-800'>{item.name}</h2>
          <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
        </div>
      </div>
      {studyTypeContent?.[item.type]?.length == null ? (
        <Button className='mt-auto w-full rounded-md border border-red-300 hover:bg-red-400 transition-colors duration-200' variant={'outline'}
        onClick={() => 
           GenerateContent()
            // Handle generate button click
          }
        
        >
         {loading &&<RefreshCcw className='animate-spin'/>} Generate
        </Button>
      ) : (
        <Button className='mt-auto w-full rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200' variant={'outline'}>
          View
        </Button>
      )}
    </div>
  )
}
export default MaterialCardItem