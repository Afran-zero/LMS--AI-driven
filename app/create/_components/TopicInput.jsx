import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
function TopicInput({setTopic,SetDifficultyLevel}) {
  return (
    <div className="flex flex-col">
        <h2 className=' text '>Enter topic or paste the content for which you want to build study materials for ~</h2>
        <Textarea  placeholder="Enter topic or paste the content " className="w-full h-64 mt-4" 
        onChange={(event)=>setTopic (event.target.value)} />
        <h2 className='mt-5 mb-2'> Select the difficulty Level</h2>
        <Select onValueChange={(value)=>SetDifficultyLevel(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Difficulty Level" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Easy">Easy</SelectItem>
    <SelectItem value="Moderate">Moderate</SelectItem>
    <SelectItem value="Hard">Hard</SelectItem>
  </SelectContent>
</Select>

    </div>
  )
}

export default TopicInput