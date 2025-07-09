import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Eye, EyeOff } from "lucide-react"

function FlashcardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div 
        onClick={handleClick}
        className="relative w-96 h-64 cursor-pointer perspective-1000"
      >
        <div className={`
          relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}>
          {/* Front of card */}
          <Card className={`
            absolute inset-0 w-full h-full backface-hidden
            bg-gradient-to-br from-purple-500 to-blue-600
            border-0 shadow-2xl
            hover:shadow-3xl
            transition-all duration-300
            group
            before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-lg
            after:absolute after:inset-0 after:bg-gradient-to-tl after:from-white/10 after:to-transparent after:rounded-lg
          `}>
            <CardContent className="relative flex flex-col items-center justify-center h-full p-8 text-white">
              <div className="absolute top-4 right-4 opacity-60">
                <Eye className="h-5 w-5" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2 leading-tight drop-shadow-lg">
                  {flashcard?.front || 'Question'}
                </h2>
                <div className="w-16 h-1 bg-white/40 rounded-full mx-auto"></div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60">
                <RotateCcw className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className={`
            absolute inset-0 w-full h-full backface-hidden rotate-y-180
            bg-gradient-to-br from-emerald-500 to-teal-600
            border-0 shadow-2xl
            hover:shadow-3xl
            transition-all duration-300
            group
            before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-lg
            after:absolute after:inset-0 after:bg-gradient-to-tl after:from-white/10 before:to-transparent after:rounded-lg
          `}>
            <CardContent className="relative flex flex-col items-center justify-center h-full p-8 text-white">
              <div className="absolute top-4 right-4 opacity-60">
                <EyeOff className="h-5 w-5" />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-medium leading-relaxed drop-shadow-lg">
                  {flashcard?.back || 'Answer'}
                </h2>
                <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mt-4"></div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60">
                <RotateCcw className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Hint text */}
      <p className="text-sm text-gray-500 mt-4 text-center">
        Click to {isFlipped ? 'see question' : 'reveal answer'}
      </p>
    </div>
  )
}

export default FlashcardItem