"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Brain, Zap, CheckCircle, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

function QuizPage() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState({ data: { content: [] } });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'quiz',
      });
      if (!result.data.success) {
        throw new Error(result.data.message || 'Failed to load quizzes');
      }
      setQuizzes(result.data);
      console.log('Quizzes:', result.data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
      console.error('Error loading quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(parseInt(value));
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setFeedback({ type: 'error', message: 'Please select an answer' });
      return;
    }
    const currentQuiz = quizzes.data.content[currentIndex];
    const isCorrect = selectedAnswer === currentQuiz.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ type: 'success', message: 'Correct!' });
    } else {
      setFeedback({
        type: 'error',
        message: `Incorrect. The correct answer is: ${currentQuiz.options[currentQuiz.correctAnswer]}`,
      });
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedback(null);
    if (currentIndex < quizzes.data.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const progress = quizzes.data.content.length > 0
    ? ((currentIndex + 1) / quizzes.data.content.length) * 100
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Card className="p-8 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            onClick={fetchQuizzes}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Quiz
            </h1>
            <Zap className="h-8 w-8 text-blue-600 ml-2" />
          </div>
          <p className="text-gray-600 text-lg">Test your knowledge with interactive quizzes</p>
        </div>

        {/* Progress and Score */}
        {quizzes.data.content.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentIndex + 1} of {quizzes.data.content.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Score: {score} / {quizzes.data.content.length}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-3 bg-white/50 rounded-full overflow-hidden shadow-inner"
            />
          </div>
        )}

        {/* Quiz Content */}
        <div className="flex justify-center items-center min-h-[500px]">
          {quizzes.data.content.length > 0 ? (
            <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {quizzes.data.content[currentIndex].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswer?.toString()}
                  onValueChange={handleAnswerSelect}
                  disabled={isAnswered}
                  className="space-y-4"
                >
                  {quizzes.data.content[currentIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className="text-purple-600"
                      />
                      <Label htmlFor={`option-${index}`} className="text-gray-700">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {feedback && (
                  <div className={`mt-4 p-4 rounded-lg flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2" />
                    )}
                    <p>{feedback.message}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {!isAnswered ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={currentIndex === quizzes.data.content.length - 1}
                    >
                      {currentIndex === quizzes.data.content.length - 1 ? 'Quiz Complete' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
              <p className="text-gray-600">No quizzes available for this course.</p>
            </Card>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Select an answer and submit • Track your score above</p>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;