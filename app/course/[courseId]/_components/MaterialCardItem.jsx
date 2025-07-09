import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = React.useState(false)
  
  // Add debugging to see what we're getting
  console.log('MaterialCardItem props:', {
    itemType: item.type,
    itemName: item.name,
    studyTypeContent: studyTypeContent,
    studyTypeContentType: typeof studyTypeContent,
    isArray: Array.isArray(studyTypeContent),
    keys: studyTypeContent && typeof studyTypeContent === 'object' ? Object.keys(studyTypeContent) : 'N/A'
  });
  
  const GenerateContent = async () => {
    toast.loading('Generating Content')
    setLoading(true)
    
    let chapters = '';
    course?.courseLayout?.chapters?.forEach((chapter) => {
      if (chapter.chapterTitle) {
        chapters = chapters ? `${chapters}, ${chapter.chapterTitle}` : chapter.chapterTitle;
      }
    });
    console.log(chapters)
    
    const result = await axios.post('/api/study-type-content', {
      courseId: course.courseId,
      type: item.name,
      chapters: chapters
    })
    setLoading(false);
    console.log(result)
    refreshData(true)
    toast('Your content has been generated')
  }

  // Fix: Handle different data structures for studyTypeContent
  let contentData;
  let isContentReady = false;
  
  // Check if studyTypeContent is an array or object
  if (Array.isArray(studyTypeContent)) {
    // If it's an array, find the content by type
    contentData = studyTypeContent.find(content => content.type === item.type);
  } else if (studyTypeContent && typeof studyTypeContent === 'object') {
    // If it's an object, access by key
    contentData = studyTypeContent[item.type];
  } else {
    contentData = undefined;
  }
  
  // Determine if content is ready based on type
  if (item.type === 'notes') {
    // Notes might be in different formats - check for array or object with content
    if (Array.isArray(contentData)) {
      isContentReady = contentData.length > 0;
    } else if (contentData && contentData.notes) {
      isContentReady = true;
    } else if (contentData && contentData.content) {
      isContentReady = true;
    }
  } else {
    // Other content types (flashcard, quiz, qa)
    isContentReady = contentData && 
                     contentData !== null && 
                     contentData !== undefined &&
                     (contentData.status === 'Ready' || contentData.content);
  }

  console.log('Content check for', item.type, ':', {
    contentData,
    isContentReady,
    contentDataType: typeof contentData,
    isArray: Array.isArray(contentData),
    hasContent: contentData ? 'content' in contentData : false,
    hasNotes: contentData ? 'notes' in contentData : false
  });

  return (
    <Link href={'/course/' + course?.courseId + item.path}>
      <div className={`flex flex-col rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 border border-gray-200 ${!isContentReady ? 'bg-gray-200' : 'bg-gray-50'}`}>
        <div className='flex justify-between items-start mb-3'>
          {!isContentReady ? (
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
            className={`object-contain transition-transform duration-300 hover:scale-105 ${!isContentReady ? 'grayscale' : ''}`}
          />
         
          <div className='text-center space-y-2'>
            <h2 className='font-semibold text-lg text-gray-800'>{item.name}</h2>
            <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
          </div>
        </div>
        
        {!isContentReady ? (
          <Button 
            className='mt-auto w-full rounded-md border border-red-300 hover:bg-red-400 transition-colors duration-200' 
            variant={'outline'}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              GenerateContent();
            }}
          >
            {loading && <RefreshCcw className='animate-spin' />} Generate
          </Button>
        ) : (
          <Button className='mt-auto w-full rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200' variant={'outline'}>
            View
          </Button>
        )}
      </div>
    </Link>
  )
}

export default MaterialCardItem