"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import FlashcardItem from './_components/flashcardItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Brain, Zap } from "lucide-react"

function Flashcards() {
  const { courseId } = useParams()
  const [flashcards, setFlashcards] = useState([])
  const [isFlipped, setIsFlipped] = useState(false)
  const [api, setApi] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    GetFlashCard()
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }
    
    api.on('select', () => {
      setIsFlipped(false)
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  const GetFlashCard = async () => {
    try {
      setLoading(true)
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'Flashcard'
      })
      setFlashcards(result.data)
      console.log('Flashcards', result.data)
    } catch (err) {
      setError('Failed to load flashcards')
      console.error('Error loading flashcards:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const progress = flashcards.content?.length > 0 ? ((currentIndex + 1) / flashcards.content.length) * 100 : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading flashcards...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Card className="p-8 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={GetFlashCard}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Flashcards
            </h1>
            <Zap className="h-8 w-8 text-blue-600 ml-2" />
          </div>
          <p className="text-gray-600 text-lg">The ultimate tool to lock concepts in mind</p>
        </div>

        {/* Progress Bar */}
        {flashcards.content?.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Card {currentIndex + 1} of {flashcards.content.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-3 bg-white/50 rounded-full overflow-hidden shadow-inner"
            />
          </div>
        )}

        {/* Flashcard Carousel */}
        <div className="flex justify-center items-center min-h-[500px]">
          {flashcards.content?.length > 0 ? (
            <Carousel setApi={setApi} className="w-full max-w-2xl">
              <CarouselContent>
                {flashcards.content.map((flashcard, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <FlashcardItem 
                      handleClick={handleClick}
                      isFlipped={isFlipped}
                      flashcard={flashcard}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/80 hover:bg-white shadow-lg border-0" />
              <CarouselNext className="right-4 bg-white/80 hover:bg-white shadow-lg border-0" />
            </Carousel>
          ) : (
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
              <p className="text-gray-600">No flashcards available for this course.</p>
            </Card>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Click on the card to flip • Use arrow keys or buttons to navigate</p>
        </div>
      </div>
    </div>
  )
}

export default Flashcards