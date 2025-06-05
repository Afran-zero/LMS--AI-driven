import React, { useEffect, useState } from 'react';
import MaterialCardItem from './MaterialCardItem';
import axios from 'axios';
import Link from 'next/link';

function StudyMaterialSection({ courseId }) {
  const [studyTypeContent,setStudyTypeContent] = React.useState([]);


  const MaterialList = [
    { 
      id: 'notes', // Unique string identifier
      name: 'Notes/Chapters',
      desc: 'Read Notes to prepare for exams',
      icon: '/notes.png',
      path: '/notes',
      type: 'notes',
    },
    {
      id: 'flashcards', // Unique string identifier
      name: 'Flashcard',
      desc: 'Flashcard to test your knowledge',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'flashcard',
    },
    {  
      id: 'quiz', // Unique string identifier
      name: 'Quiz',
      desc: 'Take Quiz to test your knowledge',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz',
    },
    {
      id: 'qa', // Unique string identifier
      name: 'Question/Answer',
      desc: 'Question and answer for concepts',
      icon: '/qa.png',
      path: '/qa',
      type: 'qa',
    }
  ];
    
   useEffect(()=>{
    GetStudyMaterial()
   },[])




   const GetStudyMaterial=async()=>{
    const result=await axios.post('/api/study-type',{
      courseId:courseId,
      studyType:'ALL'
    })
    console.log(result.data);
    setStudyTypeContent(result.data.result);
   }
   
  return (
    <div className='mt-5'>
      <h2 className='font-medium text-2xl mt-3'>
        Study Material
      </h2>
      
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-5'>
        {MaterialList.map((item) => (
          <Link key={item.id} href={'/course/'+courseId+item.path}>
          <MaterialCardItem key={item.id} item={item} 
           studyTypeContent={studyTypeContent}
          />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterialSection;