"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import { useParams } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, Brain, HelpCircle } from 'lucide-react';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      if (!result.data.success) {
        throw new Error(result.data.message || 'Failed to load course');
      }
      console.log('Course data:', result.data.result);
      setCourse(result.data.result);
    } catch (err) {
      setError(err.message || 'Failed to load course');
      console.error('Error loading course:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading course...</p>
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
            onClick={GetCourse}
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
      <DashboardHeader />
      <div className="max-w-4xl mx-auto">
        <CourseIntroCard course={course} />
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Study Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href={`/course/${courseId}/flashcards`}
              className="flex items-center p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
              <span className="text-gray-800 font-medium">Flashcards</span>
            </Link>
            <Link
              href={`/course/${courseId}/Quiz`}
              className="flex items-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Brain className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-gray-800 font-medium">Quiz</span>
            </Link>
            <Link
              href={`/course/${courseId}/qna`}
              className="flex items-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <HelpCircle className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-gray-800 font-medium">Q&A</span>
            </Link>
          </CardContent>
        </Card>
        <StudyMaterialSection courseId={courseId} course={course} />
        <ChapterList COURSE={course} />
      </div>
    </div>
  );
}

export default Course;