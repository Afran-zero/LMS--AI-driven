"use client"
import React, { useState } from 'react'
import SelectOptions from './_components/SelectOptions'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

function Create() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    studyType: '',
    topic: '',
    difficultyLevel: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useUser()
  const router=useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const GeneratecourseOutline = async () => {
  if (!formData.topic || !formData.difficultyLevel || !formData.studyType) {
    setError('Please fill all fields');
    return;
  }

  try {
    setLoading(true);
    setError(null);
    
    const courseId = uuidv4();
    const result = await axios.post('/api/generate-course-outline', {
      courseId,
      topic: formData.topic,
      courseType: formData.studyType,
      difficultyLevel: formData.difficultyLevel,
      createdBy: user?.primaryEmailAddress?.emailAddress
    });

    console.log("Generated result:", result.data);
    
    // Only redirect on success after showing feedback
    toast.success('Course outline generated successfully!');
    setTimeout(() => {
      router.replace('/dashboard');
    }, 1500); // Give user time to see the success message

  } catch (error) {
    console.error("Generation failed:", error);
    setError(error.response?.data?.error || "Failed to generate outline");
    // Don't redirect on error - let user see and fix the error
  } finally {
    setLoading(false);
    // Removed the redirect from here
  }
}

  return (
    <div>
      <div className='flex flex-col items-center justify-center p-5 md:px-24 lg:px-36 mt-20'>
        <h2 className='font-bold text-4xl text-blue-900 text-center'>
          Let's Start Building Your Personal Study Material
        </h2>
        <p className='text-lg text-gray-500 mt-3 text-center'>
          Fill all the details in order to create your personal study materials!
        </p>
      </div>

      <div className="mt-10 px-4 md:px-24 lg:px-36">
        {step === 0 ? 
          <SelectOptions selectedStudyType={(value) => handleUserInput('studyType', value)} /> :
          <TopicInput 
            setTopic={(value) => handleUserInput('topic', value)}
            SetDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
          />
        }
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">
          {error}
        </div>
      )}

      <div className='flex justify-between w-full px-4 md:px-24 lg:px-36 mt-10 mb-10'>
        {step !== 0 ? (
          <Button 
            variant="outline"
            className="border-2 border-gray-300 hover:border-blue-500 px-6"
            onClick={() => setStep(step - 1)}
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}
        
        {step === 0 ? (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 px-8"
            onClick={() => {
              if (!formData.studyType) {
                setError('Please select a study type')
              } else {
                setStep(step + 1)
              }
            }}
            disabled={loading}
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={GeneratecourseOutline}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Create