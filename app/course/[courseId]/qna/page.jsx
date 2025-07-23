"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Brain, Zap } from "lucide-react";

function QAPage() {
  const { courseId } = useParams();
  const [qaData, setQAData] = useState({ data: { content: [] } });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openItems, setOpenItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQA();
  }, []);

  const fetchQA = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'qa',
      });
      if (!result.data.success) {
        throw new Error(result.data.message || 'Failed to load Q&A content');
      }
      setQAData(result.data);
      console.log('Q&A:', result.data);
    } catch (err) {
      setError(err.message || 'Failed to load Q&A content');
      console.error('Error loading Q&A:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < qaData.data.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setOpenItems([]); // Close all accordions when moving to next
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setOpenItems([]); // Close all accordions when moving to previous
    }
  };

  const progress = qaData.data.content.length > 0
    ? ((currentIndex + 1) / qaData.data.content.length) * 100
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading Q&A content...</p>
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
            onClick={fetchQA}
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
              Q&A
            </h1>
            <Zap className="h-8 w-8 text-blue-600 ml-2" />
          </div>
          <p className="text-gray-600 text-lg">Explore detailed questions and answers to deepen your understanding</p>
        </div>

        {/* Progress */}
        {qaData.data.content.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentIndex + 1} of {qaData.data.content.length}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-3 bg-white/50 rounded-full overflow-hidden shadow-inner"
            />
          </div>
        )}

        {/* Q&A Content */}
        <div className="flex justify-center items-center min-h-[500px]">
          {qaData.data.content.length > 0 ? (
            <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Question {currentIndex + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion
                  type="multiple"
                  value={openItems}
                  onValueChange={setOpenItems}
                  className="w-full"
                >
                  <AccordionItem value="qa-content">
                    <AccordionTrigger className="text-left">
                      {qaData.data.content[currentIndex].question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">{qaData.data.content[currentIndex].answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-6 flex justify-between">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentIndex === qaData.data.content.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {currentIndex === qaData.data.content.length - 1 ? 'Q&A Complete' : 'Next Question'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
              <p className="text-gray-600">No Q&A content available for this course.</p>
            </Card>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Click the question to reveal the answer • Use buttons to navigate</p>
        </div>
      </div>
    </div>
  );
}

export default QAPage;