import React , {useState} from 'react'
import Image from 'next/image'


function SelectOption({selectedStudyType}) {
  const Options = [
    {
      name: 'Exam',
      Icon: '/exam_1.png'
    },
    {
      name: 'Job Interview',
      Icon: '/job.png'
    },
    {
      name: 'Practice',
      Icon: '/practice.png'
    },
    {
      name: 'Coding Prep',
      Icon: '/code.png'
    },
    {
      name: 'Other',
      Icon: '/Knowledge.png'
    },
  ]

  const [selectedOption, setSelectedOption] = React.useState(null)

  return (
    <div className=" mt-5 max-w-4xl mx-auto p-4">
      <h2 className='text-center mb-6 text-xl font-medium text-gray-700'>
        For which do you want to create your personal study material?
      </h2>
      
      <div className='grid grid-cols-2 md:grid-cols-5 gap-2 mt-5'>
        {Options.map((option, index) => (
          <div 
            key={index}
            onClick={() => {setSelectedOption(option.name);selectedStudyType(option.name)}}
            className={`
              flex flex-col items-center justify-center 
              border-2 rounded-lg p-2 cursor-pointer 
              transition-all duration-200
              hover:border-blue-400 hover:shadow-[0_0_8px_-2px_rgba(59,130,246,0.5)]
              ${selectedOption === option.name 
                ? 'border-blue-500 shadow-[0_0_12px_-4px_rgba(59,130,246,0.8)] bg-blue-50' 
                : 'border-gray-200'
              }
            `}
          >
            <div className="relative w-14 h-14 mb-2">
              <Image 
                src={option.Icon} 
                alt={option.name} 
                fill
                className="object-contain"
              />
            </div>
            <p className='text-center text-sm font-medium text-gray-600'>{option.name}</p>
          </div>
        ))}
      </div>
       
    </div>
  )
}

export default SelectOption